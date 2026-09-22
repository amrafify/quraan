'use client'; // ضروري لأننا هنستخدم useState وتفاعل

import { useEffect, useState } from 'react';
import ListSurahsItem from './ListSurahsItem';
import { useMarkrevelationplaceStore, useMarkSurahStore } from './store/uesMarkSurah';

// افترضت أن الـ Type بتاع السورة اسمه surahss زي ما أنت كاتبه
interface surahss {
    id: number;
    name_arabic: string;
    name_simple: string;
    verses_count: number;
    revelation_place: string;
}

interface SidebarProps {
    surahs: surahss[];
}

export default function SurahsSidebar({ surahs }: SidebarProps) {
    // State للتحكم في ظهور السايدبار على الموبايل
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenlgpage, setIsOpenlgpage] = useState(false);
    const { setrevelationplaceId, revelationplaceState } = useMarkrevelationplaceStore()
    const [revelationplace, setRevelationplace] = useState(revelationplaceState);
    useEffect(() => {
        setrevelationplaceId(revelationplace)
    }, [revelationplace])
    const { markSurah } = useMarkSurahStore();
    console.log(markSurah);

    return (
        <>
            {/* 1. زرار التوجل (Toggle Button) - يظهر فقط في الشاشات الصغيرة lg:hidden */}
            {!isOpen && <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className={`items-center p-2 mt-2 mr-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-200 fixed top-2 right-2 z-50 bg-white shadow-md border border-gray-100 z-[99999]`}
            >
                <span className={`sr-only`}>فتح القائمة</span>
                {/* أيقونة همبرجر بسيطة بالـ SVG */}
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0-5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"></path>
                </svg>
            </button>}


            {/* 2. خلفية معتمة (Overlay) - تظهر خلف السايدبار في الموبايل فقط لما يفتح عشان تقفل السايدبار لو ضغطت برا */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-30 bg-gray-900/40 backdrop-blur-sm lg:hidden"
                />
            )}

            {/* 3. الـ Aside المعدل بالـ Responsive Classes */}
            <aside
                dir="rtl"
                className={`fixed top-0 right-0 z-40 w-72 h-screen bg-white border-l border-gray-100 shadow-sm transition-transform duration-300 ease-in-out z-[99999]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
           ${!isOpenlgpage ? 'lg:translate-x-0' : 'translate-x-full'}`} // في الشاشات الكبيرة يثبت مكانه ولا يتأثر بالـ State
            >
                {/* رأس الجريدة الجانبية - عنوان ثابت */}
                <div className="p-4 border-b border-gray-50 bg-[#faf9f5] flex items-center justify-between">

                    <div>
                        <h2 className="text-xl font-bold text-amber-800 font-serif">فهرس السور</h2>
                        <p className="text-xs text-gray-400 mt-1">اختر السورة لبدء القراءة</p>
                    </div>
                    <div>
                        <select name="" id="" value={revelationplaceState} onChange={(e) => setRevelationplace(e.target.value)}>
                            <option value="all" onClick={() => setRevelationplace('all')}>كل السور</option>
                            <option value="makkah" onClick={() => setRevelationplace('makkah')}>السور المكية</option>
                            <option value="madinah" onClick={() => setRevelationplace('madinah')}>السور المدنية</option>
                        </select>
                    </div>

                    {/* زرار إغلاق (X) يظهر جوه السايدبار في الموبايل بس لزيادة سهولة الاستخدام */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* قائمة السور القابلة للتمرير */}
                <div className="h-[calc(100vh-76px)] px-3 py-4 overflow-y-auto space-y-1 custom-scrollbar">
                    {revelationplace === 'all' && surahs?.map((surah: surahss) => {
                        return (
                            // تريكة UX: لما يضغط على سورة في الموبايل، السايدبار يقفل تلقائياً
                            <div key={surah.id} onClick={() => setIsOpen(false)}>
                                <div>
                                    <ListSurahsItem surahs={surah} />

                                </div>
                            </div>
                        );
                    })}
                    {revelationplace !== 'all' && surahs?.filter((s) => s.revelation_place === revelationplace).map((surah: surahss) => {
                        return (
                            // تريكة UX: لما يضغط على سورة في الموبايل، السايدبار يقفل تلقائياً
                            <div key={surah.id} onClick={() => setIsOpen(false)}>
                                <ListSurahsItem surahs={surah} />
                            </div>
                        );
                    })}
                </div>
            </aside>
        </>
    );
}