"use client"
import Image from "next/image";
import Link from "next/link";
import { useMarkSurahStore, useMarkPageStore, useMarkAyahStore } from "./(components)/store/uesMarkSurah";
import hero from '@app/public/hero.png'
import { useEffect, useRef, useState } from "react";
export default function Home() {
  const { markSurah, name, nameArbic } = useMarkSurahStore();
  const { pageSruha } = useMarkPageStore();
  const { ayahId } = useMarkAyahStore();
  const [auto, setauto] = useState(false)
  const audioRef = useRef(null)

  const toglePlay = () => {
    if (!audioRef.current) return;
    if (auto) {
      audioRef.current.pause()
      setauto(false)
    } else {
      audioRef.current.play();  // تشغيل الصوت
      setauto(true);
    }
  }

  return (
    <div className="bg-gray-100 h-screen">
      {/* <div className="flex flex-col">
        <Link href={`/surah/${markSurah}?name=${name}#${ayahId}`} className="text-blue-500 hover:underline">
          Go to {name}
        </Link>
        <Link href={`/quraan/${pageSruha}`} className="text-blue-500 hover:underline">
          Go to page {pageSruha}
        </Link>
      </div> */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between mb-2">
          <h2>Continue Reading</h2>
          <Link href='/'>My Quran</Link>
        </div>
        <div className="w-[25%]  shadow-2xl rounded-xl bg-white">
          <h1 className="p-5 text-3xl font-bold fontsurahnames">{nameArbic}</h1>
          <Link href={`/surah/${markSurah}?name=${name}#${ayahId}`} className="flex rounded-b-xl rounded-t-none justify-between p-5 hover:bg-gray-200  transition-all">
            <h3>{name}</h3>
            <h3>{ayahId || 'ayah-1'}</h3>
          </Link>
        </div>
        <audio ref={audioRef} src="https://audio.qurancdn.com/Alafasy/mp3/114001.mp3">ok</audio>
        <button onClick={() => toglePlay()}>play</button>
      </div>
    </div>)
}
