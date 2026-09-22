import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from 'js-cookie'
interface MarkSurahState {
    markSurah: string | number,
    name: string,
    nameArbic: string,
    setMarkSurah: (markSurah: string | number, name: string, nameArbic?: string) => void
}
interface MarkSurahpage {
    pageSruha: number,
    setMarkPage: (pageSruha: number) => void
}
interface MarkAyahState {
    ayahId: string,
    textuthmani: string
    setAyahId: (ayahId: string, textuthmani?: string) => void
}
interface MarkRecitationState {
    recitationId: number
    setrecitationId: (recitationId: number) => void
}
interface MarkrevelationplaceId {
    revelationplaceState: string
    setrevelationplaceId: (revelationplaceId: string) => void
}
export const useMarkSurahStore = create<MarkSurahState>()(
    persist(
        (set) => ({
            markSurah: '001',
            name: "Al-Fatiha",
            nameArbic: 'surah001',
            setMarkSurah: (markSurah, name, nameArbic) => set({ markSurah, name, nameArbic })
        }), {
        name: "mark-surah",

    }
    )
)
export const useMarkPageStore = create<MarkSurahpage>()(
    persist(
        (set) => ({
            pageSruha: 1,
            setMarkPage: (pageSruha) => set({ pageSruha }),
        }), {
        name: "mark-page"
    }
    )
)
export const useMarkAyahStore = create<MarkAyahState>()(
    persist(
        (set) => ({
            ayahId: 'ayah-1',
            textuthmani: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
            setAyahId: (ayahId, textuthmani) => set({ ayahId, textuthmani }),
        }), {
        name: "mark-ayah"
    }
    )
)
export const useMarkRecitationStore = create<MarkRecitationState>()(
    persist(
        (set) => ({
            ayahId: '',
            recitationId: 1,
            setrecitationId: (recitationId) => set({ recitationId }),
        }), {
        name: "mark-recitationId"
    }
    )
)
export const useMarkrevelationplaceStore = create<MarkrevelationplaceId>()(
    persist(
        (set) => ({
            revelationplaceState: 'all',
            setrevelationplaceId: (revelationplaceState) => set({ revelationplaceState }),
        }), {
        name: "mark-revelationplace"
    }
    )
)