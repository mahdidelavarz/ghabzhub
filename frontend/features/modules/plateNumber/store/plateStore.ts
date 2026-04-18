import { create } from "zustand";

type PlateState = {
  nationalNumber: string;
  phoneNumber: string;
  price: number | null;
  orderId: string | null;
  setPlateData: (data: { nationalNumber: string; phoneNumber: string }) => void;
  setPrice: (price: number) => void;
  setOrderId: (orderId: string) => void;
  clearPlateData: () => void;
};

export const usePlateStore = create<PlateState>((set) => ({
  nationalNumber: "",
  phoneNumber: "",
  price: null,
  orderId: null,
  setPlateData: (data) => set(data),
  setPrice: (price) => set({ price }),
  setOrderId: (orderId) => set({ orderId }),
  clearPlateData: () => set({ nationalNumber: "", phoneNumber: "", price: null, orderId: null }),
}));