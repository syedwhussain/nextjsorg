import { create } from "zustand";
import dayjs, { Dayjs } from 'dayjs'; // Add this line

interface CapacityReportState {
  effFromDate: Dayjs | null;
  effToDate: Dayjs | null;
  setEffFromDate: (date: Dayjs | null) => void;
  setEffToDate: (date: Dayjs | null) => void;
}

export const useCapacityReportStore = create<CapacityReportState>((set) => ({
  effFromDate: dayjs("2020-01-01", "YYYY-MM-DD"),
  effToDate: dayjs("2021-01-01", "YYYY-MM-DD"),
  setEffFromDate: (date) => set({ effFromDate: date }),
  setEffToDate: (date) => set({ effToDate: date }),
}));
