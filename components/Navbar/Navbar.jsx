"use client";
import "./Navbar.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../style/assets/logo.png";
import { signIn, signOut, useSession } from "next-auth/react";

function Navbar() {
  const { status, data: session } = useSession();

  return (
    <nav className="fade-in">
      <div className="nav__container">
        <div className="nav__item--start">
          <Link href="/">
            <Image
              loading="lazy"
              width={150}
              height={50}
              alt="Logo"
              src={Logo}
              className="logo"
            />
          </Link>
        </div>
        <div className="nav__item--end">
          <Link className="nav__item--link" href="/">
            Services
          </Link>

          <Link className="nav__item--link" href="/">
            About Us
          </Link>
          {status === "authenticated" ? (
            <h1 onClick={() => signOut()}>hello</h1>
          ) : (
            <h1 onClick={() => signIn("google")}>bye</h1>
          )}

          <Image src={session?.user?.image} width={60} height={60}></Image>
          <div>name: {session?.user.name}</div>
          <Link className="nav__item--link" href="/">
            Contact
          </Link>
          <Link href="/">
            <div className="nav__item--account ">
              <p className="nav__item--account--para">Account</p>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
