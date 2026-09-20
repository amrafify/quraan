"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 💡 استيراد الـ Router للتنقل البرمجي
import { useMarkPageStore } from "../../store/uesMarkSurah";

interface SurahFooterProps {
    currentPage: number;          // رقم الصفحة الحالية اللي هيتعرض
}

export default function SurahFooter({ currentPage = 1 }: SurahFooterProps) {
    const router = useRouter();
    const { setMarkPage } = useMarkPageStore();
    // 💡 الـ States الخاصة بتحويل الرقم لـ Input والتحكم فيه
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(currentPage.toString());

    // تحديث قيمة الـ input لو الصفحة اتغيرت من الزراير الخارجية
    useEffect(() => {
        setMarkPage(currentPage);
        // setInputValue(currentPage.toString());
    }, [currentPage]);

    const nextPageNumber = currentPage < 604 ? currentPage + 1 : 604;
    const prevPageNumber = currentPage > 1 ? currentPage - 1 : 1;

    // دالة التعامل مع ضغطة زرار الـ Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const pageNum = parseInt(inputValue, 10);

            // التأكد إن الرقم المكتوب صالح وجوه نطاق صفحات المصحف (1-604)
            if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= 604) {
                setIsEditing(false); // ارجع لشكل الـ span
                router.push(`./${pageNum}`); // وجهه للصفحة الجديدة فوراً
            } else {
                // لو كتب رقم غلط، يرجع رقم الصفحة الحالي لتجنب الأخطاء
                setInputValue(currentPage.toString());
                setIsEditing(false);
            }
        } else if (e.key === 'Escape') {
            // لو داس ع الإسكيب يلغي العملية ويرجع عادي
            setInputValue(currentPage.toString());
            setIsEditing(false);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-[#fcfbf7] via-[#fcfbf7]/90 to-transparent pointer-events-none" dir="rtl">
            <div className="max-w-md mx-auto bg-[#fcfbf7] border border-[#8a6f27]/35 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-2 flex items-center justify-between pointer-events-auto backdrop-blur-sm">

                {/* زرار الصفحة السابقة */}
                <Link
                    href={`./${prevPageNumber}`}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border border-[#8a6f27]/20 text-[#5c4a1a] hover:bg-[#f5eedc] ${currentPage > 1 && 'active:scale-95'}  transition-all duration-200 ${currentPage === 1 && 'bg-[#f5eedc] cursor-not-allowed'}`}
                    title="الصفحة السابقة"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l6 6m0 0l-6 6m6-6H3" />
                    </svg>
                </Link>

                {/* المنتصف: رقم الصفحة الحالية مع دعم الـ Double Click */}
                <div className="flex items-center gap-2 px-4 select-none">
                    <span className="text-xs font-sans font-bold text-[#8a6f27]/70">الصَّفْحَة</span>

                    <div
                        onDoubleClick={() => setIsEditing(true)} // 💡 دبل كليك يفتح التعديل
                        className="relative w-11 h-11 border-2 border-[#8a6f27] rounded-full flex items-center justify-center bg-gradient-to-b from-[#fdfbf7] to-[#e4d5b7] shadow-inner cursor-pointer"
                        title="اضغط مرتين لكتابة رقم الصفحة"
                    >
                        <div className="absolute inset-0.5 border border-dashed border-[#8a6f27]/40 rounded-full"></div>

                        {isEditing ? (
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onBlur={() => { // لو داس بره الـ input يقفل ويرجع طبيعي
                                    setInputValue(currentPage.toString());
                                    setIsEditing(false);
                                }}
                                autoFocus // 💡 يخلي الماوس يروح علية تلقائياً أول ما يفتح
                                className="w-7 h-7 text-center font-sans text-sm font-black text-[#2d2204] bg-amber-100/60 border border-[#8a6f27]/40 rounded-full focus:outline-none focus:ring-1 focus:ring-[#8a6f27] z-20"
                            />
                        ) : (
                            <span className="font-sans text-sm font-black text-[#2d2204] z-10">
                                {currentPage}
                            </span>
                        )}
                    </div>
                </div>

                {/* زرار الصفحة التالية */}
                <Link
                    href={`./${nextPageNumber}`}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border border-[#8a6f27]/20 text-[#5c4a1a] hover:bg-[#f5eedc] ${currentPage < 604 && 'active:scale-95'}  transition-all duration-200 ${currentPage === 604 && 'bg-[#f5eedc] cursor-not-allowed'}`}
                    title="الصفحة التالية"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L4.5 13.5m0 0l6-6m-6 6h18" />
                    </svg>
                </Link>

            </div>
        </div>
    );
}