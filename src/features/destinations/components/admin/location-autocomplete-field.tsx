"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import { cn } from "@/lib/utils/cn";
import { searchLocationSuggestionsAction } from "../../actions/search-location.action";
import type { LocationSuggestion } from "../../types";

type LocationAutocompleteFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  error?: string;
  className?: string;
  onValueChange: (value: string) => void;
  onSelectSuggestion: (suggestion: LocationSuggestion) => void;
};

export function LocationAutocompleteField({
  id,
  name,
  label,
  value,
  placeholder,
  error,
  className,
  onValueChange,
  onSelectSuggestion,
}: LocationAutocompleteFieldProps) {
  const t = useTranslations("Admin.location");
  const listId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    const query = value.trim();
    if (query.length < 3) {
      setSuggestions([]);
      setLoading(false);
      setHint(query.length === 0 ? null : t("minChars"));
      return;
    }

    setLoading(true);
    setHint(t("searching"));
    const timer = window.setTimeout(async () => {
      try {
        const results = await searchLocationSuggestionsAction(query);
        setSuggestions(results);
        setActiveIndex(results.length ? 0 : -1);
        setHint(
          results.length
            ? null
            : t("noMatches"),
        );
        setOpen(true);
      } catch {
        setSuggestions([]);
        setHint(t("searchFailed"));
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => window.clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const choose = (suggestion: LocationSuggestion) => {
    onSelectSuggestion(suggestion);
    setOpen(false);
    setActiveIndex(-1);
    setHint(t("pinned", { lat: suggestion.latitude, lng: suggestion.longitude }));
  };

  return (
    <FormField label={label} htmlFor={id} error={error}>
      <div ref={rootRef} className="relative">
        <Input
          id={id}
          name={name}
          value={value}
          autoComplete="off"
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          role="combobox"
          className={cn(className)}
          onFocus={() => {
            if (suggestions.length || value.trim().length >= 3) setOpen(true);
          }}
          onChange={(event) => {
            onValueChange(event.target.value);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (!open && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
              setOpen(true);
              return;
            }

            if (event.key === "ArrowDown") {
              event.preventDefault();
              if (!suggestions.length) return;
              setActiveIndex((prev) =>
                prev < suggestions.length - 1 ? prev + 1 : 0,
              );
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              if (!suggestions.length) return;
              setActiveIndex((prev) =>
                prev > 0 ? prev - 1 : suggestions.length - 1,
              );
            } else if (event.key === "Enter") {
              if (open && activeIndex >= 0 && suggestions[activeIndex]) {
                event.preventDefault();
                choose(suggestions[activeIndex]);
              }
            } else if (event.key === "Escape") {
              setOpen(false);
              setActiveIndex(-1);
            }
          }}
        />

        {open && (loading || suggestions.length > 0 || hint) ? (
          <div
            id={listId}
            role="listbox"
            className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
          >
            {loading ? (
              <div className="px-3 py-2 text-xs text-gray-500">{t("searchingShort")}</div>
            ) : null}

            {!loading &&
              suggestions.map((item, index) => {
                const active = index === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="option"
                    aria-selected={active}
                    className={cn(
                      "flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left transition-colors",
                      active ? "bg-blue-50" : "hover:bg-gray-50",
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => choose(item)}
                  >
                    <span className="text-sm font-medium text-gray-900">
                      {item.label}
                    </span>
                    {item.secondary ? (
                      <span className="text-xs text-gray-500">
                        {item.secondary}
                      </span>
                    ) : null}
                    <span className="text-[11px] text-blue-700">
                      {item.latitude}, {item.longitude}
                    </span>
                  </button>
                );
              })}

            {!loading && !suggestions.length && hint ? (
              <div className="px-3 py-2 text-xs text-gray-500">{hint}</div>
            ) : null}
          </div>
        ) : null}
      </div>

      {hint && !error ? (
        <p className="mt-1 text-xs text-gray-500">{hint}</p>
      ) : null}
    </FormField>
  );
}
