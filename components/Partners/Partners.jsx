"use client"
import Image from "next/image";
import "./Partners.css";
import img1 from "../../style/assets/account.svg"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'


const Partners = () => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])

  return (
    <section id="partners">
      <h1 className="partners__title">
        Banks that trust, and offer our services
      </h1>
      <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
            1
            <Image
            width={24}
            height={24}
            alt="leim"
            src={img1}
            />
        </div>
        <div className="embla__slide">
            2
        <Image
            width={24}
            height={24}
            alt="leim"
            src={img1}
            />
        </div>
        <div className="embla__slide">
            3
        <Image
            width={24}
            height={24}
            alt="leim"
            src={img1}
            />
        </div>
        <div className="embla__slide">
            4
        <Image
            width={24}
            height={24}
            alt="leim"
            src={img1}
            />
        </div>
        <div className="embla__slide">
            5
        <Image
            width={24}
            height={24}
            alt="leim"
            src={img1}
            />
        </div>
      </div>
    </div>

    </section>
  );
};

export default Partners;
