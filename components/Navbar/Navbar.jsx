import "./Navbar.css"
import Link from "next/link"

function Navbar() {
  return (
    <nav>
<div className="nav__container">
  <div className="nav__item">
<Link href={"/"}>
<p className="nav__item--para">
  Home
</p>
</Link>
  </div>
  <div className="nav__item">
<Link href={"/"}>
<p className="nav__item--para">
Champions
</p>
</Link>
  </div>
  
</div>
    </nav>
  )
}

export default Navbar