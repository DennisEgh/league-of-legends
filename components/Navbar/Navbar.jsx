"use client";
import "./Navbar.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../style/assets/logo.png";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

function Navbar() {
  const { status, data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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

          <Link className="nav__item--link" href="/">
            Contact
          </Link>

          {status === "authenticated" ? (
            <Link href="/">
              <Avatar
                onClick={handleClick}
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
        <MenuItem>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" onClick={handleClose} />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={ () => signOut()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </nav>
  );
}

export default Navbar;
