"use client"
import Image from "next/image";
import Link from "next/link";
import { useMarkSurahStore, useMarkPageStore, useMarkAyahStore, useMarkrevelationplaceStore } from "./(components)/store/uesMarkSurah";
import hero from '@app/public/hero.png'
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "@app/components/ui/aspect-ratio";
export default function Home() {
  const { markSurah, name, nameArbic } = useMarkSurahStore();
  const { pageSruha } = useMarkPageStore();
  const { ayahId } = useMarkAyahStore();
  const { setrevelationplaceId } = useMarkrevelationplaceStore()
  useEffect(() => {
    setrevelationplaceId('all')
  }, [])
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
      <AspectRatio ratio={16 / 9} className="w-full max-w-xs  rounded-xl bg-white shadow-2xl m-4 ">

        <h1 className="p-5 text-start text-3xl font-bold fontsurahnames">{nameArbic}</h1>
        <Link href={`/surah/${markSurah}?name=${name}#${ayahId}`} className="flex rounded-b-xl rounded-t-none justify-between p-5 hover:bg-gray-200 bg-gray-100 transition-all font-bold font-mono">
          <h3>{name}</h3>
          <h3>{ayahId || 'ayah-1'}</h3>
        </Link>

      </AspectRatio>
    </div>)
}
