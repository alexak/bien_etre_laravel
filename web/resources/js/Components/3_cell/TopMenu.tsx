
import React from 'react';
import { Link, usePage } from "@inertiajs/react";
import { Button, Collapse, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useGeolocated } from "react-geolocated";
import CategoriesMenuLarge from '@/Components/2_molecule/menu/CategoriesMenuLarge';
import UserMenu from '@/Components/2_molecule/menu/UserMenu';
import GuestMenu from '@/Components/2_molecule/menu/GuestMenu';
import CategoriesMenuSmall from '../2_molecule/menu/CategoriesMenuSmall';

export default function TopMenu() {

    const [openMenuSmall, setOpenMenuSmall] = React.useState(false);

    const { props } = usePage();
    const categories = props.categories;
    const user = props.user;

    const geoLocation = useGeolocated({
      positionOptions: {
          enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
    const geoParameter = geoLocation.coords !== undefined ? `lat=${geoLocation.coords?.latitude}&long=${geoLocation.coords?.longitude}` : "";
    

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
              <CategoriesMenuSmall 
                categories={categories} 
                geoParameter={geoParameter}
              />

              {/** user menu */}
              {user ? (
                <UserMenu />
              ) : (
                <GuestMenu />
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
              <CategoriesMenuLarge 
                categories={categories}
                geoParameter={geoParameter}
              />
              
            </div>

            {/** main menu right - user */}
            {user ? (  
                <UserMenu />
            ) : (
                <GuestMenu />
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


