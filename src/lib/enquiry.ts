import { enquiryServices, isEnquiryServiceId } from "@/content/services";

export type EnquiryValues = {
  name: string;
  email: string;
  company: string;
  service: string;
  description: string;
  budget: string;
  deadline: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

export type EnquiryState =
  | { status: "idle" }
  | { status: "invalid"; errors: EnquiryErrors; values: EnquiryValues }
  | { status: "success" }
  | { status: "not_configured" | "error"; values: EnquiryValues; message: string };

export const LIMITS = { name: 100, email: 200, company: 120, description: 4000, budget: 80 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function readValues(form: FormData): EnquiryValues {
  const get = (k: string) => String(form.get(k) ?? "").trim();
  return {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    service: get("service"),
    description: get("description"),
    budget: get("budget"),
    deadline: get("deadline"),
  };
}

export function validate(v: EnquiryValues): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (v.name.length < 2) e.name = "Please enter your name.";
  else if (v.name.length > LIMITS.name) e.name = `Keep it under ${LIMITS.name} characters.`;
  if (!EMAIL_RE.test(v.email) || v.email.length > LIMITS.email) e.email = "Please enter a valid email address.";
  if (v.company.length > LIMITS.company) e.company = `Keep it under ${LIMITS.company} characters.`;
  if (!isEnquiryServiceId(v.service)) e.service = "Please choose a service.";
  if (v.description.length < 20) e.description = "Tell me a little more about the project (at least 20 characters).";
  else if (v.description.length > LIMITS.description) e.description = `Keep it under ${LIMITS.description} characters.`;
  if (v.budget.length > LIMITS.budget) e.budget = `Keep it under ${LIMITS.budget} characters.`;
  if (v.deadline && !/^\d{4}-\d{2}-\d{2}$/.test(v.deadline)) e.deadline = "Please use a valid date.";
  return e;
}

export const serviceLabel = (id: string) => enquiryServices.find((s) => s.id === id)?.label ?? id;

export function composeEmail(v: EnquiryValues) {
  const subject = `Project enquiry: ${serviceLabel(v.service)} — ${v.name}`;
  const lines = [`Name: ${v.name}`, `Email: ${v.email}`];
  if (v.company) lines.push(`Company / brand: ${v.company}`);
  lines.push(`Service: ${serviceLabel(v.service)}`);
  if (v.budget) lines.push(`Budget range: ${v.budget}`);
  if (v.deadline) lines.push(`Preferred deadline: ${v.deadline}`);
  lines.push("", "Project description:", v.description);
  const body = lines.join("\n");
  return { subject, body };
}
