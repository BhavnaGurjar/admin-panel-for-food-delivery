import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

const cookieStorage = {
  getItem: (key) => {
    const cookie = Cookies.get(key);
    return cookie ?? null;
  },
  setItem: (key, value) => {
    console.log('value set ',value);
    Cookies.set(key, JSON.stringify(value));
  },
  removeItem: (key) => {
    Cookies.remove(key);
  },
};
  
export const useStepStore = create(
  persist(
    (set, get) => ({
      stepCount: 0,
      setStep: (newStep) => {
        const currentStep = get().stepCount;
        console.log('in store',currentStep)
        if (newStep > currentStep) {
          set({ stepCount: newStep });
        }
      },
      resetStep: () => set({ stepCount: 0 }),
    }),
    {
      name: "step",
      storage: cookieStorage,
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    }
  )
);
