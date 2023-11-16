import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <ul className="nav border-bottom mb-3 border-2">
        <li className="nav-item">
          <Link href={"/"} className="nav-link text-danger">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link href={"/"} className="nav-link text-danger">
            Withdraw
          </Link>
        </li>
        <li className="nav-item">
          <Link href={"/"} className="nav-link text-danger">
            Fund Account
          </Link>
        </li>
        <li className="nav-item">
          <Link href={"/"} className="nav-link text-danger">
            Update Info
          </Link>
        </li>
        <li className="nav-item">
          <Link href={"/"} className="nav-link text-danger">
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
