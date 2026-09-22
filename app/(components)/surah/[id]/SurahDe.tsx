'use client'
import { useMarkAyahStore, useMarkRecitationStore, useMarkSurahStore } from "../../store/uesMarkSurah";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { followCursor } from 'tippy.js';
import { useState } from 'react';
import { audioApi, audioSarhApi } from "@app/app/utils/api";
import { id } from "zod/locales";
import { string } from "zod";

type surah = {
    id: number;
    name_arabic: string;
    name_simple: string;
    text_uthmani: string;
    verse_key: string
}
export default function SurahDe({ surah, i, params, surahId }: { surah: surah; i: number; params: number, surahId: number }) {
    const { recitationId } = useMarkRecitationStore()
    const { setAyahId, ayahId } = useMarkAyahStore();
    const { markSurah } = useMarkSurahStore();
    // 1. تحديد معرف الآية الحالية
    const currentAyahId = `ayah-${i + 1}`;
    // 2. التحقق المباشر: هل هذه الآية هي المخزنة في Zustand / LocalStorage؟
    let isBookmarked = '';
    if (ayahId === currentAyahId && params == markSurah) {
        isBookmarked = ayahId
    }

    function handleClick() {
        if (isBookmarked) {
            setAyahId(''); // إلغاء العلامة إذا كانت محفوظة بالفعل
        } else {
            setAyahId(currentAyahId); // حفظ الآية الحالية
        }
        console.log(isBookmarked);
        console.log(params);
        console.log(markSurah);

    }
    // ayah audio
    const handlePlayAudio = async (ayahId: string, recitationId: number) => {
        const dataAudio = await audioApi(ayahId, recitationId)
        console.log(dataAudio.verse.audio.url);
        const dataAudioUrl = dataAudio.verse.audio.url
        const audio = new Audio(`https://audio.qurancdn.com/${dataAudioUrl}`);
        console.log(surah);

        audio.play();
    };
    // 3. دالة خارجية لنسخ النص
    const handleCopyText = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('تم نسخ الأيه!');
    };
    return (
        <>
            <Tippy
                interactive={true} // ضروري عشان الأزرار جوة الـ Tooltip تقبل الضغط (Click Events)
                interactiveBorder={0} // مساحة إضافية بالبكسل عشان الـ Hover ما يفصلش وأنت بتحرك الماوس ناحية الـ Tooltip
                placement="top"
                plugins={[followCursor]}
                appendTo={() => document.body}
                followCursor={"initial"}
                content={
                    <div className="flex items-center gap-3 p-2 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-700">
                        {/* زر تشغيل الصوت بدالة خارجية مع تمرير Param */}
                        <button
                            onClick={() => handlePlayAudio(surah.verse_key, recitationId)}
                            className="hover:text-emerald-400 transition"
                            title="تشغيل الصوت"
                        >
                            🔊
                        </button>

                        {/* زر التظليل/الحفظ مع التفاعل مع State خارجية */}
                        <button
                            onClick={handleClick}
                            className="hover:text-amber-400 transition"
                            title="حفظ الأيه"
                        >
                            {isBookmarked ? '🔖 (محفوظة)' : '🏷️'}
                        </button>

                        {/* زر النسخ */}
                        <button
                            onClick={() => handleCopyText(surah.text_uthmani)}
                            className="hover:text-blue-400 transition"
                            title="نسخ"
                        >
                            📋
                        </button>
                    </div>
                }
            >
                <span id={`ayah-${i + 1}`} className={`font-quran ml-2 transition-all duration-700 leading-[2.5] rounded-lg p-1`}>
                    {surah.text_uthmani} <span className="text-sm text-blue-400">{isBookmarked && `🔖`}  ({i + 1}) </span>
                </span>
            </Tippy>
        </>

    )
}
