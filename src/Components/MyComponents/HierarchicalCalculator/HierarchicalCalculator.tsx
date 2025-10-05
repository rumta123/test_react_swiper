import React, { useState, type ChangeEvent, type FormEvent } from "react";

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
  subCategories?: SubCategory[]; // если подкатегории есть
  services?: Service[]; // если услуги прямо под категорией
}

// Структура категорий с подкатегориями
const categories: Category[] = [
  {
    name: "Сайты",
    services: [
      { id: 1, name: "Дизайн сайта", price: 500 },
      { id: 2, name: "Редизайн", price: 300 },
      { id: 3, name: "Адаптивная верстка", price: 400 },
      { id: 4, name: "SEO-оптимизация", price: 150 },
    ],
  },
  {
    name: "Парсеры, нейросети, приложения",
    subCategories: [
      {
        name: "Боты",
        services: [
          { id: 5, name: "Разработка чат-бота", price: 600 },
          { id: 6, name: "Интеграция с мессенджерами", price: 300 },
        ],
      },
      {
        name: "CRM-системы",
        services: [
          { id: 7, name: "Разработка CRM", price: 1000 },
          { id: 8, name: "Настройка и интеграции", price: 500 },
        ],
      },
      {
        name: "Нейросети",
        services: [
          { id: 9, name: "Нейросетевой парсер", price: 700 },
          { id: 10, name: "AI-анализ данных", price: 800 },
        ],
      },
      {
        name: "Приложения",
        services: [
          { id: 11, name: "Мобильное приложение", price: 900 },
          { id: 12, name: "Web-приложение", price: 850 },
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
  email: string;
  message: string;
}

const HierarchicalCalculator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");

  const currentCategory = categories.find(c => c.name === selectedCategory);

  const currentServices = selectedSubCategory
    ? currentCategory?.subCategories?.find(sc => sc.name === selectedSubCategory)?.services || []
    : currentCategory?.services || [];

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory(""); // сброс подкатегории
    setSelectedServices([]); // сброс услуг
  };

  const handleSubCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubCategory(e.target.value);
    setSelectedServices([]); // сброс услуг
  };

  const handleServiceChange = (serviceId: number) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = (): number => {
    return currentServices
      .filter(s => selectedServices.includes(s.id))
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
        .filter(s => selectedServices.includes(s.id))
        .map(s => s.name),
      totalPrice: calculateTotal(),
      name,
      email,
      message,
    };

    try {
      const response = await fetch("https://your-backend.com/api/send-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess("Заявка успешно отправлена!");
        setName("");
        setEmail("");
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
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Калькулятор услуг</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Категория проекта:
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              required
              style={{ width: "100%", margin: "10px 0" }}
            >
              <option value="" disabled>Выберите категорию</option>
              {categories.map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </label>
        </div>

        {currentCategory?.subCategories && currentCategory.subCategories.length > 0 && (
          <div>
            <label>
              Подкатегория:
              <select
                value={selectedSubCategory}
                onChange={handleSubCategoryChange}
                required
                style={{ width: "100%", margin: "10px 0" }}
              >
                <option value="" disabled>Выберите подкатегорию</option>
                {currentCategory.subCategories.map(sc => (
                  <option key={sc.name} value={sc.name}>{sc.name}</option>
                ))}
              </select>
            </label>
          </div>
        )}

        {currentServices.length > 0 && (
          <div>
            <h3>Выберите услуги:</h3>
            {currentServices.map(service => (
              <div key={service.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.id)}
                    onChange={() => handleServiceChange(service.id)}
                  />
                  {service.name} — ${service.price}
                </label>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 20 }}>
          <h3>Ваши данные:</h3>
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 10 }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 10 }}
          />
          <textarea
            placeholder="Сообщение"
            value={message}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
            style={{ width: "100%", marginBottom: 10 }}
          />
        </div>

        <h3>Общая стоимость: ${calculateTotal()}</h3>
        <button type="submit" disabled={loading}>
          {loading ? "Отправка..." : "Отправить заявку"}
        </button>
        {success && <p style={{ marginTop: 10 }}>{success}</p>}
      </form>
    </div>
  );
};

export default HierarchicalCalculator;
