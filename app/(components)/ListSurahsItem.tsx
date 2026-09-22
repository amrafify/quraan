"use client"
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'
import makkah from '../../public/kaaba.png';
import madinah from '../../public/madinah-saudi-arabia.png';
import Image from 'next/image';
import { useMarkAyahStore, useMarkSurahStore } from './store/uesMarkSurah';

type Props = {
    id: number;
    name_arabic: string;
    name_simple: string;
    verses_count: number;
    revelation_place: string;
}
export default function ListSurahsItem({ surahs }: { surahs: Props }) {
    const { setAyahId } = useMarkAyahStore();
    const params = useParams();
    // لقط رقم السورة الحالية من الرابط وتحويله لرقم
    const currentSurahId = params?.id ? Number(params.id) : undefined;

    const isActive = currentSurahId === surahs.id;
    const { markSurah } = useMarkSurahStore();

    return (
        <Link
            href={`/surah/${surahs.id.toString().length === 1 ? '00' + surahs.id : surahs.id.toString().length === 2 ? '0' + surahs.id : surahs.id}?name=${surahs.name_simple}`}
            key={surahs.id}
            className={`flex items-center justify-between px-4 py-3 text-sm rounded-xl font-medium transition-all group duration-200
                ${isActive
                    ? 'bg-amber-50 text-amber-700 font-bold border-r-4 border-amber-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-amber-650'
                }`}
        >
            {/* اسم السورة بالكامل */}

            <span className="font-serif text-base flex items-center gap-1 justify-center"><span>{surahs.revelation_place == 'makkah' ? <Image src={makkah} alt="Makkah" className="w-4 h-4 mr-1" /> : surahs.revelation_place == 'madinah' && <Image src={madinah} alt="Madinah" className="w-6 h-6 " />}</span>{surahs.name_arabic} <span className="text-gray-500"> (عدد آياتها: {surahs.verses_count})</span></span>
            <span className=' '>
                {surahs.id == markSurah && '🔖'}
            </span>
            {/* رقم السورة يظهر كـ Badge خفيف في الجنب */}
            <span className={`inline-flex items-center justify-center text-xs font-sans w-5 h-5 rounded-md border transition-colors
                ${isActive
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-gray-50 text-gray-400 border-gray-100 group-hover:bg-amber-100 group-hover:text-amber-700 group-hover:border-amber-200'
                }`}
            >
                {surahs.id}
            </span>
        </Link>
    );
}

