
import "./Footer.css"
import Link from "next/link"
function Footer() {
  return (
    <footer>
        <div className="footer__container">
         <Link href="/">
          <div className="footer__item">
          Invoicy © 2024
          </div>
          </Link>
          <Link href="/">

          <div className="footer__item">
          Legal
          </div>
          </Link>
          <Link href="/">

          <div className="footer__item">
          Contact
          </div>
          </Link>
        </div>
    </footer>
  )
}

export default Footer