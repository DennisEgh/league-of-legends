import "./Navbar.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../style/assets/logo.png";

function Navbar() {
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
