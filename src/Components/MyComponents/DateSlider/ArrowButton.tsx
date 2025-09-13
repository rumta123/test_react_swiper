import React from "react";
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

  return (
    <button className={className} onClick={onClick} aria-label={alt}>
      <img src={icon} alt={alt} width={16} height={16} />
    </button>
  );
};