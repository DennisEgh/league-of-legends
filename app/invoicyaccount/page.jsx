"use client";
import Image from "next/image";
import "../../style/account.css";
import Dashboard from "../../style/assets/house.svg";
import Link from "next/link";
import Settings from "../../style/assets/settings.svg";
import Invoice from "../../style/assets/paper.svg";
import Signout from "../../style/assets/signout.svg";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner/Spinner";
import SEB from "../../style/assets/test.png";
import { getPostsDashboard } from "@/lib/contentful";
import { Skeleton } from "@mui/material";

function page() {
  const [loading, setLoading] = useState(true);
  const [loadingCMS, setLoadingCMS] = useState(true);
  const [data, setData] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const { status, data: session } = useSession();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPostsDashboard();
        setData(posts);
        console.log(posts);
      } catch (error) {
        setError(error);
      } finally {
        setLoadingCMS(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
    } else if (status !== "loading") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <>
      {loading && <Spinner />}
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
                      pathname === "/invoicyaccount/profilesettings"
                        ? "active"
                        : ""
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
                  <h1 className="account__navigation--title">
                    Profile Settings
                  </h1>
                </Link>
                <Link
                  className="account__navigation--link"
                  href={"/invoicyaccount/invoices"}
                >
                  <div
                    className={`logo__bg ${
                      pathname === "/invoicyaccount/invoices" ? "active" : ""
                    }`}
                  >
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

          <div className="dashboard__content">
            <div className="dashboard__greeting">
              <h1 className="dashboard__title">Dashboard</h1>
              <p className="dashboard__para">
                Welcome back{" "}
                {status === "authenticated" ? session?.user.name : "?"}
              </p>
            </div>

            <div className="dashboard__cms--container">
              {data && data.items ? (
                data.items.map((item, index) => (
                  <Link key={index} href={""} className="cms__link">
                    <div className="cms__post">
                      <img
                        className="cms__image"
                        alt="post image"
                        loading="lazy"
                        src={item.fields.image.fields.file.url}
                      />
                      <div className="cms__text--container">
                        <h1 className="cms__title">{item.fields.title}</h1>
                        <p className="cms__para">{item.fields.description}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="cms__post">
                  <Skeleton
                    className="skeleton__container"
                    animation="wave"
                    variant="rounded"
                    width={320}
                    height={118.25}
                  />

                  <Skeleton
                    width={320}
                    height={25}
                    className="skeleton__text--title"
                    variant="text"
                  />
                  <Skeleton
                    width={160}
                    height={25}
                    className="skeleton__text--para"
                    variant="text"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default page;
