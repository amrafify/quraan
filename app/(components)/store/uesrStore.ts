
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface UserState {
    uesrName: string,
    login: (name: string) => void,
    logout: () => void
}
// export const useUserStore = create<UserState>((set) => ({

//     uesrName: localStorage?.getItem('userName') || '',
//     login: (name) => (
//         localStorage?.setItem('userName', name),
//         set({ uesrName: localStorage?.getItem('userName') || '' })
//     ),
//     logout: () => (
//         set({ uesrName: "" }),
//         localStorage?.removeItem('userName')
//     ),
// }))
export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            uesrName: '',
            login: (name) => set({ uesrName: name }),
            logout: () => set({ uesrName: '' })
        }),
        {
            name: 'user-storage',
        }
    )
);