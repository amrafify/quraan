'use client'
import { useMarkAyahStore } from "../../store/uesMarkSurah";
export default function AyahSearch({ totalVerses }: { totalVerses: number }) {
    const { setAyahId } = useMarkAyahStore();
    const handleSelectAyah = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ayahNumber = e.target.value;

        if (ayahNumber && Number(ayahNumber) <= totalVerses) {
            const element = document.getElementById(`ayah-${ayahNumber}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                element.classList.add('bg-green-100', 'scale-50');
                setTimeout(() => element.classList.remove('bg-green-100', 'scale-50'), 2000);
                setAyahId(`ayah-${ayahNumber}`);
            }
        }
    };
    const ayahNumbers = Array.from({ length: totalVerses }, (_, i) => i + 1);
    return (
        <div className=" max-w-xs flex flex-row items-center gap-2 w-[25%] " dir="rtl">
            <label htmlFor="listAyahs"> الآية</label>
            <div className="w-full relative">
                <input
                    list="ayahs-list"
                    type="number"
                    min={1}
                    max={totalVerses}
                    id="listAyahs"
                    onChange={handleSelectAyah}
                    className="lg:w-[25%] pr-1 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                />
                <datalist id="ayahs-list">
                    {ayahNumbers.map((num) => (
                        <option key={num} value={num}>
                            الآية {num}
                        </option>
                    ))}
                </datalist>
            </div>

        </div>
    );
}