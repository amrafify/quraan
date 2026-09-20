
import Link from 'next/link';
import SurahName from './surahName';

export default function AyahList({ verse_key, text_uthmani }: { verse_key: string; text_uthmani: string }) {
    return (
        <span id={`ayah-${verse_key}`} className={`font-quran ml-2 transition-all duration-700 leading-[2.5]`}>
            {verse_key.split(':')[1] === '1' && <SurahName surahname={verse_key.split(':')[0]} />}  <Link href={`#tfsir-${verse_key}`} className='hover:bg-gray-300 cursor-pointer transition duration-150'> {text_uthmani} </Link> <span className="text-sm text-blue-400">({verse_key.split(':')[1]})</span>
        </span>
    )
}
