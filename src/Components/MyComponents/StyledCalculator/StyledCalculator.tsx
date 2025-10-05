import React, { useState, type ChangeEvent, type FormEvent } from "react";

// ✅ Типизация Yandex Metrika
declare global {
  interface Window {
    ym?: (id: number, event: string, goal: string) => void;
  }
}

interface Service {
  id: number;
  name: string;
  price: number;
}

interface SubCategory {
  name: string;
  services: Service[];
}

interface Category {
  name: string;
  subCategories?: SubCategory[];
  services?: Service[];
}

const categories: Category[] = [
  {
    name: "Сайты",
    services: [
      { id: 1, name: "Дизайн сайта", price: 20000 },
      { id: 2, name: "Редизайн", price: 15000 },
      { id: 3, name: "Адаптивная верстка", price: 25000 },
      { id: 4, name: "SEO-оптимизация", price: 15000 },
    ],
  },
  {
    name: "Парсеры, нейросети, приложения",
    subCategories: [
      {
        name: "Боты",
        services: [
          { id: 5, name: "Разработка чат-бота", price: 20000 },
          { id: 6, name: "Интеграция с мессенджерами", price: 15000 },
        ],
      },
      {
        name: "CRM-системы",
        services: [
          { id: 7, name: "Разработка CRM", price: 100000 },
          { id: 8, name: "Настройка и интеграции", price: 50000 },
        ],
      },
      {
        name: "Нейросети",
        services: [
          { id: 9, name: "Нейросетевой парсер", price: 70000 },
          { id: 10, name: "AI-анализ данных", price: 80000 },
        ],
      },
      {
        name: "Приложения",
        services: [
          { id: 11, name: "Мобильное приложение android", price: 70000 },
          { id: 15, name: "Мобильное приложение ios", price: 100000 },
          { id: 12, name: "Web-приложение", price: 70000 },
          { id: 16, name: "Телеграм приложение", price: 20000 },
        ],
      },
      {
        name: "Парсеры",
        services: [
          { id: 13, name: "Обычный парсер", price: 15000 },
          { id: 14, name: "Сложный парсер", price: 30000 },
        ],
      },
    ],
  },
];

interface Payload {
  category: string;
  subCategory?: string;
  services: string[];
  totalPrice: number;
  name: string;
  contactMethod: string;
  contactValue: string;
  message: string;
}

const StyledCalculator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [name, setName] = useState<string>("");
  const [contactMethod, setContactMethod] = useState<string>("email");
  const [contactValue, setContactValue] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");

  const currentCategory = categories.find((c) => c.name === selectedCategory);

  const currentServices = selectedSubCategory
    ? currentCategory?.subCategories?.find(
        (sc) => sc.name === selectedSubCategory
      )?.services || []
    : currentCategory?.services || [];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory("");
    setSelectedServices([]);
  };

  const handleSubCategoryChange = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setSelectedServices([]);
  };

  const handleServiceChange = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = (): number => {
    return currentServices
      .filter((s) => selectedServices.includes(s.id))
      .reduce((sum, s) => sum + s.price, 0);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    const payload: Payload = {
      category: selectedCategory,
      subCategory: selectedSubCategory || undefined,
      services: currentServices
        .filter((s) => selectedServices.includes(s.id))
        .map((s) => s.name),
      totalPrice: calculateTotal(),
      name,
      contactMethod,
      contactValue,
      message,
    };

    try {
      const response = await fetch("https://your-backend.com/api/send-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // 🔹 Событие Яндекс.Метрики без any
        if (typeof window !== "undefined" && window.ym) {
          window.ym(104386783, "reachGoal", "send_form");
        }

        setSuccess("Заявка успешно отправлена!");
        setName("");
        setContactValue("");
        setMessage("");
        setSelectedCategory("");
        setSelectedSubCategory("");
        setSelectedServices([]);
      } else {
        setSuccess("Ошибка при отправке заявки. Попробуйте позже.");
      }
    } catch (err) {
      console.error(err);
      setSuccess("Ошибка при отправке заявки. Попробуйте позже.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "20px auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 10,
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        Калькулятор услуг
      </h2>

      {/* Категории */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => handleCategoryChange(cat.name)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              fontWeight: "bold",
              cursor: "pointer",
              backgroundColor:
                selectedCategory === cat.name ? "#007BFF" : "#EEE",
              color: selectedCategory === cat.name ? "#FFF" : "#333",
              border: "none",
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Подкатегории */}
      {currentCategory?.subCategories && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          {currentCategory.subCategories.map((sub) => (
            <button
              key={sub.name}
              onClick={() => handleSubCategoryChange(sub.name)}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                cursor: "pointer",
                backgroundColor:
                  selectedSubCategory === sub.name ? "#28A745" : "#DDD",
                color: selectedSubCategory === sub.name ? "#FFF" : "#333",
                border: "none",
              }}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

      {/* Услуги */}
      {currentServices.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {currentServices.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceChange(service.id)}
              style={{
                padding: 10,
                border: "1px solid #999",
                borderRadius: 8,
                cursor: "pointer",
                backgroundColor: selectedServices.includes(service.id)
                  ? "#D0E7FF"
                  : "#FFF",
              }}
            >
              <p style={{ margin: 0, fontWeight: "bold" }}>{service.name}</p>
              <p style={{ margin: 0 }}> {service.price} руб.</p>
            </div>
          ))}
        </div>
      )}

      {/* Форма */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          required
          style={{ padding: 8, borderRadius: 6, border: "1px solid #999" }}
        />

        {/* Выбор способа связи */}
        <select
          value={contactMethod}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setContactMethod(e.target.value);
            setContactValue("");
          }}
          style={{ padding: 8, borderRadius: 6, border: "1px solid #999" }}
        >
          <option value="email">Email</option>
          <option value="phone">Телефон</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="telegram">Telegram</option>
          <option value="vk">ВКонтакте</option>
        </select>

        <input
          type={contactMethod === "email" ? "email" : "text"}
          placeholder={
            contactMethod === "email"
              ? "Введите email"
              : contactMethod === "phone"
              ? "Введите номер телефона"
              : contactMethod === "whatsapp"
              ? "Введите номер WhatsApp"
              : contactMethod === "telegram"
              ? "Введите @username или ссылку на Telegram"
              : "Введите ссылку на VK"
          }
          value={contactValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setContactValue(e.target.value)
          }
          required
          style={{ padding: 8, borderRadius: 6, border: "1px solid #999" }}
        />
        <textarea
          placeholder="Сообщение"
          value={message}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
          style={{
            padding: 8,
            borderRadius: 6,
            border: "1px solid #999",
            resize: "vertical",
          }}
        />

        <div style={{ fontWeight: "bold", marginTop: 10 }}>
          Общая стоимость:{" "}
          <span style={{ color: "#007BFF" }}>
            примерно {calculateTotal()} руб.
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: "#007BFF",
            color: "#FFF",
            fontWeight: "bold",
            cursor: "pointer",
            border: "none",
            marginTop: 10,
          }}
        >
          {loading ? "Отправка..." : "Отправить заявку"}
        </button>

        {success && (
          <p style={{ color: "green", textAlign: "center", marginTop: 10 }}>
            {success}
          </p>
        )}
      </form>
    </div>
  );
};

export default StyledCalculator;
