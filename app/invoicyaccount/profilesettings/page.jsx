"use client";
import Image from "next/image";
import "../../../style/account.css";
import Dashboard from "../../../style/assets/house.svg";
import Link from "next/link";
import Settings from "../../../style/assets/settings.svg";
import Invoice from "../../../style/assets/paper.svg";
import Signout from "../../../style/assets/signout.svg";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@mui/material";

function page() {
  const pathname = usePathname();

  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
    } else if (status !== "loading") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <section id="dashboard">
      <div className="page__container">
        <div className="account__navigation--container">
          <div className="account__navigation">
            <div className="account__navigation--item">
              <Link
                className="account__navigation--link"
                href={"/invoicyaccount"}
              >
                <div
                  className={`logo__bg ${
                    pathname === "/invoicyaccount" ? "active" : ""
                  }`}
                >
                  <Image
                    className="logo"
                    src={Dashboard}
                    width={24}
                    loading="lazy"
                    height={24}
                    alt="Dashboard logo"
                  />
                </div>
                <h1 className="account__navigation--title">Dashboard</h1>
              </Link>
              <Link
                className="account__navigation--link"
                href={"/invoicyaccount/profilesettings"}
              >
                <div
                  className={`logo__bg ${
                    pathname === "/invoicyaccount/profilesettings" ? "active" : ""
                  }`}
                >
                  <Image
                    className="logo"
                    src={Settings}
                    width={24}
                    height={24}
                    loading="lazy"
                    alt="Settings logo"
                  />
                </div>
                <h1 className="account__navigation--title">Profile Settings</h1>
              </Link>
              <Link className="account__navigation--link" href={"/invoicyaccount/invoices"}>
                <div className={`logo__bg ${pathname === "/invoicyaccount/invoices" ? "active" : ""}`}>
                  <Image
                    className="logo"
                    src={Invoice}
                    width={24}
                    loading="lazy"
                    height={24}
                    alt="Invoice logo"
                  />
                </div>
                <h1 className="account__navigation--title">Invoices</h1>
              </Link>
              <div
                onClick={() => signOut()}
                className="account__navigation--link"
              >
                <div className="logo__bg--signout">
                  <Image
                    loading="lazy"
                    className="logo"
                    src={Signout}
                    width={24}
                    height={24}
                    alt="Signout logo"
                  />
                </div>
                <h1 className="account__navigation--title">Sign Out</h1>
              </div>
            </div>
          </div>
        </div>
        {status === "authenticated" ? (
          <div className="dashboard__content"></div>
        ) : (
          <Skeleton
            sx={{ bgcolor: "grey" }}
            animation="wave"
            variant="rounded"
            width={1400}
            height={500}
          />
        )}
      </div>
    </section>
  );
}

export default page;
