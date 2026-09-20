import { getSurahs, getSurahsList } from '@app/app/utils/api';
import Title from './Title';
import Detailes from './detailes';
type surah = {
    id: number;
    name_arabic: string;
    name_simple: string;
    text_uthmani: string;
}

export default async function Surha({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ name: string }> }) {
    const { id } = await params;
    const { name } = await searchParams;
    const surahsdd = await getSurahs(id);
    const surahs = await getSurahsList();
    const currentSurah = surahs.find((surah: surah) => surah.id === Number(id));
    const titleSruha = <Title title={id} />
    return (
        <>
            <Detailes params={String(id)} surahsdd={surahsdd} surahs={surahs} surahName={name} titleSruha={titleSruha} nameArabic={currentSurah.name_arabic} />
        </>
    )
}
