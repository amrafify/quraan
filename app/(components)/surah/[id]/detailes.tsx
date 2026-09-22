"use client"
import { ReactNode, useEffect, useRef, useState } from "react";
import SurahsSidebar from "../../ListSurahs";
import { useMarkAyahStore, useMarkSurahStore } from "../../store/uesMarkSurah";
import NavBar from "./NavBar";
import SurahDe from "./SurahDe";
// interface surah {
//     id: number;
//     name_arabic: string;
//     name_simple: string;
//     text_uthmani: string;
// }
interface DetailesProps {
    params: string,
    surahsdd: [{
        id: number;
        name_arabic: string;
        name_simple: string;
        text_uthmani: string;
    }],
    surahs: [{
        id: number;
        name_arabic: string;
        name_simple: string;
        verses_count: number;
        revelation_place: string;
    }],
    surahName: string,
    titleSruha: ReactNode,
    nameArabic: string
}
export default function Detailes({ params, surahsdd, surahs, surahName, titleSruha, nameArabic }: DetailesProps) {
    const { setMarkSurah } = useMarkSurahStore();
    const ayahId = useMarkAyahStore((state) => state.ayahId);

    // بنخزن آخر ayahId تم تنفيذه فعلاً
    const prevAyahIdRef = useRef(ayahId);

    useEffect(() => {
        // الشرط ده بيمنع التنفيذ تماماً لو الـ ayahId مساش اتغير عن آخر مرة
        if (ayahId && ayahId !== prevAyahIdRef.current) {
            prevAyahIdRef.current = ayahId; // نحدث القيمة القديمة

            // تنفيذ التحديث في الستور
            setMarkSurah(params, surahName, 'surah' + params);
        }
    }, [ayahId, params, surahName]);

    // const { setMarkSurah } = useMarkSurahStore();
    // const { ayahId } = useMarkAyahStore();
    // useEffect(() => {
    //     setMarkSurah(params, surahName, 'surah' + params)
    // }, [ayahId])
    return (
        <>
            <SurahsSidebar surahs={surahs} />
            <NavBar surahsdd={surahsdd} idSurah={params} />
            <div className={`lg:pr-72`}>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    {titleSruha}
                    {/* البسمله و عدم ظهورها في سوره الفاتحه */}
                    {params === "001" || params === "01" || params === "1" ? null : <h3 className='text-center font-bold'>بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</h3>}
                    <div className="space-y-4 leading-loose text-xl m-3 text-center">
                        {surahsdd?.map((surah: any, i: number) => (
                            <SurahDe key={surah.id} surah={surah} params={Number(params)} surahId={surah.id} i={i} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
