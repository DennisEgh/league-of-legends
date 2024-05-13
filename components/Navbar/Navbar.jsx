"use client";
import "./Navbar.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../style/assets/logo.png";
import Account from "../../style/assets/account.svg";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Dashboard from "../../style/assets/house.svg"
import Invoice from "../../style/assets/paper.svg";

function Navbar() {
  const { status, data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);

  const open = Boolean(anchorEl);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalVisible]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (status === "authenticated") {
      toast.success("Signed In");
    } else {
      toast.warning("Signed Out");
    }
  }, [status]);

  return (
    <nav className="fade-in ">
      <div className="nav__container">
        <div className="nav__item--start">
          <Link href="/" onClick={handleClose}>
            <Image
              loading="lazy"
              width={100}
              height={20}
              alt="Logo"
              src={Logo}
              className="logo"
            />
          </Link>
        </div>
        <div className="nav__item--middle">
          <Link className="nav__item--link" href="/" onClick={handleClose}>
            Services
          </Link>

          <Link className="nav__item--link" href="/" onClick={handleClose}>
            About Us
          </Link>

          <Link className="nav__item--link" href="/" onClick={handleClose}>
            Contact
          </Link>
        </div>
        <div className="nav__item--end">
          {status === "authenticated" ? (
            <Link className="account" href="" onClick={handleClick}>
              <Image
                loading="lazy"
                width={24}
                height={24}
                alt="Account"
                src={Account}
                className="account__logo"
              />
            </Link>
          ) : (
            <Link  className="account"  href="" onClick={() => signIn("google")}>
              <Image
                loading="lazy"
                width={24}
                height={24}
                alt="Sign In"
                src={Account}
                className="account__logo"
              />
            </Link>
          )}
          <div className="burger__menu " onClick={toggleModal}>
            <MenuIcon className="burger" />
          </div>
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link href={"/invoicyaccount"}>
          <MenuItem>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" onClick={handleClose} />
            </ListItemIcon>
            Dashboard
          </MenuItem>
        </Link>
        <Divider />
        
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <div className={`modal__bg ${modalVisible ? "modalVisible" : ""}`}></div>
      <div
        ref={modalRef}
        className={`modal ${modalVisible ? "modalVisible" : ""}`}
      >
        <div className="modal__items">
          <div className="modal__item">
          <Image
                loading="lazy"
                width={24}
                height={24}
                alt="Account"
                src={Account}
                className="account__logo"
              />
            <h1 className="modal__title">Account</h1>
          </div>
          <div className="divider"></div>
          <div className="modal__item">
          <Image
                        className="logo"
                        src={Dashboard}
                        width={24}
                        loading="lazy"
                        height={24}
                        alt="Dashboard logo"
                      />
            <h1 className="modal__title">Dashboard</h1>
          </div>
          <div className="modal__item">
          <Image
                        className="logo"
                        src={Invoice}
                        width={24}
                        loading="lazy"
                        height={24}
                        alt="Invoice logo"
                      />
            <h1 className="modal__title">Invoices</h1>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
