import Link from "next/link";
export default function Home() {
  return (
    <section id="landing__page">
      <div className="landing__page--container ">
        <h1 className="landing__page--container--title fade-in">
          Can't afford to pay your invoice this month?
        </h1>

        <p className="landing__page--container--para fade-in-second">
          We've got you covered.
        </p>
        <Link className="landing__page--container--link fade-in-second" href="/">
          <div className="landing__page--container--cta draw-border">
            <p className="landing__page--container--cta--para">
              Get Started
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
