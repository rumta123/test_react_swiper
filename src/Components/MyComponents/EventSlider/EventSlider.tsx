// src/components/EventSlider/EventSliderWithSwiper.tsx

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay,Pagination } from 'swiper/modules';

// 🔹 Импорт стилей Swiper
import '../../../../node_modules/swiper/swiper.scss';
import '../../../../node_modules/swiper/modules/autoplay.scss';
import '../../../../node_modules/swiper/modules/navigation.scss';
import '../../../../node_modules/swiper/modules/pagination.scss'

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";


import type { SwiperClass } from "swiper/react";
import styles from '../../../Components/Dectop/Desktop.module.css';
import "../EventSlider/EventSlider.module.css";
// 🔹 Redux: RootState и actions
import type { RootState } from '../../../store/store';
interface EventSliderProps {
  className?: string;
  top?: string | number; 
  left?: string | number; 
  slidesPerView?: number;
}

// 🔹 Данные событий
const eventsByPoint = [
  {
    id: 6,
    events: [
      {
        year: "2015",
        text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
      },
      {
        year: "2014",
        text: "Открытие гравитационных волн обсерваторией LIGO - революция в астрофизике",
      },
      {
        year: "2013",
        text: "Миссия Curiosity подтверждает наличие воды на Марсе в прошлом",
      },
      {
        year: "2012",
        text: "Запуск космического телескопа Gaia для составления карты Млечного Пути",
      },
      {
        year: "2011",
        text: "Завершение программы Space Shuttle после 30 лет космических полетов",
      }
    ]
  },
  {
    id: 5,
    events: [
      {
        year: "2016",
        text: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
      },
      {
        year: "2017",
        text: "Обнаружение первого межзвездного астероида Оумуамуа",
      },
      {
        year: "2018",
        text: "Запуск миссии Parker Solar Probe для изучения Солнца",
      },
      {
        year: "2019",
        text: "Китайский луноход Chang'e 4 совершает первую посадку на обратной стороне Луны",
      },
      {
        year: "2020",
        text: "SpaceX совершает первый пилотируемый полет на МКС на корабле Crew Dragon",
      }
    ]
  },
  {
    id: 4,
    events: [
      {
        year: "2017",
        text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
      },
      {
        year: "2018",
        text: "Прорыв в области искусственного интеллекта: AlphaZero побеждает в шахматы и го",
      },
      {
        year: "2019",
        text: "Разработка квантового превосходства Google - квантовый компьютер решает задачу за 200 секунд",
      },
      {
        year: "2020",
        text: "Пандемия COVID-19 ускоряет развитие телемедицины и удаленной работы",
      },
      {
        year: "2021",
        text: "Метавселенная становится новой технологической парадигмой развития интернета",
      }
    ]
  },
  {
    id: 3,
    events: [
      {
        year: "2018",
        text: "Запуск первого в мире квантового спутника связи «Мо-Цзы»",
      },
      {
        year: "2019",
        text: "Создание первого в мире квантового компьютера с 53 кубитами",
      },
      {
        year: "2020",
        text: "Разработка квантовых алгоритмов для решения сложных оптимизационных задач",
      },
      {
        year: "2021",
        text: "Квантовая криптография становится коммерчески доступной технологией",
      },
      {
        year: "2022",
        text: "Прорыв в квантовой телепортации на расстояние более 1000 км",
      }
    ]
  },
  {
    id: 2,
    events: [
      {
        year: "2019",
        text: "Впервые получено изображение чёрной дыры телескопом Event Horizon Telescope",
      },
      {
        year: "2020",
        text: "Обнаружение фосфина в атмосфере Венеры - возможный признак жизни",
      },
      {
        year: "2021",
        text: "Марсоход Perseverance совершает посадку на Марс и начинает поиски жизни",
      },
      {
        year: "2022",
        text: "Запуск космического телескопа James Webb - нового глаза человечества во Вселенной",
      },
      {
        year: "2023",
        text: "Открытие тысяч новых экзопланет, включая потенциально обитаемые миры",
      }
    ]
  },
  {
    id: 1,
    events: [
      {
        year: "2020",
        text: "Разработка и массовое производство вакцин против COVID-19 за рекордно короткий срок",
      },
      {
        year: "2021",
        text: "Глобальный переход к зеленой энергетике: рекордные инвестисы в ВИЭ",
      },
      {
        year: "2022",
        text: "Искусственный интеллект создает произведения искусства и музыку уровня человека",
      },
      {
        year: "2023",
        text: "Прорыв в ядерном синтезе: достижение положительного энергетического баланса",
      },
      {
        year: "2024",
        text: "Колонизация Марса: первые постоянные поселения на красной планете",
      }
    ]
  }
];

export const EventSlider = ({ className, top, left='143px', slidesPerView = 3  }: EventSliderProps) => {

  const swiperRef = useRef<SwiperClass | null>(null);
  const selectedPoint = useSelector(
    (state: RootState) => state.point.selectedPoint
  );

  // 🔗 Находим события для выбранной точки (по умолчанию точка 6)
  const currentPointId = selectedPoint?.id || 6;
  const currentPointEvents = eventsByPoint.find(point => point.id === currentPointId)?.events || eventsByPoint[0].events;

  // 🔁 Синхронизация: при изменении выбранной точки → переключаем на первый слайд
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0, 800); // Возвращаем к первому событию точки
    }
  }, [currentPointId]);

  // 🔄 При смене слайда (свайп, стрелки) → отправляем команду кругу
  const handleSlideChange = () => {
    // Можно добавить дополнительную логику вращения если нужно
    // dispatch(rotateToIndex(swiper.activeIndex));
  };

  return (
    <div className={`${className}`} style={{ top }} >
      {/* Заголовок */}

      {/* Swiper слайдер - теперь показывает события выбранной точки */}
      <Swiper
        breakpoints={{
    320: { slidesPerView: 2  },   // телефоны
    768: { slidesPerView: 2 },   // планшеты
    1024: { slidesPerView: 3  },  // десктопы
  }}
        modules={[Navigation, Autoplay, Pagination]}
        navigation
        pagination={{ clickable: true }}
        // autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        slidesPerView={slidesPerView}
        spaceBetween={3}


        style={{ width: "1440px", height: "200px", margin: "0 auto" ,  marginTop: "320px",
    position: "relative",  left  }}
      >
        {currentPointEvents.map((event, index) => (
          <SwiperSlide key={`${currentPointId}-${index}`}>
            <div className={styles.block}>
              <p className={styles.blockText}>{event.text}</p>
              <div className={styles.blockYear}>{event.year}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

  
    </div>
  );
};

export default EventSlider;

