
import React from 'react';
import { Link, usePage } from "@inertiajs/react";
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown} from '@fortawesome/free-solid-svg-icons';



export default function TopMenu() {

    const [openMenuLarge, setOpenMenuLarge] = React.useState(false);

    const { props } = usePage();
    const categories = props.categories;
    const user = props.auth?.user;

    const userMenu = (
        <div className="flex flex-row">
            <Link
                className="text-gray-500 hover:text-gray-700 flex flex-row" 
                href={route('logout')} 
                method="post"
            >
                <img 
                    className="mr-2"
                    src="/images/icons/logout.png" 
                    alt="logo" 
                    width="30" 
                    height="30"
                />
                <div>
                    Deconnexion
                </div>
            </Link>
        </div>
    )

    const guestMenu = (
        <div className="flex flex-row content-center ">
            <Link
                href={route('register')}
                className="text-gray-500 hover:text-gray-700 flex flex-row pr-8"
            >
                <img 
                    className="mr-2"
                    src="/images/icons/new_user.png" 
                    alt="logo" 
                    width="30" 
                    height="30"
                />
                <div>
                    S'enregistrer
                </div>
            </Link>
            <Link
                href={route('login')}
                className="text-gray-500 hover:text-gray-700 flex flex-row"
            >
                <img 
                    className="mr-2"
                    src="/images/icons/login.png" 
                    alt="logo" 
                    width="30" 
                    height="30"
                />
                <div>
                    Connexion
                </div>
            </Link>
        </div>
    )

    // large menu used for tablet and desktop
    const menuLarge = (
        <div className="flex flex-row justify-between h-[50px] border-b-2 px-40 w-full ">
            <div className="flex flex-row">
                <Link href="/">
                    <img src="/images/logo.svg" alt="logo" width="50" height="50" />
                </Link>
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
            <div>
                {user ? (
                    <>{userMenu}</>
                ) : (
                    <>{guestMenu}</>
                )}
            </div>
        </div>
    )

    // narrow menu used by mobile phones
    const menuNarrow = [
        <div className="lg:hidden flex flex-col w-full">
        </div>
    ]
    
    
    return (
        <nav>
            {menuNarrow}
            {menuLarge}
        </nav>
    );
}
