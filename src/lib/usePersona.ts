import { useCallback, useState } from "react";
import type { UserPersona } from "@/types";
import { loadPersona, resetPersona, savePersona as persistPersona } from "./persona";

// React hook wrapping the localStorage-backed persona engine (mirrors useProgress.ts).
export function usePersona() {
  const [persona, setPersonaState] = useState<UserPersona | null>(() => loadPersona());

  const setPersona = useCallback((next: UserPersona) => {
    persistPersona(next);
    setPersonaState(next);
  }, []);

  const clearPersona = useCallback(() => {
    resetPersona();
    setPersonaState(null);
  }, []);

  return { persona, setPersona, clearPersona };
}
