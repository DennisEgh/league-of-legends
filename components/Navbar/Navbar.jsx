"use client";
import "./Navbar.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../style/assets/logo.png";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Avatar, Skeleton } from "@mui/material";

function Navbar() {
  const { status, data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      toast.success("Signed In");
    } else {
      toast.warning("Signed Out");
      setLoading(false);
    }
  }, [status]);

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
          <Link className="nav__item--link" href="/dashboard">
            Services
          </Link>

          <Link className="nav__item--link" href="/">
            About Us
          </Link>
          {status === "authenticated" ? (
            <h1 onClick={() => signOut()}>hello</h1>
          ) : null}

          <Link className="nav__item--link" href="/">
            Contact
          </Link>

          {status === "authenticated" ? (
            <Link href="/">
              <Avatar
                alt={session?.user.name.slice(0, 2)}
                src={session?.user.image}
                sx={{ width: 35, height: 35 }}
              />
            </Link>
          ) : (
            <Link href="/" onClick={() => signIn("google")}>
              <div className="nav__item--account  ">
                <p className="nav__item--account--para">Sign-In</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
