import React from "react";

interface Testimonial {
  id: number;
  name: string;
  role?: string;
  avatarUrl?: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Иван Петров",
    role: "CEO компании X",
    avatarUrl: "https://via.placeholder.com/60",
    text: "Отличная работа! Сайт сделали быстро и качественно, все пожелания учли.",
  },
  {
    id: 2,
    name: "Мария Сидорова",
    role: "Маркетолог",
    avatarUrl: "https://via.placeholder.com/60",
    text: "Очень довольны CRM-системой, теперь все процессы автоматизированы.",
  },
  {
    id: 3,
    name: "Алексей Иванов",
    role: "Основатель стартапа",
    avatarUrl: "https://via.placeholder.com/60",
    text: "Разработка мобильного приложения превзошла ожидания, рекомендую!",
  },
];

const Testimonials: React.FC = () => {
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Отзывы клиентов</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 20
      }}>
        {testimonials.map(t => (
          <div key={t.id} style={{
            border: "1px solid #ccc",
            borderRadius: 10,
            padding: 15,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
              {t.avatarUrl && (
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  style={{ width: 50, height: 50, borderRadius: "50%", marginRight: 10 }}
                />
              )}
              <div>
                <p style={{ margin: 0, fontWeight: "bold" }}>{t.name}</p>
                {t.role && <p style={{ margin: 0, fontSize: 12, color: "#666" }}>{t.role}</p>}
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.5 }}>{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
