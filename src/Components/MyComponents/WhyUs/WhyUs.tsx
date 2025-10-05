import React from "react";

interface Advantage {
  id: number;
  title: string;
  description: string;
  icon?: string; // можно добавить URL или использовать emoji
}

const advantages: Advantage[] = [
  {
    id: 1,
    title: "Без посредников",
    description: "Мы работаем напрямую с клиентами, без посредников и скрытых комиссий.",
    icon: "🤝",
  },
  {
    id: 2,
    title: "Доводим до конца",
    description: "Всегда доводим работу до логического завершения и обеспечиваем качество.",
    icon: "✅",
  },
  {
    id: 3,
    title: "Индивидуальный подход",
    description: "Каждый проект уникален, подбираем решения под ваши задачи.",
    icon: "🎯",
  },
];

const WhyUs: React.FC = () => {
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Почему мы?</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 20
      }}>
        {advantages.map(adv => (
          <div key={adv.id} style={{
            border: "1px solid #ccc",
            borderRadius: 10,
            padding: 20,
            textAlign: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            transition: "transform 0.2s",
            cursor: "default"
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div style={{ fontSize: 40, marginBottom: 10 }}>{adv.icon}</div>
            <h3 style={{ margin: "10px 0 5px 0" }}>{adv.title}</h3>
            <p style={{ fontSize: 14, color: "#555" }}>{adv.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
