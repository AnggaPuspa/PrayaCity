"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MAP_VIEW } from "../data/map-spots";
import type { MapSpot, MapSpotId } from "../types";

interface InteractiveMapCanvasProps {
  spots: MapSpot[];
  activeId: MapSpotId;
  onSelect: (id: MapSpotId) => void;
}

function getSvgIcon(type: string): string {
  switch (type) {
    case "city":
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h16"/><path d="M8 10V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6"/><path d="M4 22V10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12"/><path d="M9 22v-4h6v4"/></svg>`;
    case "sea":
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`;
    case "hill":
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>`;
    case "culture":
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/></svg>`;
    default:
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`;
  }
}

function createPinIcon(iconType: string, active: boolean) {
  const iconSvg = getSvgIcon(iconType);
  const bg = active ? "#0066FF" : "#FFFFFF";
  const color = active ? "#FFFFFF" : "#1A1A1A";
  const ring = active
    ? "0 0 0 6px rgba(0,102,255,0.16)"
    : "0 8px 20px rgba(15,23,42,0.14)";
  const tip = active ? "#0066FF" : "#FFFFFF";

  return L.divIcon({
    className: "praya-map-pin",
    iconSize: [44, 56],
    iconAnchor: [22, 52],
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;transform:translateY(-2px);">
        <div style="
          width:40px;height:40px;border-radius:999px;
          display:flex;align-items:center;justify-content:center;
          background:${bg};color:${color};
          border:2px solid #fff;
          box-shadow:${ring};
          transform:${active ? "scale(1.08)" : "scale(1)"};
        ">${iconSvg}</div>
        <div style="
          width:0;height:0;
          border-left:7px solid transparent;
          border-right:7px solid transparent;
          border-top:10px solid ${tip};
          margin-top:-1px;
          filter: drop-shadow(0 2px 2px rgba(15,23,42,.12));
        "></div>
      </div>
    `,
  });
}

function FocusActiveSpot({
  spots,
  activeId,
}: {
  spots: MapSpot[];
  activeId: MapSpotId;
}) {
  const map = useMap();
  const isFirst = useRef(true);

  useEffect(() => {
    const active = spots.find((spot) => spot.id === activeId);
    if (!active) return;

    // Skip the first paint so we don't fight the initial camera.
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    map.flyTo([active.latitude, active.longitude], Math.max(map.getZoom(), 11), {
      duration: 0.85,
      easeLinearity: 0.25,
    });
  }, [activeId, map, spots]);

  return null;
}

function InvalidateSizeOnReady() {
  const map = useMap();

  useEffect(() => {
    // Leaflet needs a real sized container before tiles/panes are safe.
    const frame = window.requestAnimationFrame(() => {
      map.invalidateSize();
    });

    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [map]);

  return null;
}

/**
 * Real-map canvas with illustrated pin layer.
 * Mounts only after the host has measurable size (avoids Leaflet appendChild crash).
 */
export function InteractiveMapCanvas({
  spots,
  activeId,
  onSelect,
}: InteractiveMapCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [canMount, setCanMount] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let mounted = true;

    const tryMount = () => {
      if (!mounted) return;
      const { clientWidth, clientHeight } = host;
      if (clientWidth > 0 && clientHeight > 0) {
        setCanMount(true);
        return true;
      }
      return false;
    };

    if (tryMount()) return;

    const observer = new ResizeObserver(() => {
      if (tryMount()) observer.disconnect();
    });
    observer.observe(host);

    // Fallback in case ResizeObserver is slow/unavailable.
    const timer = window.setTimeout(() => {
      setCanMount(true);
    }, 120);

    return () => {
      mounted = false;
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const icons = useMemo(() => {
    if (!canMount) return [];
    return spots.map((spot) => ({
      id: spot.id,
      icon: createPinIcon(spot.iconType, spot.id === activeId),
    }));
  }, [activeId, canMount, spots]);

  return (
    <div ref={hostRef} className="absolute inset-0 h-full w-full">
      {canMount ? (
        <MapContainer
          key="praya-map"
          center={MAP_VIEW.center}
          zoom={MAP_VIEW.zoom}
          minZoom={MAP_VIEW.minZoom}
          maxZoom={MAP_VIEW.maxZoom}
          scrollWheelZoom={false}
          className="h-full w-full rounded-[28px]"
          style={{ height: "100%", width: "100%", background: "#EAF2FF" }}
          attributionControl={false}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
          />

          <InvalidateSizeOnReady />
          <FocusActiveSpot spots={spots} activeId={activeId} />

          {spots.map((spot) => {
            const icon =
              icons.find((item) => item.id === spot.id)?.icon ??
              createPinIcon(spot.iconType, spot.id === activeId);

            return (
              <Marker
                key={spot.id}
                position={[spot.latitude, spot.longitude]}
                icon={icon}
                eventHandlers={{
                  click: () => onSelect(spot.id),
                  mouseover: () => onSelect(spot.id),
                }}
              />
            );
          })}
        </MapContainer>
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-[28px] bg-[#EAF2FF] text-sm text-zinc-500">
          Loading map…
        </div>
      )}
    </div>
  );
}
