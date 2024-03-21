
import React from 'react';
import { Link, usePage } from "@inertiajs/react";
import { Button, Collapse, IconButton, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faXmark, faC} from '@fortawesome/free-solid-svg-icons';



export default function TopMenu() {

    const [openMenuLarge, setOpenMenuLarge] = React.useState(false);
    const [openMenuSmall, setOpenMenuSmall] = React.useState(false);
    const [openMenuCategoriesSmall, setOpenMenuCategoriesSmall] = React.useState(false);

    const { props } = usePage();
    const categories = props.categories;
    const user = props.auth?.user;

    const userMenu = (
        <div className="text-gray-800 md:text-gray-500 hover:text-gray-700 flex flex-row items-center h-[50px] pb-8 md:pb-0">
             <div className="w-[50px] md:w-max mr-0 md:mr-2">
                <img className="mr-2" src="/images/icons/logout.png" alt="logout" />
            </div>
            <div className="leading-4">
                Deconnexion
            </div>
        </div>
    );
          

    const guestMenu = (
        <div className="flex flex-col md:flex-row">
            <Link
                href={route('register')}
                className="text-gray-800 md:text-gray-500 hover:text-gray-700 flex flex-row items-center pr-4 w-full pb-8 md:pb-0"
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
                className="text-gray-800 md:text-gray-500 hover:text-gray-700 flex flex-row items-center pb-8 md:pb-0"
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
          <div className="flex flex-col w-full border-b-2 px-8 md:hidden ">
            {/** menu small header */}
            <div className="flex flex-row w-full justify-between h-[50px] items-center mb-4">
              <div>
                <Link href="/">
                  <img src="/images/logo.svg" alt="logo" width="50" height="50" />
                </Link>
              </div>
              <div onClick={() => setOpenMenuSmall(prevState => !prevState)}>
                {openMenuSmall ? (
                  <FontAwesomeIcon className="h-4 w-4" icon={faXmark} />
                ) : (
                  <FontAwesomeIcon className="h-4 w-4" icon={faBars} />
                )}
              </div>
            </div>
      
            {/** menu small body */}
            <Collapse open={openMenuSmall} className="w-full flex flex-col text-gray-800">
              {/** category label */}
              <div
                className="w-full justify-between flex pb-8"
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
                    className="w-full flex flex-row pb-8"
                    key={category.slug} // Key for efficient rendering
                    href={`/categories/${category.slug}`}
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
                            className="text-gray-500 hover:text-gray-700"
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
                        <div className="grid grid-cols-3 gap-y-2 outline-none outline-0 w-full p-8">
                            {categories.map((category) => (
                                <MenuItem key={category.id}>
                                    <Link
                                        className="w-full text-gray-500 hover:text-gray-700 flex flex-row pb-8" 
                                        href={`/categories/${category.slug}`}
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


