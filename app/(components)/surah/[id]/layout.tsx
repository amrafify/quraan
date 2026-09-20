import { getSurahsList } from "@app/app/utils/api";
import SurahsSidebar from "../../ListSurahs";
import Title from "./Title";


export default async function SurahLayout({ children }: any) {
    // const surahs = await getSurahsList();

    return (
        <div className="min-h-screen bg-[#fcfbf7]">
            {/* المحتوى الرئيسي واخد pr-64 عشان يسيب مساحة للسايدبار في اليمين */}
            <div>
                {children}
            </div>
        </div>
    );
}