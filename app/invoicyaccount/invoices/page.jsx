"use client";
import Image from "next/image";
import "../../../style/account.css";
import Dashboard from "../../../style/assets/house.svg";
import Link from "next/link";
import Settings from "../../../style/assets/settings.svg";
import Invoice from "../../../style/assets/paper.svg";
import Signout from "../../../style/assets/signout.svg";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner/Spinner";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "sonner";

function Invoices() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const { status, data: session } = useSession();
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;
  const pagesToShow = 2;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(userData.length / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/userFetch");
      const data = await res.json();

      const userEmail = session?.user?.email;
      if (userEmail) {
        const filteredPosts = data.filter((user) => user.email === userEmail);
        setUserData(filteredPosts);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (status === "authenticated") {
      fetchUser();
      setLoading(false);
    }
  }, [status, session]);
  console.log(userData);

  async function createInvoice(email) {
    try {
      let Name = "bil";
      let OCR = "81238-31231s";
      let BankGiro = "032131-31241";
      let Due_Date = "04-03-2025";
      let Amount_Due = 2524;

      const response = await fetch("http://localhost:3000/api/invoiceCreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          OCR,
          email,
          BankGiro,
          Due_Date,
          Amount_Due,
          Name,
        }),
      });

      if (!response.ok) {
        console.error("Failed to create invoice:", response.statusText);
        return;
      }
      fetchUser();
      toast.success(`Invoice created`);
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/invoiceDelete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (!response.ok) {
        console.error("Failed to delete invoice:", response.statusText);
        return;
      }

      fetchUser();
      toast.warning(`Invoice deleted`);
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

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

          <div className="section__content">
            <div className="section__greeting">
              <h1 className="section__title">Invoices</h1>
            </div>

            <div className="invoice__interface--container">
              {userData.length > 0 && (
                <span className="pagination__current-page">
                  Page {currentPage} of{" "}
                  {Math.ceil(userData.length / itemsPerPage)}
                </span>
              )}
              {userData.length === 0 && (
                <span className="pagination__current-page">
                  No invoices found
                </span>
              )}
              <button onClick={() => createInvoice(session?.user.email)}>
                click
              </button>{" "}
              <div className="invoice__interface--overview">
                <div className="invoice__search--container">
                  <SearchIcon />
                  <InputBase
                    onChange={handleSearch}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Invoices"
                    inputProps={{ "aria-label": "search invoices" }}
                  />
                </div>

                <p className="invoice__interface--para ">OCR</p>

                <p className="invoice__interface--para ">BankGiro</p>
                <p className="invoice__interface--para ">Due Date </p>
                <p className="invoice__interface--para ">Amount Due </p>
              </div>
              {userData

                .filter((user) =>
                  user.Name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .slice(startIndex, endIndex)
                .map((user, index) => (
                  <div className="invoice__interface--overview" key={index}>
                    <div className="invoice__name--container">
                      <p className="invoice__interface--para">{user.Name}</p>
                    </div>
                    <p className="invoice__interface--para">{user.BankGiro}</p>
                    <p className="invoice__interface--para">{user.OCR}</p>
                    <p className="invoice__interface--para">{user.Due_Date}</p>
                    <p className="invoice__interface--para">
                      {user.Amount_Due} kr
                    </p>
                    <DeleteOutlineIcon
                      onClick={() => handleDelete(user._id)}
                      className="delete"
                    />
                  </div>
                ))}
            </div>
            {userData.length > itemsPerPage && (
              <div className="pagination-controls">
                <div
                  className="pagination__button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </div>
                {[...Array(Math.ceil(userData.length / itemsPerPage)).keys()]
                  .slice(currentPage - 1, currentPage + pagesToShow - 1)
                  .map((page) => (
                    <div
                      key={page}
                      className={`pagination__button ${
                        currentPage === page + 1 ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(page + 1)}
                    >
                      {page + 1}
                    </div>
                  ))}

                <div
                  className="pagination__button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage === Math.ceil(userData.length / itemsPerPage)
                  }
                >
                  Next
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Invoices;
