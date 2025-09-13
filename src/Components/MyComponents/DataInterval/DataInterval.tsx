import { useSelector } from 'react-redux';
import type { RootState } from "../../../store/store";
import styles from "../../../Components/Dectop/Desktop.module.css";



// Тип для интервалов дат
interface DateInterval {
  startYear: number;
  endYear: number;
  startColor: string;
  endColor: string;
 
}
interface DateInterval1 {

  className: string;
}
export const DateInterval = ({ className  }: DateInterval1) => {
  const selectedPoint = useSelector((state: RootState) => state.point.selectedPoint);
  

  const dateIntervals: Record<number, DateInterval> = {
    6: { startYear: 2015, endYear: 2022, startColor: 'blue', endColor: 'pink' },
    2: { startYear: 2016, endYear: 2023, startColor: 'blue', endColor: 'pink' },
    3: { startYear: 2017, endYear: 2024, startColor: 'blue', endColor: 'pink' },
    4: { startYear: 2018, endYear: 2025, startColor: 'blue', endColor: 'pink' },
    5: { startYear: 2019, endYear: 2026, startColor: 'blue', endColor: 'pink' },
    1: { startYear: 2020, endYear: 2027, startColor: 'blue', endColor: 'pink' },
  };

  // Получаем интервал для выбранной точки или используем точку 6 по умолчанию
  const pointId = selectedPoint?.id || 6;
  const interval = dateIntervals[pointId] || dateIntervals[6];

  return (

      <p className={className}>
        <span className={styles[`year${interval.startColor.charAt(0).toUpperCase() + interval.startColor.slice(1)}`]}>
          {interval.startYear}&nbsp;&nbsp;
        </span>
        <span className={styles[`year${interval.endColor.charAt(0).toUpperCase() + interval.endColor.slice(1)}`]}>
          {interval.endYear}
        </span>
      </p>
 
  );
};

export default DateInterval;