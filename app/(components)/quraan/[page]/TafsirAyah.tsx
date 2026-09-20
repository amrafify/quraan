import { getTafsir } from "@app/app/utils/api";

interface TafsirProps {
    tafsirText: string; // النص الـ HTML اللي جاي من الـ API
}

export default async function TafsirModal({ tafsirText }: TafsirProps) {
    const tafsir = await getTafsir(tafsirText)
    return (
        <div className="p-4 bg-amber-50/40 border border-amber-100 rounded-xl font-sans text-base leading-relaxed text-gray-800 text-right" dir="rtl" id={`tfsir-${tafsirText}`}>
            <div className="flex gap-2">
                <h4 className="font-bold text-amber-900 mb-2">تفسير الآية:</h4>
                <span>{tafsirText?.split(':')[1]}</span>
            </div>
            {tafsir !== null ? <div
                dangerouslySetInnerHTML={{ __html: tafsir?.text }}
                className="prose prose-amber max-w-none tafsir-content text-gray-700"

            ></div> : <div className="p-3 bg-amber-50/40 border border-dashed border-amber-200/60 rounded-lg text-center">
                <p className="text-xs font-sans text-amber-800/70">
                    تنبيه: تعذر تحميل نص التفسير لهذه الآية حالياً.
                </p>
            </div>}

        </div>

    );
}