
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import React from "react";

export default function CategoriesMenuSmall({categories, geoParameter}) {

    const [openMenuCategoriesSmall, setOpenMenuCategoriesSmall] = React.useState(false);

    return (
        <>
            {/** category label */}
            <div
                className="flex justify-between w-full pb-8"
                onClick={() => setOpenMenuCategoriesSmall(prevState => !prevState)}
            >
                <div className="flex flex-row items-center">
                  <div className="w-[50px]">
                    <img src="/images/icons/categories.png" alt="logo" width="30" height="30" />
                  </div>
                  <div>Catégories</div>
                </div>
                <div>
                  <FontAwesomeIcon
                    className={`h-4 w-4 transition-transform ${openMenuCategoriesSmall ? "rotate-180" : ""} `}
                    icon={faChevronDown}
                  />
                </div>
            </div>
      
            {/** categories */}
            <div
                className={`flex flex-col w-full overflow-hidden transition-[height] duration-300 ${
                  openMenuCategoriesSmall ? "h-[620px]" : "h-0"
                }`}
            >
                {categories.map((category) => (
                    <Link
                        className="flex flex-row w-full pb-8"
                        key={category.slug} 
                        href={`/category/${category.slug}?${geoParameter}`}
                    >
                        <div className="w-[50px]">
                            <img src={category.image} className="max-w-[50px] max-h-[30px] pr-4" />
                        </div>
                        {category.title}
                  </Link>
                ))}
              </div>
        </>
    );
}