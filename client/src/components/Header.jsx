import React from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center bg-light_green py-4 px-16">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="w-28 object-contain cursor-pointer"
        />
      </Link>
      <Link to="/create-post">
        <button className="px-4 py-2 rounded-md bg-dark text-space_white hover:bg-space_white hover:text-dark transition ease-in-out hover:scale-[1.1] border-none cursor-pointer">
          create
        </button>
      </Link>
    </header>
  );
};

export default Header;
