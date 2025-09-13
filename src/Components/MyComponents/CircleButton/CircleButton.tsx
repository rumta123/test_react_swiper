import { useSelector } from 'react-redux';
import type { RootState } from "../../../store/store";
import styles from "./CircleButton.module.css";

interface CircleButtonProps {
  className?: string;
  top?: string | number; 
  left?: string | number; 
}

export const CircleButton = ({  top, left }: CircleButtonProps) => {
  // 📥 Получаем выбранную точку из Redux
  const selectedPoint = useSelector((state: RootState) => state.point.selectedPoint);

  // Если точки ещё нет — можно показать заглушку (например, "6")
  const displayLabel = selectedPoint?.label || '6';

  return (

      <div className={styles.circle}>
        <div className={styles.smallText} style={{ top, left }}>
          {displayLabel}
        </div>
      </div>
  
  );
};

export default CircleButton;