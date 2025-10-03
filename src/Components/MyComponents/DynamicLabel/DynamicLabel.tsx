// src/components/DynamicLabel/DynamicLabel.tsx
import { useSelector } from 'react-redux';
import type { RootState } from "../../../store/store";
import styles from "../../../Components/Dectop/Desktop.module.scss";
// import styles from './DynamicLabel.module.css';

// 🔢 Маппинг: id точки → нужный текст
const labelMap: Record<number, string> = {
  6: 'Стильные',
  5: 'Умные',
  4: 'Удобство пользователю',
  3: 'Обучение и внедрение',
  2: 'Сбор и обработка данных',
  1: 'Экономия времени',
};

export const DynamicLabel = () => {
  // 📥 Получаем выбранную точку из Redux
  const selectedPoint = useSelector((state: RootState) => state.point.selectedPoint);

  // Определяем текст. Если ничего не выбрано — по умолчанию "Наука"
  const displayText = selectedPoint ? labelMap[selectedPoint.id] || 'Неизвестно' : 'Стильные';

  return (
    <div className={styles.labelScience}>
      {displayText}
    </div>
  );
};

export default DynamicLabel;