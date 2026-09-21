"use client"
import React, { useEffect, useState } from 'react'
import SearchAyah from './SearchAyah'
import Image from 'next/image'
import logo from '@app/public/logo.png'
import Link from 'next/link'
import Listrecitations from './Listrecitations'
import { audioSarhApi } from "@app/app/utils/api";
import { useMarkRecitationStore } from '../../store/uesMarkSurah'
import CustomAudioPlayer from '@app/components/ui/coustmaudio'

interface surahsd {
    id: number;
    name_arabic: string;
    name_simple: string;
    text_uthmani: string;
}
export default function NavBar({ surahsdd, idSurah }: { surahsdd: [surahsd], idSurah: string }) {
    const { recitationId } = useMarkRecitationStore()
    useEffect(() => {
        handlePlaySarheAudio(idSurah, recitationId)
    }, [recitationId])
    const [audioPlay, setAudioPlay] = useState<string | undefined>(undefined);
    // sarh audio
    const handlePlaySarheAudio = async (surahId: string | number, recitationId: number) => {
        const dataAudio = await audioSarhApi(surahId, recitationId)
        console.log(dataAudio.audio_file.audio_url);
        const dataAudioUrl = dataAudio.audio_file.audio_url
        setAudioPlay(dataAudioUrl)
    };
    return (
        <nav className="">
            <div className="w-full p-4 bg-[#faf5e0] flex items-center justify-between pr-20 lg:pr-80">
                <Link href="/" >
                    <Image src={logo} alt="Logo" width={200} height={200} />
                </Link>
                <div className='hidden md:block landscape:block '>

                    <Listrecitations />
                </div>
                <div className='hidden md:block landscape:block'>

                    <CustomAudioPlayer audioUrl={`${audioPlay}`} />
                </div>
                {/* <audio className='hidden md:block landscape:block' src={audioPlay} controls></audio> */}
                <SearchAyah totalVerses={surahsdd?.length || 0} />
            </div>
        </nav>
    )
}
