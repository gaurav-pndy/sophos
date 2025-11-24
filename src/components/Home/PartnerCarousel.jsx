import React from "react";
import Marquee from "react-fast-marquee";
import { partnerSections } from "../../data/partners";

const PartnerCarousel = () => {
  // Flatten all partner logos into a single array
  const allLogos = partnerSections.flatMap((section) => section.logos);

  return (
    <div className="bg-white py-12 overflow-hidden">
      <Marquee
        gradient={false}
        speed={40} // Adjust for scroll speed
        pauseOnHover={true}
        loop={0} // Infinite loop
      >
        {/* Duplicate once for seamless looping */}
        {allLogos.concat(allLogos).map((logo, i) => (
          <div
            key={i}
            className="flex justify-center items-center flex-shrink-0  px-5 "
          >
            <a
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-all duration-300 hover:scale-105"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-auto max-h-24 w-60 object-contain filter grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300"
              />
            </a>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default PartnerCarousel;
