import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay,Pagination } from 'swiper/modules';

// 🔹 Импорт стилей Swiper
import type { SwiperClass } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from '../../../Components/Dectop/Desktop.module.scss';
import "../EventSlider/EventSlider.module.scss";
// 🔹 Redux: RootState и actions
import type { RootState } from '../../../store/store';
interface EventSliderProps {
  className?: string;
  top?: string | number; 
  left?: string | number; 
  slidesPerView?: number;
  width?: string | number; 
  height?: string | number; 
}

// 🔹 Данные событий
const eventsByPoint = [
  {
    id: 6,
    events: [
      {
        year: "Дизайн",
        text: "мы создаём визуально привлекательные и удобные интерфейсы, которые подчёркивают индивидуальность вашего бренда.",
      },
      {
        year: "Возможности",
        text: "Мы находим новые решения для вашего проекта",
      },
      {
        year: "Инновации",
        text: "Современный технологии, обеспечивают скорость загрузки сайта",
      },
      {
        year: "Точность",
        text: "Мы тщательно планируем структуру и навигацию сайта",
      },
      {
        year: "Поддержка",
        text: "Мы создаём сайты, которые остаются актуальными и поддерживаются.",
      }
    ]
  },
  {
    id: 2,
    events: [
      {
        year: "По тз",
        text: "Собираем данные с сайтов, платформ и сервисов, которые важны для вашего бизнеса.",
      },
      {
        year: "Автоматизация",
        text: "Парсеры работают 24/7, экономя время и ресурсы сотрудников.",
      },
      {
        year: "Интеграция",
        text: "Данные можно автоматически отправлять в CRM, базы данных или отчётные системы.",
      },
      {
        year: "Аналитика",
        text: "Парсеры не просто собирают информацию, но и структурируют её для удобного анализа.",
      },
      {
        year: "Поддержка",
        text: "Мы следим за корректной работой парсеров и добавляем новые источники по мере роста бизнеса.",
      }
    ]
  },
  {
    id: 3,
    events: [
      {
        year: "Создание ИИ",
        text: "Разрабатываем нейронные сети под ваши задачи: классификация, прогнозирование, обработка изображений и текста.",
      },
      {
        year: "Автоматизация",
        text: "Нейросети помогают принимать решения, анализировать данные и находить закономерности быстрее человека.",
      },
      {
        year: "Интеграция",
        text: "Наши модели легко подключаются к сайтам, приложениям и внутренним системам компании.",
      },
      {
        year: "Улучшение",
        text: "Интеллектуальные функции делают сервисы умнее, удобнее и персонализированнее.",
      },
      {
        year: "Поддержка",
        text: "Мы сопровождаем нейросети, обучаем их на новых данных и расширяем функционал по мере роста вашего бизнеса.",
      }
    ]
  },
  {
    id: 4,
    events: [
      {
        year: "Создание",
        text: "разрабатываем приложения под iOS, Android и браузеры и телеграм",
      },
      {
        year: "Автоматизация",
        text: "Приложения помогают пользователям и сотрудникам быстро выполнять задачи и получать нужную информацию.",
      },
      {
        year: "Интеграция",
        text: "Приложения могут подключаться к CRM, базам данных, сервисам и другим инструментам компании.",
      },
      {
        year: "Улучшение",
        text: "Продуманный дизайн и удобный интерфейс делают работу с приложением простой и приятной.",
      },
      {
        year: "Поддержка",
        text: "Мы сопровождаем приложения, исправляем ошибки и добавляем новые функции по мере роста бизнеса",
      }
    ]
  },
  {
    id: 5,
    events: [
      {
        year: "Создание",
        text: "Мы разрабатываем уникальных ботов под ваши задачи: для сайта, мессенджеров или социальных сетей",
      },
      {
        year: "Автоматизация",
        text: "Боты помогают экономить время, отвечают на вопросы клиентов и выполняют рутинные задачи.",
      },
      {
        year: "Интеграция",
        text: "Наши боты могут работать с CRM, базами данных и другими сервисами для удобства вашего бизнеса.",
      },
      {
        year: "Улучшение",
        text: "Боты делают взаимодействие с клиентами простым и быстрым, как живой помощник",
      },
      {
        year: "Поддержка",
        text: "Мы не только создаём ботов, но и сопровождаем их, добавляя новые функции по мере роста вашего бизнеса.",
      }
    ]
  },
  {
    id: 1,
    events: [
      {
        year: "Создание",
        text: "Мы настраиваем систему так, чтобы она отражала все процессы вашей компании.",
      },

      {
        year: "Интеграция",
        text: "Если вам нужно интегрировать стороннюю CRM, и в этом мы тоже вам поможем",
      },
       {
        year: "Автоматизация",
        text: "Мы настраиваем CRM так, чтобы она экономила ваше время и ресурсы",
      },

      {
        year: "Улучшение",
        text: "Вся история общения, звонки и письма собираются в одном месте для быстрого реагирования.",
      },
      {
        year: "Поддержка",
        text: "Мы сопровождаем CRM, добавляем новые функции и оптимизируем под рост вашего бизнеса.",
      }
    ]
  }
];

export const EventSlider = ({ className, top, left='143px', slidesPerView = 3, width="1440px", height="200px"  }: EventSliderProps) => {

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
          pagination={{ el: ".custom-pagination", clickable: true }}
        // autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      

        onSlideChange={handleSlideChange}
        slidesPerView={slidesPerView}
        spaceBetween={3}


        style={{ width, height, margin: "0 auto" ,  marginTop: "320px",
    position: "relative",  left  }}
      >
        {currentPointEvents.map((event, index) => (
          <SwiperSlide key={`${currentPointId}-${index}`}  style={{ width: '150px' }}>
            <div className={styles.block}>
              <p className={styles.blockText}>{event.text}</p>
              <div className={styles.blockYear}>{event.year}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

  <div className="custom-pagination" />
    </div>
  );
};

export default EventSlider;

