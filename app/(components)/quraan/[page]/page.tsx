import { getjuz, getSurahsPages, getTafsir } from '@app/app/utils/api';
import SurahName from './surahName';
import SurahFooter from './SurahFooter';
import TafsirModal from './TafsirAyah';
import AyahList from './AyahList';
import Juznumber from './juznumber';

export default async function qurannPage({ params }: { params: Promise<{ page: string }> }) {
    const { page } = await params;
    const surahPages = await getSurahsPages(page);
    const pagenum = surahPages?.meta.filters.page_number
    const JUZ_START_PAGES =
        [
            1, 22, 42, 62, 82, 102, 121, 142, 162, 182, // الأجزاء 1 - 10
            201, 222, 242, 262, 282, 302, 322, 342, 362, 382, // الأجزاء 11 - 20
            402, 422, 442, 462, 482, 502, 522, 542, 562, 582  // الأجزاء 21 - 30
        ]
    const JUZ_NAMES = [
        'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر',
        'الحادي عشر', 'الثاني عشر', 'الثالث عشر', 'الرابع عشر', 'الخامس عشر', 'السادس عشر', 'السابع عشر', 'الثامن عشر', 'التاسع عشر', 'العشرون',
        'الحادي والعشرون', 'الثاني والعشرون', 'الثالث والعشرون', 'الرابع والعشرون', 'الخامس والعشرون', 'السادس والعشرون', 'السابع والعشرون', 'الثامن والعشرون', 'التاسع والعشرون', 'الثلاثون'
    ];
    let juz;
    if (pagenum >= 1 && pagenum <= 604) {
        const idx = JUZ_START_PAGES.findLastIndex(startPage => pagenum >= startPage);
        juz = `الجزء ${JUZ_NAMES[idx]}`;

    }
    const juzArray = JUZ_NAMES.map((name, index) => {
        return {
            // الاسم هيكون هو الـ Key (مكتوب ديناميكياً)
            [`juz`]: `الجزء ${name}`,
            ['page']: JUZ_START_PAGES[index]
        };
    });

    const SURAH_START_PAGES = [
        1, 2, 50, 77, 106, 128, 151, 177, 187, 208,
        221, 235, 249, 255, 262, 267, 282, 293, 305, 312,
        322, 332, 342, 350, 359, 367, 377, 385, 396, 404,
        411, 415, 418, 428, 434, 440, 446, 453, 458, 467,
        477, 483, 489, 496, 499, 502, 507, 511, 515, 518,
        520, 523, 526, 528, 531, 534, 537, 542, 545, 549,
        551, 553, 554, 556, 558, 560, 562, 564, 566, 568,
        570, 572, 574, 575, 577, 578, 580, 582, 583, 585,
        586, 587, 587, 589, 590, 591, 591, 592, 593, 594,
        595, 595, 596, 596, 597, 597, 598, 598, 599, 599,
        600, 600, 601, 601, 601, 602, 602, 602, 603, 603,
        603, 604, 604, 604
    ];

    const SURAH_NAMES = [
        "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس",
        "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه",
        "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم",
        "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر",
        "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق",
        "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة",
        "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج",
        "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس",
        "التكوير", "الإنفطار", "المطففين", "الإنشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد",
        "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات",
        "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر",
        "المسد", "الإخلاص", "الفلق", "الناس"
    ];
    let surah;

    if (pagenum >= 1 && pagenum <= 604) {
        // بيلف من سورة الناس لورا لحد ما يلاقي أول سورة صفحتها أصغر من أو تساوي صفحة المستخدم
        const idx = SURAH_START_PAGES.findLastIndex(startPage => pagenum >= startPage);
        surah = `سورة ${SURAH_NAMES[idx]}`;
    }

    const surahArray = SURAH_NAMES.map((name, index) => {
        return {
            surah: `سورة ${name}`,
            page: SURAH_START_PAGES[index]
        };
    });

    console.log(surahArray);


    return (
        <>
            <Juznumber juzNumber={juz} filterJuz={juzArray} pagenumber={page} filtersurah={surahArray} />
            <div dir="rtl" className='w-full my-6 text-xl px-2 max-w-4xl mx-auto text-center mb-32'>
                {surahPages?.verses.map((surah: { text_uthmani: string; verse_key: string }, i: string) => <AyahList key={surah.verse_key} text_uthmani={surah.text_uthmani} verse_key={surah.verse_key} />)}
                {/* {currentSurah?.map((surah: { text_uthmani: string; verse_key: string }, i: string) => <AyahList key={i} text_uthmani={surah.text_uthmani} verse_key={surah.verse_key} />)} */}
            </div>
            <div className='mb-32'>
                {surahPages?.verses.map((surah: { verse_key: string }) => <TafsirModal key={surah.verse_key} tafsirText={surah.verse_key} />)}

            </div>
            <SurahFooter currentPage={Number(page)} />
        </>
    )
}
