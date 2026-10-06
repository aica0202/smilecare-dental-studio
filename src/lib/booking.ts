/**
 * Booking domain: data, validation and the API layer.
 * All network calls are isolated here so the mock layer can be swapped for a
 * real automation webhook by setting VITE_BOOKING_WEBHOOK_URL (N8N_WEBHOOK_URL).
 */

export const N8N_WEBHOOK_URL: string = import.meta.env["VITE_BOOKING_WEBHOOK_URL"] ?? "";
export const N8N_SLOTS_URL: string = import.meta.env["VITE_BOOKING_SLOTS_URL"] ?? "";
export const N8N_STATUS_URL: string = import.meta.env["VITE_BOOKING_STATUS_URL"] ?? "";

export const SERVICES = [
  { id: "consultation", name: "Dental Consultation", description: "Complete oral assessment and personalized dental care recommendations." },
  { id: "cleaning", name: "Teeth Cleaning", description: "Professional cleaning to help maintain healthy teeth and gums." },
  { id: "extraction", name: "Tooth Extraction", description: "Safe and comfortable tooth extraction performed by experienced professionals." },
  { id: "whitening", name: "Teeth Whitening", description: "Professional whitening treatment designed to brighten your smile." },
  { id: "fillings", name: "Dental Fillings", description: "Restore damaged teeth and prevent further decay." },
  { id: "orthodontic", name: "Orthodontic Consultation", description: "Get professional advice about braces, aligners, and teeth alignment." },
  { id: "root-canal", name: "Root Canal Treatment", description: "Treatment designed to save infected teeth and relieve discomfort." },
  { id: "emergency", name: "Emergency Dental Care", description: "Quick assistance for urgent dental problems." },
] as const;

export const ANY_DENTIST = "Any Available Dentist";
export const DENTIST_NAMES = ["Dr. Sophia Martinez", "Dr. Daniel Reyes", "Dr. Emma Collins"] as const;
export const DENTIST_OPTIONS = [ANY_DENTIST, ...DENTIST_NAMES];

export const availableSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

export interface BookingPayload {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  dentist: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:mm
  notes: string;
  bookingSource: "SmileCare Dental Website";
}

export type BookingResponse =
  | { status: "confirmed"; reference: string; message?: string }
  | { status: "unavailable"; message?: string }
  | { status: "error"; message: string };

export const emptyBooking = (): BookingPayload => ({
  fullName: "",
  email: "",
  phone: "",
  service: "",
  dentist: ANY_DENTIST,
  appointmentDate: "",
  appointmentTime: "",
  notes: "",
  bookingSource: "SmileCare Dental Website",
});

/* ---------- validation ---------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validatePatient(b: Pick<BookingPayload, "fullName" | "email" | "phone">) {
  const errors: Partial<Record<"fullName" | "email" | "phone", string>> = {};
  if (!b.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!EMAIL_RE.test(b.email.trim())) errors.email = "Please enter a valid email address.";
  if (b.phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a valid phone number.";
  return errors;
}

/** Clinic is closed on Sundays; past days cannot be booked. */
export function isDateSelectable(date: Date, today: Date = new Date()) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (d < t) return false;
  if (d.getDay() === 0) return false;
  return true;
}

export function isBookingComplete(b: BookingPayload) {
  return (
    Object.keys(validatePatient(b)).length === 0 &&
    !!b.service &&
    !!b.appointmentDate &&
    !!b.appointmentTime
  );
}

/* ---------- formatting ---------- */

export function formatTime(t: string) {
  const [h = 0, m = 0] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function toISODate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function formatDate(iso: string) {
  if (!iso) return "";
  const [y = 0, m = 1, d = 1] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/* ---------- API layer (mock until webhook URLs are set) ---------- */

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function hash(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0;
  return Math.abs(h);
}

/** Saturday hours end at 2 PM. */
export function slotsForDate(isoDate: string) {
  const [y = 0, m = 1, d = 1] = isoDate.split("-").map(Number);
  const day = new Date(y, m - 1, d).getDay();
  return day === 6 ? availableSlots.filter((s) => s < "14:00") : availableSlots;
}

export async function fetchAvailableSlots(isoDate: string, dentist: string): Promise<string[]> {
  if (N8N_SLOTS_URL) {
    const res = await fetch(`${N8N_SLOTS_URL}?date=${isoDate}&dentist=${encodeURIComponent(dentist)}`);
    const data = await res.json();
    return Array.isArray(data?.availableSlots) ? data.availableSlots : [];
  }
  await wait(350);
  const base = slotsForDate(isoDate);
  const taken = hash(isoDate + dentist) % base.length;
  return base.filter((_, i) => i !== taken);
}

export async function submitAppointment(payload: BookingPayload): Promise<BookingResponse> {
  if (N8N_WEBHOOK_URL) {
    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as BookingResponse;
      return data;
    } catch {
      return { status: "error", message: "We couldn't reach the clinic. Please try again." };
    }
  }
  // Mock: simulate an availability check. 4:00 PM slots are "just taken" for demo purposes.
  await wait(1600);
  if (payload.appointmentTime === "16:00") return { status: "unavailable" };
  return { status: "confirmed", reference: `SC-${String(hash(payload.email + payload.appointmentDate) % 900000 + 100000)}` };
}

export type AppointmentStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled" | "Rescheduled";

export interface AppointmentRecord {
  reference: string;
  fullName: string;
  service: string;
  dentist: string;
  appointmentDate: string;
  appointmentTime: string;
  status: AppointmentStatus;
}

const MOCK_STATUSES: AppointmentStatus[] = ["Pending", "Confirmed", "Completed", "Cancelled", "Rescheduled"];

export async function checkAppointmentStatus(email: string, reference: string): Promise<AppointmentRecord | null> {
  if (N8N_STATUS_URL) {
    const res = await fetch(N8N_STATUS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, reference }),
    });
    return res.ok ? ((await res.json()) as AppointmentRecord) : null;
  }
  await wait(900);
  if (!/^SC-\d{6}$/i.test(reference.trim())) return null;
  const h = hash(email.toLowerCase() + reference.toUpperCase());
  const date = new Date();
  date.setDate(date.getDate() + (h % 20) + 1);
  if (date.getDay() === 0) date.setDate(date.getDate() + 1);
  return {
    reference: reference.toUpperCase(),
    fullName: (email.split("@")[0] ?? "").replace(/[._]/g, " "),
    service: SERVICES[h % SERVICES.length]!.name,
    dentist: DENTIST_NAMES[h % DENTIST_NAMES.length]!,
    appointmentDate: toISODate(date),
    appointmentTime: availableSlots[h % 6]!,
    status: MOCK_STATUSES[h % MOCK_STATUSES.length]!,
  };
}
