import { create } from 'zustand'
import { persist } from "zustand/middleware";
interface CounterState {
    count: number
    increaseCount: () => void
    decreaseCount: () => void
    removeCount: () => void
}
export const useCounter = create<CounterState>()(
    persist(
        (set) => ({
            count: 0,
            increaseCount: () => set((state: { count: number }) => ({ count: state.count + 1 })),
            decreaseCount: () => set((state: { count: number }) => ({ count: state.count - 1 })),
            removeCount: () => set(() => ({ count: 0 })),
        }),
        {
            name: 'counter-storage',
        }
    ))