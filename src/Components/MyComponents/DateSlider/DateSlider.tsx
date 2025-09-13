import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/store";
import { selectPoint } from "../../../store/pointSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "../../../../node_modules/swiper/swiper.min.css";
import "../../../../node_modules/swiper/modules/effect-fade.css";

import styles from "./DateSlider.module.scss";
import Vector2 from "../../../assets/Vector 2.svg";
import { ArrowButton } from "./ArrowButton";

interface DateItem {
  date: string;
}

interface Point {
  id: number;
  label: string;
}

interface DateSliderProps {
  style?: React.CSSProperties;
    className?: string;
}

const dateItems: DateItem[] = [
  { date: "06/06" },
  { date: "05/05" },
  { date: "04/04" },
  { date: "03/03" },
  { date: "02/02" },
  { date: "01/01" },
];

export const DateSlider: React.FC<DateSliderProps> = ({ style, className  }) => {
  const dispatch = useDispatch();
  const selectedPoint = useSelector(
    (state: RootState) => state.point.selectedPoint
  );
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (swiperInstance && selectedPoint) {
      const index = 6 - selectedPoint.id;
      if (index >= 0 && index < dateItems.length) {
        swiperInstance.slideTo(index);
      }
    }
  }, [selectedPoint, swiperInstance]);

  const handleSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.activeIndex;
    const newId = 6 - newIndex;
    const item: Point = { id: newId, label: String(newId) };
    dispatch(selectPoint(item));
  };

  const handleSwiperInit = (swiper: SwiperType) => {
    setSwiperInstance(swiper);
  };

  // Текущая дата сверху
  const currentDate =
    selectedPoint?.id
      ? dateItems[6 - selectedPoint.id]?.date
      : dateItems[0].date;

  return (
<div className={`${styles.dateSlider} ${className || ""}`} style={style}>
      {/* Дата над стрелками */}
      <div className={styles.currentDate}>{currentDate}</div>

      {/* Стрелки */}
      <div className={styles.arrows}>
        <ArrowButton
          direction="next"
          onClick={() => swiperInstance?.slidePrev()}
          icon={Vector2}
          alt="Next"
        />
        <ArrowButton
          direction="prev"
          onClick={() => swiperInstance?.slideNext()}
          icon={Vector2}
          alt="Prev"
        />
      </div>

      {/* Слайдер */}
      <Swiper
        modules={[EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        onSwiper={handleSwiperInit}
        onSlideChange={handleSlideChange}
        noSwiping={true}
        allowTouchMove={false}
        className={styles.swiperWrapper}
      >
        {dateItems.map((_item, i) => (
          <SwiperSlide key={i} className={styles.swiperSlide}>
            {/* Можно оставить пустым или добавить контент слайда */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DateSlider;
