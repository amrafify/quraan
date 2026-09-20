import { getSurahsList } from '@app/app/utils/api';
import Image from 'next/image';
import React from 'react'
import makkah from '../../../../public/kaaba.png';
import madinah from '../../../../public/madinah-saudi-arabia.png';


export default async function Title({ title }: { title: string }) {
    const surahs = await getSurahsList();
    return (
        <div className='flex flex-col items-center'>
            {surahs.find((s: any) => s.name_arabic === title)?.revelation_place === 'makkah' ? <div className="flex flex-col items-center gap-2 justify-center mb-6"><Image src={makkah} alt="Makkah" className="w-12 h-12" /><h3 className="text-lg font-semibold">مكية</h3></div> : surahs.find((s: any) => s.name_arabic === title)?.revelation_place === 'madinah' && <div className="flex flex-col items-center gap-2 justify-center mb-6"><Image src={madinah} alt="Madinah" className="w-16 h-16 " /><h3 className="text-lg font-semibold"> مدنية </h3></div>}
            <h1 className="fontsurahnames  text-2xl font-bold mb-6 text-amber-800 text-center"> surah{title} </h1>
        </div>
    )
}
