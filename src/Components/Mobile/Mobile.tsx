import React from "react";
import styles from "./Mobile.module.scss";
import {
  DateInterval,
  DateSlider,
  EventSlider,
  MyTitle,
} from "../MyComponents";
import StyledCalculator from "../MyComponents/StyledCalculator/StyledCalculator";
import PortfolioPreview from "../MyComponents/PortfolioPreview/PortfolioPreview";
import Testimonials from "../MyComponents/Testimonial/Testimonial";
import WhyUs from "../MyComponents/WhyUs/WhyUs";
import Footer from "../MyComponents/Footer/Footer";

export const Mobile: React.FC = () => {
  return (
    <div>
      <div className={styles.mobile}>
        <div className={styles.div}>
          <MyTitle className={styles.textWrapper} />

          <EventSlider
            className={styles.group2}
            left={0}
            slidesPerView={2}
            width="300px"
            height="166px"
          />
          <img
            className={styles.vector}
            alt="Vector"
            src="https://c.animaapp.com/72gsijt6/img/vector-164.svg"
          />

          <DateInterval className={styles.element} />
          <DateSlider className={styles.group3} />
        </div>
      </div>
      <StyledCalculator />
      <PortfolioPreview />
      <Testimonials />
      <WhyUs />
      <Footer />
    </div>
  );
};
