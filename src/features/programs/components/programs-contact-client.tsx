"use client";

import type { ContactFormState } from "@/features/contact";
import { useProgramsContactController } from "../controllers/use-programs-contact";
import type { ProgramsContactContent } from "../types";

export interface ProgramsContactClientProps {
  content: ProgramsContactContent;
}

/**
 * Container component: wires the controller to the view.
 * Marked "use client" because the controller uses hooks.
 */
export function ProgramsContactClient({ content }: ProgramsContactClientProps) {
  const { state, formAction, isPending } = useProgramsContactController();

  return (
    <ProgramsContactView
      content={content}
      state={state}
      formAction={formAction}
      isPending={isPending}
    />
  );
}

/* ── Pure presentational view (no hooks, no logic) ──────────── */

interface ProgramsContactViewProps {
  content: ProgramsContactContent;
  state: ContactFormState;
  formAction: (formData: FormData) => void;
  isPending: boolean;
}

function ProgramsContactView({ content, state, formAction, isPending }: ProgramsContactViewProps) {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 bg-white flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Left Column: Text */}
        <div className="flex flex-col justify-center">
          <h2 className="text-[40px] md:text-[56px] font-bold text-[#111827] leading-[1.1] tracking-tight mb-6 max-w-[400px]">
            {content.title}
          </h2>
          <p className="text-[#4B5563] text-[16px] md:text-[18px] leading-relaxed max-w-[450px]">
            {content.description}
          </p>
        </div>

        {/* Right Column: Form */}
        <div className="flex flex-col justify-center w-full">
          <form action={formAction} className="flex w-full flex-col gap-4" noValidate>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <input
                  id="name"
                  name="name"
                  placeholder={content.namePlaceholder}
                  className="w-full px-5 py-4 rounded-md border border-[#D1D5DB] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0064F2]/20 focus:border-[#0064F2] transition-colors"
                />
                {state.errors?.name && (
                  <span className="text-sm text-red-600 mt-1">{state.errors.name}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={content.emailPlaceholder}
                  className="w-full px-5 py-4 rounded-md border border-[#D1D5DB] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0064F2]/20 focus:border-[#0064F2] transition-colors"
                />
                {state.errors?.email && (
                  <span className="text-sm text-red-600 mt-1">{state.errors.email}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <textarea
                id="message"
                name="message"
                placeholder={content.messagePlaceholder}
                rows={6}
                className="w-full px-5 py-4 rounded-md border border-[#D1D5DB] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0064F2]/20 focus:border-[#0064F2] transition-colors resize-none"
              />
              {state.errors?.message && (
                <span className="text-sm text-red-600 mt-1">{state.errors.message}</span>
              )}
            </div>

            <div className="mt-2">
              <button
                type="submit"
                disabled={isPending}
                className="bg-[#0064F2] hover:bg-[#0055D4] text-white px-8 py-3 rounded-full font-medium transition-colors focus:outline-none focus:ring-4 focus:ring-[#0064F2]/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? content.sending : content.submitButton}
              </button>
            </div>

            {state.status === "success" && (
              <p className="text-sm font-medium text-green-600 mt-2" role="status">
                {state.message}
              </p>
            )}

            {state.status === "error" && state.message && (
              <p className="text-sm font-medium text-red-600 mt-2" role="alert">
                {state.message}
              </p>
            )}

          </form>
        </div>

      </div>
    </section>
  );
}
