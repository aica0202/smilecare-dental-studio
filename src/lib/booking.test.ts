import { describe, expect, it } from "vitest";
import { emptyBooking, isBookingComplete, isDateSelectable, validatePatient } from "./booking";

const today = new Date(2026, 9, 6); // Tue Oct 6 2026

describe("booking rules", () => {
  it("rejects dates in the past", () => {
    expect(isDateSelectable(new Date(2026, 9, 5), today)).toBe(false);
  });
  it("allows today", () => {
    expect(isDateSelectable(new Date(2026, 9, 6), today)).toBe(true);
  });
  it("rejects Sundays (clinic closed)", () => {
    expect(isDateSelectable(new Date(2026, 9, 11), today)).toBe(false);
  });
  it("requires name, valid email and phone", () => {
    const e = validatePatient({ fullName: "", email: "bad", phone: "" });
    expect(Object.keys(e).sort()).toEqual(["email", "fullName", "phone"]);
  });
  it("is incomplete without a time", () => {
    const b = { ...emptyBooking(), fullName: "A", email: "a@b.co", phone: "5551234567", service: "Teeth Cleaning", appointmentDate: "2026-10-07" };
    expect(isBookingComplete(b)).toBe(false);
    expect(isBookingComplete({ ...b, appointmentTime: "09:00" })).toBe(true);
  });
});
