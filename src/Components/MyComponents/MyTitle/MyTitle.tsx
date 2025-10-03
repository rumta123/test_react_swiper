// components/Title/Title.tsx

// import styles from "./Title.module.css"; // Подключаем локальные стили
interface TitleProps {
  className?: string;

}
export const MyTitle = ({ className  }: TitleProps) => {
  return (
    <div className={className}>
      Что
      <br />
      умеем
    </div>
  );
};

