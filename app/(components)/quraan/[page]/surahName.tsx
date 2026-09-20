import { getSurahsList } from '@app/app/utils/api';
import TitleForName from './TitleForName';

type surah = {
    id: number;
    name_arabic: string;
    name_simple: string;
    text_uthmani: string;
    revelation_place: string;
    verses_count: number;
}
export default async function SurahName({ surahname }: { surahname: string }) {
    const surahs = await getSurahsList();
    const currentSurah = surahs.find((surah: surah) => surah.id === Number(surahname));
    return (
        <div>
            {currentSurah && <TitleForName title={currentSurah.name_arabic} revelation_place={currentSurah.revelation_place} verses_count={currentSurah.verses_count} id={currentSurah.id} />}
            <h3 className='text-center font-bold mb-2 '>بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</h3>
        </div>
    )
}
