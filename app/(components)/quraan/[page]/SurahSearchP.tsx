"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface SurahFilterProps {
    currentsurahPage?: string;
    surah: Array<{ surah: string; page: number }>;
}

export default function SurahFilter({ surah, currentsurahPage }: SurahFilterProps) {
    const router = useRouter();
    const [inputValue, setInputValue] = useState("");

    // لمعرفة السورة الحالية بناءً على الصفحة وتحديث قيمة الـ input تلقائياً
    useEffect(() => {
        const currentSurahObj = surah.findLast(s => Number(currentsurahPage) >= s.page);
        if (currentSurahObj) {
            setInputValue(currentSurahObj.surah);
        }
    }, [currentsurahPage, surah]);

    const handleSurahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedSurahName = e.target.value;
        setInputValue(selectedSurahName);

        // بنبحث في المصفوفة عن السورة اللي اسمها يطابق اللي المستخدم اختاره أو كتبه
        const matchedSurah = surah.find(s => s.surah === selectedSurahName);

        // لو لقاها، ينقله فوراً لصفحتها
        if (matchedSurah) {
            router.push(`./${matchedSurah.page}`);
        }
    };

    return (
        <div className="flex items-center gap-2 font-sans" dir="rtl">
            <label htmlFor="listsurah" className="text-sm font-medium text-gray-500 whitespace-nowrap">
                الانتقال إلى:
            </label>

            <div className="relative min-w-[180px]">
                <input
                    list="surah-select"
                    type="text"
                    id="listsurah"
                    value={inputValue}
                    autoComplete="off"
                    onChange={handleSurahChange}
                    placeholder="ابحث عن سورة..."
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 pr-4 pl-10 text-sm font-semibold text-gray-700 shadow-sm outline-none transition-all duration-200 hover:border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />

                <datalist id="surah-select">
                    {surah.map((item, i) => (
                        // جعلنا الـ value هو الاسم عشان يظهر في الـ input بعد الاختيار
                        <option key={i} value={item.surah}>
                            صـ {item.page}
                        </option>
                    ))}
                </datalist>

                {/* 🔹 أيقونة البحث (العدسة) أو السهم على اليسار */}
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}