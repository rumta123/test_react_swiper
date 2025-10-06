import React from "react";

interface Work {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const works: Work[] = [
  { id: 1, title: "Сайт компании", description: "Дизайн и верстка сайта компании.", imageUrl: "https://via.placeholder.com/300x200?text=Сайт+1" },
  { id: 2, title: "Мобильное приложение", description: "Разработка мобильного приложения для iOS и Android.", imageUrl: "https://via.placeholder.com/300x200?text=Приложение+1" },
  { id: 3, title: "Нейросетевой парсер", description: "Сбор и анализ данных с использованием нейросети.", imageUrl: "https://via.placeholder.com/300x200?text=Нейросеть" },
  { id: 4, title: "CRM-система", description: "Создание и настройка CRM для бизнеса.", imageUrl: "https://via.placeholder.com/300x200?text=CRM" },
];

const PortfolioPreview: React.FC = () => {
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Примеры работ</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 20
      }}>
        {works.map(work => (
          <div key={work.id} style={{
            border: "1px solid #ccc",
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            cursor: "pointer",
            transition: "transform 0.2s"
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src={work.imageUrl} alt={work.title} style={{ width: "100%", height: 150, objectFit: "cover" }} />
            <div style={{ padding: 10 }}>
              <h3 style={{ margin: 0, fontSize: 16 }}>{work.title}</h3>
              <p style={{ margin: "5px 0 0 0", fontSize: 14 }}>{work.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <a
          href="/portfolio/" // ссылка на отдельную страницу портфолио
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Смотреть всё
        </a>
      </div>
    </div>
  );
};

export default PortfolioPreview;
