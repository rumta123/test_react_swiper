import { useSelector } from 'react-redux';
import type { RootState } from "../../../store/store";
import styles from "../../../Components/Dectop/Desktop.module.scss";



// Тип для интервалов дат
interface DateInterval {
  startYear: number|string;
  endYear: number|string;
  startColor: string;
  endColor: string;
 
}
interface DateInterval1 {

  className: string;
}
export const DateInterval = ({ className  }: DateInterval1) => {
  const selectedPoint = useSelector((state: RootState) => state.point.selectedPoint);
  

  const dateIntervals: Record<number, DateInterval> = {
    6: { startYear: 'Сай', endYear: 'ты', startColor: 'blue', endColor: 'pink' },
    2: { startYear: 'Парсе', endYear: 'ры', startColor: 'blue', endColor: 'pink' },
    3: { startYear: 'Нейрон', endYear: 'ки', startColor: 'blue', endColor: 'pink' },
    4: { startYear: 'Прило', endYear: 'жения', startColor: 'blue', endColor: 'pink' },
    5: { startYear: 'Бо', endYear: 'ты', startColor: 'blue', endColor: 'pink' },
    1: { startYear: 'Срм', endYear: 'ки', startColor: 'blue', endColor: 'pink' },
  };

  // Получаем интервал для выбранной точки или используем точку 6 по умолчанию
  const pointId = selectedPoint?.id || 6;
  const interval = dateIntervals[pointId] || dateIntervals[6];

  return (

      <p className={className}>
        <span className={styles[`year${interval.startColor.charAt(0).toUpperCase() + interval.startColor.slice(1)}`]}>
          {interval.startYear}
        </span>
        <span className={styles[`year${interval.endColor.charAt(0).toUpperCase() + interval.endColor.slice(1)}`]}>
          {interval.endYear}
        </span>
      </p>
 
  );
};

export default DateInterval;