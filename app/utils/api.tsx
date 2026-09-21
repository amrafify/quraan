
const JUZ_START_PAGES =
    [
        1, 22, 42, 62, 82, 102, 121, 142, 162, 182, // الأجزاء 1 - 10
        201, 222, 242, 262, 282, 302, 322, 342, 362, 382, // الأجزاء 11 - 20
        402, 422, 442, 462, 482, 502, 522, 542, 562, 582  // الأجزاء 21 - 30
    ]
const API_URL = 'https://api.quran.com/api/v4';
export async function getSurahsList() {
    try {
        const res = await fetch(`${API_URL}/chapters`); // Fetch the list of Surahs 
        const data = await res.json(); // Log the list of Surahs to the console
        return data.chapters; // Return the list of Surahs
    } catch (err) {
        console.log(err);
    }
}
export async function getSurahs(chapterId: string) {
    try {
        const res = await fetch(`${API_URL}/quran/verses/qpc_uthmani?chapter_number=${chapterId}`); // Fetch Surahs by chapter ID
        const data = await res.json();
        console.log(data);
        return data.verses; // Return Surahs
    } catch (err) {
        console.log(err);
    }
}
export async function getSurahsPages(page: string) {
    const pageNum = [{ page: page }]
    try {
        const res = await fetch(`${API_URL}/quran/verses/qpc_uthmani?page_number=${page}`); // Fetch Surahs by chapter ID
        const data = await res.json();
        // const ayahs = data
        // const ayahsWithjuz = [...ayahs, ...pageNum]
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}
export async function getjuz(juz: number) {
    try {
        const res = await fetch(`${API_URL}/quran/verses/qpc_uthmani?page_number=${juz}`); // Fetch Surahs by chapter ID
        const data = await res.json();
        console.log(data);
        return data.verses;
    } catch (err) {
        console.log(err);
    }
}
export async function getTafsir(ayah: string) {
    try {
        const res = await fetch(`${API_URL}/tafsirs/91/by_ayah/${ayah}`); // Fetch Surahs by chapter ID
        if (!res.ok) {
            return null
        }

        const data = await res.json();
        return data.tafsir;
    } catch (err: any) {
        console.log(err);
        return null
    }
}
// list of recitations
export async function recitationsList() {
    try {
        const res = await fetch(`${API_URL}/resources/recitations?language=ar`); // Fetch the list of recitations 
        const data = await res.json(); // Log the list of recitations to the console
        return data
    } catch (err) {
        console.log(err);
    }
}
// جلب الاصوات
// جلب صوت ايه
export async function audioApi(ayahId: string = "1:2", audioId: number = 1) {
    try {
        const res = await fetch(`${API_URL}/verses/by_key/${ayahId}?audio=${audioId}`); // Fetch the audio 
        const data = await res.json();
        return data
    } catch (err) {
        console.log(err);
    }
}
// جلب صوت سوره كامله
export async function audioSarhApi(sharhId: string | number = 1, audioId: number = 1) {
    try {
        const res = await fetch(`${API_URL}/chapter_recitations/${audioId}/${sharhId}`); // Fetch the audio 
        const data = await res.json();
        return data
    } catch (err) {
        console.log(err);
    }
}