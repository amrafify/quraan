import React from 'react'
import JuzSearch from './JuzSearch'
import SurahFilter from './SurahSearchP'

export default function Juznumber({ juzNumber, filterJuz, pagenumber, filtersurah }: { juzNumber: any, filterJuz: any, pagenumber: string, filtersurah: any }) {
    return (
        <div className="w-full my-4 select-none px-2 max-w-4xl mx-auto text-center" dir="rtl">
            {/* تقليل السمك الخارجي لـ [3px] والـ Shadow بقى أخف */}
            <div className="w-full relative bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] p-[3px] rounded-lg shadow-[0_4px_15px_-3px_rgba(180,140,60,0.2)]">

                {/* تقليل الـ padding الداخلي من p-5 لـ py-2.5 px-6 */}
                <div className="bg-[#fcfbf7] border border-[#8a6f27] rounded-md py-2.5 px-6 relative flex flex-col sm:flex-row items-center justify-center overflow-hidden">

                    {/* ══════════════ الزخارف الإسلامية في الزوايا (تم تصغيرها برضه) ══════════════ */}
                    <div className="absolute top-0.5 right-0.5 w-3 h-3 border-t border-r border-[#8a6f27]"></div>
                    <div className="absolute top-0.5 left-0.5 w-3 h-3 border-t border-l border-[#8a6f27]"></div>
                    <div className="absolute bottom-0.5 right-0.5 w-3 h-3 border-b border-r border-[#8a6f27]"></div>
                    <div className="absolute bottom-0.5 left-0.5 w-3 h-3 border-b border-l border-[#8a6f27]"></div>

                    {/* نقاط الزخرفة الجانبية خفيفة جداً وملمومة */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 hidden md:block text-[#8a6f27]/30 text-xs tracking-widest">❖❖</div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 hidden md:block text-[#8a6f27]/30 text-xs tracking-widest">❖❖</div>
                    {/* ══════════════════════════════════════════════════════ */}

                    {/* اليمين: معلومات السورة (حجم خط أصغر) */}

                    <div className="relative z-10 my-1 ml-5 sm:my-0">
                        <JuzSearch jus={filterJuz} currentJuzPage={String(pagenumber)} />
                    </div>
                    {/* المنتصف: اسم السورة صغرناه من text-5xl لـ text-2xl */}
                    <div className="relative z-10 my-1 sm:my-0">
                        <h2 className="text-2xl md:text-2xl text-[#2d2204] font-black tracking-wide text-center drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                            {juzNumber}
                        </h2>
                    </div>
                    <div className="relative z-10 my-1 mr-5 sm:my-0">
                        <SurahFilter surah={filtersurah} currentsurahPage={String(pagenumber)} />
                    </div>

                    {/* اليسار: مكان النزول */}


                </div>
            </div>
        </div>
    )
}
