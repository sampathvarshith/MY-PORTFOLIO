"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { CheckCircle2, CircleAlert, Loader2, Mail, Send } from "lucide-react";
import { submitEnquiry } from "@/app/actions/contact";
import { enquiryServices, isEnquiryServiceId } from "@/content/services";
import { mailto } from "@/content/site";
import {
  LIMITS,
  composeEmail,
  readValues,
  validate,
  type EnquiryErrors,
  type EnquiryState,
  type EnquiryValues,
} from "@/lib/enquiry";
import { SELECT_SERVICE_EVENT } from "@/components/ui/QuoteLink";
import { buttonClass } from "@/components/ui/Button";

const inputBase =
  "mt-2 block w-full rounded-xl border bg-ink/70 px-4 py-3 text-[15px] text-white placeholder:text-lavender/50 transition-colors focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/40";

function Field({
  id,
  label,
  optional,
  error,
  children,
  hint,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-chrome">
        {label} {optional ? <span className="font-normal text-lavender/70">(optional)</span> : <span aria-hidden className="text-violet">*</span>}
      </label>
      {children}
      {hint && !error ? <p id={`${id}-hint`} className="mt-1.5 text-xs text-lavender/70">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-rose-300">
          <CircleAlert className="h-4 w-4 shrink-0" aria-hidden /> {error}
        </p>
      ) : null}
    </div>
  );
}

export function EnquiryForm() {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, { status: "idle" });
  const [clientErrors, setClientErrors] = useState<EnquiryErrors>({});
  const [service, setService] = useState("");
  const [startedAt, setStartedAt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Preselect a service from `?service=` and from on-page "Request a Quote" buttons.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- time-to-fill stamp must come from the browser
    setStartedAt(Date.now());
    const fromUrl = new URLSearchParams(window.location.search).get("service");
    if (fromUrl && isEnquiryServiceId(fromUrl)) setService(fromUrl);
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (isEnquiryServiceId(id)) setService(id);
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  useEffect(() => {
    if (state.status === "idle") return;
    if (state.status === "success") formRef.current?.reset();
    statusRef.current?.focus();
  }, [state]);

  const errors: EnquiryErrors = { ...(state.status === "invalid" ? state.errors : {}), ...clientErrors };
  const failedValues: EnquiryValues | null =
    state.status === "invalid" || state.status === "error" || state.status === "not_configured" ? state.values : null;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const found = validate(readValues(new FormData(e.currentTarget)));
    setClientErrors(found);
    if (Object.keys(found).length) {
      e.preventDefault();
      const first = Object.keys(found)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  };

  const describedBy = (id: keyof EnquiryValues, hint = false) =>
    errors[id] ? `${id}-error` : hint ? `${id}-hint` : undefined;

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="panel rounded-3xl p-8 text-center outline-none sm:p-12">
        <CheckCircle2 className="mx-auto h-12 w-12 text-violet" aria-hidden />
        <h3 className="mt-5 font-display text-2xl font-bold">Enquiry sent</h3>
        <p className="mx-auto mt-3 max-w-md text-lavender">
          Thanks for reaching out. I’ll read through your project details and reply to your email.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={action}
      onSubmit={onSubmit}
      noValidate
      className="panel edge-glow rounded-3xl p-6 sm:p-8"
      aria-describedby="form-required-note"
    >
      <p id="form-required-note" className="mb-6 text-xs text-lavender/70">
        Fields marked <span className="text-violet">*</span> are required.
      </p>

      {/* Spam protection: honeypot (hidden from people) + time-to-fill stamp. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="startedAt" value={startedAt} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            maxLength={LIMITS.name}
            defaultValue={failedValues?.name}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className={`${inputBase} ${errors.name ? "border-rose-400/70" : "border-white/10"}`}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            defaultValue={failedValues?.email}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={`${inputBase} ${errors.email ? "border-rose-400/70" : "border-white/10"}`}
          />
        </Field>
        <Field id="company" label="Company or brand" optional error={errors.company}>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            maxLength={LIMITS.company}
            defaultValue={failedValues?.company}
            aria-invalid={!!errors.company}
            aria-describedby={describedBy("company")}
            className={`${inputBase} ${errors.company ? "border-rose-400/70" : "border-white/10"}`}
          />
        </Field>
        <Field id="service" label="Service" error={errors.service}>
          <select
            id="service"
            name="service"
            value={service || failedValues?.service || ""}
            onChange={(e) => setService(e.target.value)}
            aria-invalid={!!errors.service}
            aria-describedby={describedBy("service")}
            className={`${inputBase} appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%23c4a1ff%22%20stroke-width=%222%22%3E%3Cpath%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-10 ${errors.service ? "border-rose-400/70" : "border-white/10"}`}
          >
            <option value="" disabled>
              Choose a service…
            </option>
            {enquiryServices.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id="description" label="Project description" error={errors.description} hint="Goals, format, references, and anything I should know.">
            <textarea
              id="description"
              name="description"
              rows={5}
              maxLength={LIMITS.description}
              defaultValue={failedValues?.description}
              aria-invalid={!!errors.description}
              aria-describedby={describedBy("description", true)}
              className={`${inputBase} resize-y ${errors.description ? "border-rose-400/70" : "border-white/10"}`}
            />
          </Field>
        </div>
        <Field id="budget" label="Budget range" optional error={errors.budget}>
          <input
            id="budget"
            name="budget"
            maxLength={LIMITS.budget}
            placeholder="Your estimated budget"
            defaultValue={failedValues?.budget}
            aria-invalid={!!errors.budget}
            aria-describedby={describedBy("budget")}
            className={`${inputBase} ${errors.budget ? "border-rose-400/70" : "border-white/10"}`}
          />
        </Field>
        <Field id="deadline" label="Preferred deadline" optional error={errors.deadline}>
          <input
            id="deadline"
            name="deadline"
            type="date"
            defaultValue={failedValues?.deadline}
            aria-invalid={!!errors.deadline}
            aria-describedby={describedBy("deadline")}
            className={`${inputBase} [color-scheme:dark] ${errors.deadline ? "border-rose-400/70" : "border-white/10"}`}
          />
        </Field>
      </div>

      {(state.status === "error" || state.status === "not_configured") && failedValues ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 rounded-2xl border border-violet/40 bg-violet/10 p-5 outline-none"
        >
          <p className="flex items-start gap-2 text-sm text-white">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-violet-soft" aria-hidden />
            {state.message}
          </p>
          <a
            href={(() => {
              const { subject, body } = composeEmail(failedValues);
              return mailto(subject, body);
            })()}
            className={buttonClass("outline", "mt-4 !min-h-11")}
          >
            <Mail className="h-4 w-4" aria-hidden /> Send via email app
          </a>
        </div>
      ) : null}

      {state.status === "invalid" ? (
        <div ref={statusRef} tabIndex={-1} role="alert" className="mt-6 text-sm text-rose-300 outline-none">
          Please fix the highlighted fields.
        </div>
      ) : null}

      <div className="mt-8 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-lavender/70">Your details are only used to reply to this enquiry.</p>
        <button type="submit" disabled={pending} className={buttonClass("primary", "disabled:opacity-60")}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
          {pending ? "Sending…" : "Request a Quote"}
        </button>
      </div>
    </form>
  );
}
