
import React from 'react';
import { Link, usePage } from "@inertiajs/react";
import { Button, Collapse, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faXmark, faC} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { useGeolocated } from "react-geolocated";

export default function TopMenu() {

    const [openMenuLarge, setOpenMenuLarge] = React.useState(false);
    const [openMenuSmall, setOpenMenuSmall] = React.useState(false);
    const [openMenuCategoriesSmall, setOpenMenuCategoriesSmall] = React.useState(false);

    const { props } = usePage();
    const categories = props.categories;
    const user = props.auth?.user;

    const geoLocation = useGeolocated({
      positionOptions: {
          enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
    const geoParameter = geoLocation.coords !== undefined ? `lat=${geoLocation.coords?.latitude}&long=${geoLocation.coords?.longitude}` : "";

    const userMenu = (
        <div className="flex flex-col md:flex-row">
          <Link
            href={route('favorites')} 
            className="flex flex-row items-center pb-4 pr-4 text-gray-800 md:text-gray-500 hover:text-gray-700 md:pb-0"
          >  
            <div className="w-[50px] md:w-max mr-0 md:mr-2">
              <FontAwesomeIcon 
                className="w-4 h-4" 
                icon={faHeartRegular}
              />
            </div>
            <div className="leading-4">
              Mes favoris
            </div>
          </Link>
          <Link
            href={route('logout')} 
            method="post"
            className="text-gray-800 md:text-gray-500 hover:text-gray-700 flex flex-row items-center h-[50px] pb-8md:pb-0"
          >  
            <div className="w-[50px] md:w-max mr-0 md:mr-2">
              <img
                className="h-[20px]" 
                src="/images/icons/logout.png" 
                alt="logout"
              />
            </div>
            <div className="leading-4">
              Deconnexion
            </div>
          </Link>
        </div>
    );
          

    const guestMenu = (
        <div className="flex flex-col md:flex-row">
            <Link
                href={route('register')}
                className="flex flex-row items-center w-full pb-8 pr-4 text-gray-800 md:text-gray-500 hover:text-gray-700 md:pb-0"
            >
                <div className="w-[50px] md:w-max mr-0 md:mr-2">
                    <img 
                        className="h-[20px]"
                        src="/images/icons/new_user.png" 
                        alt="nouveau user" 
                    />
                </div>
                <div className="leading-4">
                    S'enregistrer
                </div>
            </Link>
            <Link
                href={route('login')}
                className="flex flex-row items-center pb-8 text-gray-800 md:text-gray-500 hover:text-gray-700 md:pb-0"
            >
                <div className="w-[50px] md:w-max mr-0 md:mr-2 ">
                    <img 
                        className="h-[20px]"
                        src="/images/icons/login.png" 
                        alt="login" 
                    />
                </div>
                <div className="leading-4">
                    Connexion
                </div>
            </Link>
        </div>
    )


    // narrow menu used by mobile phones
    const menuNarrow = (
        <>
          <div className="flex flex-col w-full px-8 bg-white border-b-2 md:hidden">
            {/** menu small header */}
            <div className="flex flex-row w-full justify-between h-[50px] items-center">
              <div>
                <Link href="/">
                  <img src="/images/logo.svg" alt="logo" width="50" height="50" />
                </Link>
              </div>
              <div onClick={() => setOpenMenuSmall(prevState => !prevState)}>
                {openMenuSmall ? (
                  <FontAwesomeIcon className="w-4 h-4" icon={faXmark} />
                ) : (
                  <FontAwesomeIcon className="w-4 h-4" icon={faBars} />
                )}
              </div>
            </div>
      
            {/** menu small body */}
            <Collapse open={openMenuSmall} className="w-full flex flex-col text-gray-800 z-20 absolute top-[50px] left-0 px-8 bg-white overflow-y-auto">
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
      
              {/** user menu */}
              {user ? (
                <>{userMenu}</>
              ) : (
                <>{guestMenu}</>
              )}
            </Collapse>
          </div>
        </>
      );


    // large menu used for tablet and desktop
    const menuLarge = (
        <div className="hidden md:flex flex-row justify-between h-[50px] border-b-2 w-full items-center px-8 md:px-20 lg:px-40">
            {/** main menu left  */}
            <div className="flex flex-row">
                <Link href="/">
                    <img src="/images/logo.svg" alt="logo" width="50" height="50" />
                </Link>

                {/** categories mega menu */}
                <Menu 
                    open={openMenuLarge}
                    handler={setOpenMenuLarge}
                    placement="bottom-start"
                    offset={3}
                    allowHover
                >
                    <MenuHandler>
                        <Button 
                            variant="text"
                            ripple={false}
                            className="text-base text-gray-500 normal-case hover:text-gray-700 focus-visible:border-none focus-visible:border-0"
                        >
                            <span className="pr-4">
                                Categories
                            </span>
                            <FontAwesomeIcon
                                className={`h-3.5 w-3.5 transition-transform ${openMenuLarge ? "rotate-180" : ""}`} 
                                icon={faChevronDown}
                            />  
                        </Button>
                    </MenuHandler>
                    <MenuList className="w-full max-w-screen-xl">
                        <div className="grid w-full grid-cols-3 p-8 outline-none gap-y-2 outline-0">
                            {categories.map((category) => (
                                <MenuItem key={category.id}>
                                    <Link
                                        className="flex flex-row w-full pb-8 text-gray-500 hover:text-gray-700" 
                                        href={`/category/${category.slug}?${geoParameter}`}
                                    >
                                        <img src={category.image} className='max-w-[50px] max-h-[30px] pr-4'/>
                                        <div className="flex flex-col">
                                            <div className="font-semibold">
                                                {category.title}
                                            </div>
                                            <div>
                                                {category.description}
                                            </div>
                                        </div>
                                    </Link>
                                </MenuItem>
                            ))}
                        </div>
                    </MenuList>
                </Menu>
            </div>

            {/** main menu right - user */}
            {user ? (  
                <>{userMenu}</>
            ) : (
                <>{guestMenu}</>
            )}
        </div>
    )
    
    return (
        <nav>
            {menuNarrow}
            {menuLarge}
        </nav>
    );
}


