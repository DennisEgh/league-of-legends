"use client";
import Image from "next/image";
import "./Partners.css";
import img1 from "../../style/assets/account.svg";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import SEB from "../../style/assets/SEB.svg";
import Danskebank from "../../style/assets/Danskebank.svg";
import Nordea from "../../style/assets/Nordea.svg";
import Swedbank from "../../style/assets/Swedbank.svg";
import Handelsbanken from "../../style/assets/Handelsbanken.svg"

const Partners = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <section id="partners">
      <h1 className="partners__title">
        Banks that trust, and offer our services
      </h1>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <Image
              className="bank"
              loading="lazy"
              width={100}
              height={50}
              alt="leim"
              src={Danskebank}
            />
          </div>
          <div className="embla__slide">
            <Image
              className="bank"
              loading="lazy"
              width={100}
              height={50}
              alt="leim"
              src={Swedbank}
            />
          </div>
          <div className="embla__slide">
            <Image
              className="bank"
              loading="lazy"
              width={75}
              height={75}
              alt="leim"
              src={SEB}
            />
          </div>
          <div className="embla__slide">
            <Image
              className="bank"
              loading="lazy"
              width={100}
              height={50}
              alt="leim"
              src={Nordea}
            />
        
          
          </div>
          <div className="embla__slide">
            <Image
              className="bank"
              loading="lazy"
              width={100}
              height={50}
              alt="leim"
              src={Handelsbanken}
            />
        
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
