// src/components/DynamicLabel/DynamicLabel.tsx
import { useSelector } from 'react-redux';
import type { RootState } from "../../../store/store";
import styles from "../../../Components/Dectop/Desktop.module.css";
// import styles from './DynamicLabel.module.css';

// 🔢 Маппинг: id точки → нужный текст
const labelMap: Record<number, string> = {
  6: 'Наука',
  5: 'Технологии',
  4: 'Искусство',
  3: 'Спорт',
  2: 'Музыка',
  1: 'История',
};

export const DynamicLabel = () => {
  // 📥 Получаем выбранную точку из Redux
  const selectedPoint = useSelector((state: RootState) => state.point.selectedPoint);

  // Определяем текст. Если ничего не выбрано — по умолчанию "Наука"
  const displayText = selectedPoint ? labelMap[selectedPoint.id] || 'Неизвестно' : 'Наука';

  return (
    <div className={styles.labelScience}>
      {displayText}
    </div>
  );
};

export default DynamicLabel;