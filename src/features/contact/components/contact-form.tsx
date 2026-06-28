"use client";

import { Button, Input, Textarea } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import { useContactForm } from "../controllers/use-contact-form";

/**
 * Feature UI: declarative form wired to the controller. It composes shared
 * atoms/molecules and reads state from the controller — no validation or
 * persistence logic lives here.
 */
export function ContactForm() {
  const { state, formAction, isPending } = useContactForm();

  return (
    <form action={formAction} className="flex w-full flex-col gap-4" noValidate>
      <FormField label="Name" htmlFor="name" error={state.errors?.name}>
        <Input id="name" name="name" placeholder="Ada Lovelace" />
      </FormField>

      <FormField label="Email" htmlFor="email" error={state.errors?.email}>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="ada@example.com"
        />
      </FormField>

      <FormField
        label="Message"
        htmlFor="message"
        error={state.errors?.message}
        hint="Tell us what you need — at least 10 characters."
      >
        <Textarea id="message" name="message" placeholder="Your message..." />
      </FormField>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending..." : "Send message"}
      </Button>

      {state.status === "success" ? (
        <p className="text-sm font-medium text-green-600" role="status">
          {state.message}
        </p>
      ) : null}

      {state.status === "error" && state.message ? (
        <p className="text-sm font-medium text-red-600" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
