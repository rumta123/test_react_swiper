import React, { useCallback } from "react";
import styles from "./DateSlider.module.scss";

interface ArrowButtonProps {
  direction: "next" | "prev";
  onClick: () => void;
  icon: string;
  alt?: string;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, onClick, icon, alt }) => {
  const className =
    direction === "next"
      ? `${styles.arrowButton} ${styles.arrowNext}`
      : `${styles.arrowButton} ${styles.arrowPrev}`;

  // предотвращаем двойное срабатывание на мобилках
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    },
    [onClick]
  );

  return (
    <button
      className={className}
      onClick={handleClick}
      onTouchEnd={handleClick} // 👈 добавляем явный touch
      aria-label={alt}
    >
      <img src={icon} alt={alt} width={16} height={16} />
    </button>
  );
};
