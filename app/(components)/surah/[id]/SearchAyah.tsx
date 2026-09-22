'use client'

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "../../../../components/ui/combobox"
import { useMarkAyahStore } from '../../store/uesMarkSurah';
export default function AyahSearch({ totalVerses }: { totalVerses: number }) {
    const { setAyahId } = useMarkAyahStore();
    const ayahNumbers = Array.from({ length: totalVerses }, (_, i) => String(i + 1));

    // دالة تنفيذ الانتقال للآية
    const scrollToAyah = (ayahNumber: string) => {
        if (!ayahNumber) return;

        const element = document.getElementById(`ayah-${ayahNumber}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('bg-green-100', 'scale-105', 'transition-all', 'duration-300');

            setTimeout(() => {
                element.classList.remove('bg-green-100', 'scale-105', 'transition-all', 'duration-300');
            }, 2000);

            setAyahId(`ayah-${ayahNumber}`);
        }
    };

    return (
        <Combobox
            items={ayahNumbers}
            // تجربة تمرير القيمة عبر الـ onChange الخاص بالمكون الرئيسي إن وجد
            onInputValueChange={(value: any) => {
                if (value) scrollToAyah(String(value));
            }}
        >
            <ComboboxInput
                placeholder="أختار الآية"
                onChange={(e) => {
                    // في حال كانت الكتابة اليدوية مباشرة في الـ Input
                    scrollToAyah(e.target.value);
                }}
            />
            <ComboboxContent>
                <ComboboxEmpty>لا توجد آية بهذا الرقم</ComboboxEmpty>
                <ComboboxList>
                    {(item) => (
                        <ComboboxItem
                            key={item}
                            value={item}
                            onClick={() => scrollToAyah(item)} // لضمان العمل عند النقر المباشر بالقائمة
                        >
                            آية {item}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}

