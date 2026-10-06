import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface Preselect {
  service?: string;
  dentist?: string;
  nonce: number;
}

const Ctx = createContext<{ preselect: Preselect; bookWith: (p: { service?: string; dentist?: string }) => void } | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [preselect, setPreselect] = useState<Preselect>({ nonce: 0 });
  const bookWith = useCallback((p: { service?: string; dentist?: string }) => {
    setPreselect((prev) => ({ ...p, nonce: prev.nonce + 1 }));
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return <Ctx.Provider value={{ preselect, bookWith }}>{children}</Ctx.Provider>;
}

export function useBooking() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useBooking must be used inside BookingProvider");
  return c;
}
