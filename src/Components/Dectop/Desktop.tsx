import React from "react";
import styles from "../Dectop/Desktop.module.scss";
// import { useIsMobile } from "../../hooks/useIsMobile";
import {
  CirclePoints,
  CircleButton,
  DateInterval,
  DateSlider,
  DynamicLabel,
  EventSlider,
  MyTitle,
} from "../MyComponents";
// import HierarchicalCalculator from "../MyComponents/HierarchicalCalculator/HierarchicalCalculator";

import Testimonials from "../MyComponents/Testimonial/Testimonial";
import WhyUs from "../MyComponents/WhyUs/WhyUs";
import Footer from "../MyComponents/Footer/Footer";
import StyledCalculator from "../MyComponents/StyledCalculator/StyledCalculator";
import PortfolioPreview from "../MyComponents/PortfolioPreview/PortfolioPreview";

// Константы для размеров и позиционирования
const CIRCLE_RADIUS = 210;
const CIRCLE_VIEWBOX = 240;

const CIRCLE_BUTTON_POSITION = {
  top: "264px",
  left: "1148px",
};

export const Desktop: React.FC = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.background}
            style={{ backgroundImage: `url(/assets/rectangle-1.png)` }}
          >
            {/* Фоновое изображение */}
            <img
              className={styles.groupImage}
              src="/assets/group-3048.png"
              alt="Group"
              loading="lazy"
            />

            {/* Наложение компонентов */}
            <div className={styles.overlay}>
              {/* 2020-2027 */}
              <DateInterval className={styles.years} />
              {/* круг с точками */}
              <CirclePoints
                r={CIRCLE_RADIUS}
                viewBoxSize={CIRCLE_VIEWBOX}
                className={styles.maskImage}
              />

              {/* наука и тд  */}
              <DynamicLabel />
              {/* слайд свайпер 01/01  и тд  */}
              <EventSlider className={styles.group2} />

              {/* Историч события */}
              <MyTitle className={styles.title} />
              {/* даты слайдер */}
              <DateSlider className={styles.dateSliderPosition} />
              {/* это кружочек к кружку */}
              <CircleButton
                className={styles.smallText}
                top={CIRCLE_BUTTON_POSITION.top}
                left={CIRCLE_BUTTON_POSITION.left}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <HierarchicalCalculator/> 
       */}
         <div
      style={{
        maxWidth: 600,
        margin: "20px auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 10,
      }}
    >
      <h3>Поздравляем, вы прошли испытание! Значит, вы не рекламный бот, а настоящий пользователь. Калькулятор уже ждёт вас 🧮✨</h3>
    </div>
       
      <StyledCalculator/>
      <PortfolioPreview/>
      <Testimonials/>
      <WhyUs/>
      <Footer/>
      </div>
  );
};
