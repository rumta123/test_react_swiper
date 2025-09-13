import React from "react";
import styles from "../Dectop/Desktop.module.scss"
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

// Константы для размеров и позиционирования
const CIRCLE_RADIUS = 210;
const CIRCLE_VIEWBOX = 240;



const CIRCLE_BUTTON_POSITION = {
  top: "264px",
  left: "1148px",
};

export const Desktop: React.FC = () => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.background}>
          {/* Фоновое изображение */}
          <img
            className={styles.groupImage}
            src="https://c.animaapp.com/E93a9PUr/img/group-3048.png"
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
            <EventSlider />

      
{/* Историч события */}
            <MyTitle className={styles.title}/>
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
  );
};
