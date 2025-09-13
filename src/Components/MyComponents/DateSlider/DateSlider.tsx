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
    let index = 6 - selectedPoint.id;

    // Защита: индекс 0-5
    index = Math.max(0, Math.min(dateItems.length - 1, index));

    // Только если реально нужно переключиться
    if (swiperInstance.activeIndex !== index) {
      swiperInstance.slideTo(index, 300);
    }
  }
}, [selectedPoint, swiperInstance]);

const handleSlideChange = (swiper: SwiperType) => {
  // ❗ Откладываем диспатч на следующий тик — чтобы activeIndex точно обновился
  setTimeout(() => {
    let newIndex = swiper.activeIndex;

    // Защита от некорректных значений
    newIndex = Math.max(0, Math.min(dateItems.length - 1, newIndex));

    const newId = 6 - newIndex;
    const clampedId = Math.max(1, Math.min(6, newId));

    const item: Point = { id: clampedId, label: String(clampedId) };
    dispatch(selectPoint(item));
  }, 0);
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
  direction="prev" // ← стрелка ВЛЕВО (назад)
  onClick={() => swiperInstance?.slidePrev()} // ← листаем НАЗАД
  icon={Vector2}
  alt="Previous"
/>
<ArrowButton
  direction="next" // ← стрелка ВПРАВО (вперёд)
  onClick={() => swiperInstance?.slideNext()} // ← листаем ВПЕРЁД
  icon={Vector2}
  alt="Next"
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
