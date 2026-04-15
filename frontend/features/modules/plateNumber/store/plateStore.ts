import { create } from "zustand";

type PlateState = {
  nationalNumber: string;
  phoneNumber: string;
  setPlateData: (data: { nationalNumber: string; phoneNumber: string }) => void;
  clearPlateData: () => void;
};

export const usePlateStore = create<PlateState>((set) => ({
  nationalNumber: "",
  phoneNumber: "",
  setPlateData: (data) => set(data),
  clearPlateData: () => set({ nationalNumber: "", phoneNumber: "" }),
}));
