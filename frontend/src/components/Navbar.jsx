import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const {setShowSearch, getCartCount} = useContext(ShopContext);

  const NavLinks = [
    { label: "Home", path: "/" },
    { label: "Collection", path: "/collection" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="flex items-center justify-between py-5 font-medium">
    {/* Logo */}
    <Link to='/'> 
      {/* <img className="w-36" src={assets.logo} alt="Brand logo" /> */}
      <h1 className="text-2xl font-bold text-gray-700 tracking-wide font-robotoCondensed"> Liquor Mart <span className="inline-block rounded-full bg-[#C586A5] w-[10px] h-[10px] ml-0 align-middle"></span></h1>
    </Link>

    {/* Desktop Menu */}

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {NavLinks.map((link, index) => (
            <NavLink key={index} to={link.path} className='flex flex-col items-center gap-1'>
                <p className="uppercase"> {link.label}</p>
                <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
            </NavLink>
        ))}
      </ul>

      {/* right menu for mobile and desktop*/}

      <div className="flex items-center gap-5">
        <img
          onClick={()=>setShowSearch(true)}
          className="w-5 cursor-pointer"
          src={assets.search_icon}
          alt="search-icon"
          aria-label="search"
        />

        {/* profile with dropdown */}
        <div className="group relative">
          <Link to='/login'> <img
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="profile"
            aria-label="profile"
          /> </Link>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black"> My Profile </p>
              <p className="cursor-pointer hover:text-black"> Orders </p>
              <p className="cursor-pointer hover:text-black"> Logout </p>
            </div>
          </div>
        </div>

        {/* cart Icon */}
        <Link to="/cart" className="relative">
          <img
            className="w-5 min-w-5 cursor-pointer"
            src={assets.cart_icon}
            alt="cart-icon"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#C586A5] text-white aspect-square rounded-full text-[10px]">
            {getCartCount()}
          </p>
        </Link>

        {/* mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          className="w-5 cursor-pointer sm:hidden"
          src={assets.menu_icon}
          alt="menu"
          aria-label="Menu"
        />
      </div>

      {/* sidebar menu for mobile  */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600"> 
        <div
          onClick={() => setVisible(false)}
          className="flex items-center gap-4 p-3 cursor-pointer"
        >

        {/* back navigation icon */}
          <img
            className="h-4 rotate-180"
            src={assets.dropdown_icon}
            alt="drop-down"
          />
          <p>Back</p>
        </div>

        {/* side bar Links */}
        {NavLinks.map((link, index) => (
          <NavLink key={index} onClick={()=> setVisible(false)} to={link.path} className='py-2 pl-6 border uppercase'>
            {link.label}
          </NavLink>
        ))}
      </div>
      </div>
    </nav>
  );
}

export default Navbar;
