import { Category } from "@/payload-types";
import  Link  from "next/link";
import { CustomCategory } from "../types";

interface Props {
    category: CustomCategory;
    isOpen: boolean;
    postion: { top: number; left: number };
}
export const SubcategoryMenu = ({
    category,
    isOpen,
    postion,
}: Props) => {
    if (!isOpen || !category.subcategories || category.subcategories.length === 0) { return null; }
    const backgroundColor = category.color || "F5F5F5";
    return (
        <div
            className="fixed z-100"
            style={{
                top: postion.top,
                left: postion.left,
            }}>
            <div className="h-3 w-60" />
            <div
               style={{ backgroundColor }}
                className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] translate-x-0.5 translate-y-0.5">
                <div>
                    {category.subcategories?.map((subcategory: Category) => (
                       <Link
                            key={subcategory.slug}
                            href={`/${category.slug}/${subcategory.slug}`}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between item-center underline font-medium">
                               {subcategory.name}
                        </Link>
                        
                    ))}
                </div>
            </div>
        </div>

    )
}