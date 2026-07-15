"use client";

import { Button, Input, Typography } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import { useLoginForm } from "../controllers/use-login-form";

export function LoginForm() {
  const { state, formAction, isPending } = useLoginForm();

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <div className="mb-8 text-center">
        <Typography variant="h3" as="h1" className="text-gray-900 mb-2">
          Admin Portal
        </Typography>
        <p className="text-sm text-gray-500">Sign in to manage Praya City content.</p>
      </div>

      <form action={formAction} className="flex flex-col gap-5" noValidate>
        <FormField label="Email Address" htmlFor="email" error={state.errors?.email}>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="admin@prayacity.id"
            className="w-full"
          />
        </FormField>

        <FormField label="Password" htmlFor="password" error={state.errors?.password}>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="w-full"
          />
        </FormField>

        <Button type="submit" disabled={isPending} className="w-full mt-2">
          {isPending ? "Authenticating..." : "Sign In"}
        </Button>

        {state.status === "error" && state.message ? (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 text-center">
            {state.message}
          </div>
        ) : null}
      </form>
    </div>
  );
}
