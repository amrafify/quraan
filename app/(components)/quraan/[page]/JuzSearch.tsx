"use client";

import { useRouter } from "next/navigation";

interface JuzFilterProps {
    currentJuzPage?: string; // الصفحة الحالية عشان نخلي الجزء بتاعها متنشط تلقائياً
    jus: Array<{ juz: string; page: number }>;
}

export default function JuzFilter({ jus, currentJuzPage }: JuzFilterProps) {
    const router = useRouter();

    // لما المستخدم يختار جزء، بننقله لصفحة بداية الجزء ده فوراً
    const handleJuzChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const pageNumber = e.target.value;
        if (pageNumber) {
            router.push(`./${pageNumber}`);
        }
    };

    // تريكة ذكية: بنعرف الجزء الحالي بناءً على رقم الصفحة عشان الـ Select يفضل واقف عليه
    const activePage = jus.findLast(j => Number(currentJuzPage) >= j.page)?.page || jus[0]?.page;

    return (
        <div className="flex items-center gap-2 font-sans" dir="rtl">
            <label htmlFor="juz-select" className="text-sm font-medium text-gray-500 whitespace-nowrap">
                الانتقال إلى:
            </label>

            <div className="relative min-w-[100px]">
                <select
                    id="juz-select"
                    value={activePage}
                    onChange={handleJuzChange}
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-10 text-sm font-semibold text-gray-700 shadow-sm outline-none transition-all duration-200 hover:border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                >
                    {jus.map((item, i) => (
                        <option key={i} value={item.page} className="text-gray-800 font-medium">
                            {item.juz} (صـ {item.page})
                        </option>
                    ))}
                </select>

                {/* 🔹 أيقونة السهم الصغير المخصص على الشمال (لأن الاتجاه RTL) */}
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}