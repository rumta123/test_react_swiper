import React, { useState, type FormEvent } from "react";

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
      { id: 17, name: "разработка с 0", price: 30000 },
      { id: 18, name: "Доработка", price: 2500 },
      { id: 19, name: "Консультация", price: 0 },
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
  fieldErrors?: Record<string, string>;
}

const StyledCalculator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [name, setName] = useState("");
  const [contactMethod, setContactMethod] = useState("email");
  const [contactValue, setContactValue] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    contactValue?: string;
    category?: string;
    services?: string;
  }>({});

  const currentCategory = categories.find((c) => c.name === selectedCategory);

  const currentServices =
    selectedSubCategory
      ? currentCategory?.subCategories?.find((sc) => sc.name === selectedSubCategory)?.services || []
      : currentCategory?.services || [];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory("");
    setSelectedServices([]);
    setFieldErrors((prev) => ({ ...prev, category: undefined, services: undefined }));
  };

  const handleSubCategoryChange = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setSelectedServices([]);
    setFieldErrors((prev) => ({ ...prev, services: undefined }));
  };

  const handleServiceChange = (serviceId: number) => {
    setSelectedServices((prev) => {
      const next = prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId];
      return next;
    });
    setFieldErrors((prev) => ({ ...prev, services: undefined }));
  };

  const calculateTotal = (): number => {
    return currentServices
      .filter((s) => selectedServices.includes(s.id))
      .reduce((sum, s) => sum + s.price, 0);
  };

  // возвращает пустую строку, если всё ок, иначе текст ошибки
  const getContactError = (method: string, value: string): string => {
    const v = value.trim();
    if (!v) return "Поле контакта не заполнено";

    switch (method) {
      case "email":
        return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(v) ? "" : "Введите корректный email";
      case "phone":
      case "whatsapp": {
        const cleaned = v.replace(/[^\d+]/g, ""); // убираем всё, кроме цифр и плюса
        let normalized = cleaned;

        if (/^\d{10}$/.test(cleaned)) {
          // номер вроде 9206403828 => добавляем +7
          normalized = "+7" + cleaned;
        } else if (cleaned.startsWith("8")) {
          normalized = "+7" + cleaned.slice(1);
        }

        return /^\+?\d{11,15}$/.test(normalized)
          ? ""
          : "Введите корректный номер телефона (например, 89206403828, +79206403828 или 9206403828)";
      }
      case "telegram":
        return (/^@?[A-Za-z0-9_]{5,}$/.test(v) || /^https:\/\/t\.me\/[A-Za-z0-9_]+$/.test(v)) ? "" : "Введите @username или ссылку https://t.me/username";
      case "vk":
        return /^https:\/\/vk\.com\/[A-Za-z0-9_]+$/.test(v) ? "" : "Введите ссылку вида https://vk.com/username";
      default:
        return "Неверный способ связи";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const errs: typeof fieldErrors = {};

    if (!selectedCategory) {
      errs.category = "Выберите категорию";
    }

    if (selectedServices.length === 0) {
      errs.services = "Выберите хотя бы одну услугу";
    }

    if (!name.trim()) {
      errs.name = "Введите имя";
    }

    const contactErr = getContactError(contactMethod, contactValue);
    if (contactErr) {
      errs.contactValue = contactErr;
    }

    setFieldErrors(errs);

    if (Object.keys(errs).length > 0) {
      setError("Проверьте правильность заполнения полей.");
      return;
    }

    const payload: Payload = {
      category: selectedCategory,
      subCategory: selectedSubCategory || undefined,
      services: currentServices
        .filter((s) => selectedServices.includes(s.id))
        .map((s) => s.name),
      totalPrice: calculateTotal(),
      name: name.trim(),
      contactMethod,
      contactValue: contactValue.trim(),
      message: message.trim(),
    };

    setLoading(true);
    try {
      const response = await fetch("https://parser24.ru/send.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        if (typeof window !== "undefined" && window.ym) {
          window.ym(104386783, "reachGoal", "send_form");
        }
        setSuccess("✅ Заявка успешно отправлена!");
        setName("");
        setContactValue("");
        setMessage("");
        setSelectedCategory("");
        setSelectedSubCategory("");
        setSelectedServices([]);
        setFieldErrors({});
      } else {
        setError("Ошибка при отправке заявки. Попробуйте позже.");
      }
    } catch (err) {
      console.error(err);
      setError("Ошибка при отправке заявки. Попробуйте позже.");
    }
    setLoading(false);
  };
  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setError("");
  //   setSuccess("");

  //   // Проверяем корректность
  //   const fieldErrors: Record<string, string> = {};

  //   if (!selectedCategory) fieldErrors.category = "Выберите категорию";
  //   if (selectedServices.length === 0) fieldErrors.services = "Выберите хотя бы одну услугу";
  //   if (!name.trim()) fieldErrors.name = "Введите имя";
  //   if (!validateContact(contactMethod, contactValue))
  //     fieldErrors.contactValue = "Введите корректные контактные данные";

  //   // Подсвечивание
  //   setError(Object.values(fieldErrors).join(", "));

  //   // Формируем полезную нагрузку для сервера
  //   const payload: Payload = {
  //     category: selectedCategory,
  //     subCategory: selectedSubCategory || undefined,
  //     services: currentServices
  //       .filter((s) => selectedServices.includes(s.id))
  //       .map((s) => s.name),
  //     totalPrice: calculateTotal(),
  //     name: name.trim(),
  //     contactMethod,
  //     contactValue: contactValue.trim(),
  //     message: message.trim(),
  //     fieldErrors, // можно отправить ошибки для аналитики
  //   };

  //   setLoading(true);
  //   try {
  //     const response = await fetch("https://parser24.ru/send.php", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });

  //     if (response.ok) {
  //       const isValid = Object.keys(fieldErrors).length === 0;
  //       if (isValid && typeof window !== "undefined" && window.ym) {
  //         // Отправляем только корректные заявки
  //         window.ym(104386783, "reachGoal", "send_form");
  //       }

  //       setSuccess(
  //         isValid
  //           ? "✅ Заявка успешно отправлена!"
  //           : "⚠️ Данные отправлены, но есть ошибки в форме."
  //       );
  //       if (isValid) {
  //         setName("");
  //         setContactValue("");
  //         setMessage("");
  //         setSelectedCategory("");
  //         setSelectedSubCategory("");
  //         setSelectedServices([]);
  //       }
  //     } else {
  //       setError("Ошибка при отправке заявки. Попробуйте позже.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setError("Ошибка при отправке заявки. Попробуйте позже.");
  //   }
  //   setLoading(false);
  // };

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
          marginBottom: 8,
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
              backgroundColor: selectedCategory === cat.name ? "#007BFF" : "#EEE",
              color: selectedCategory === cat.name ? "#FFF" : "#333",
              border: "none",
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>
      {fieldErrors.category && <div style={{ color: "red", textAlign: "center", marginBottom: 8 }}>{fieldErrors.category}</div>}

      {/* Подкатегории */}
      {currentCategory?.subCategories && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            marginBottom: 16,
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
                backgroundColor: selectedSubCategory === sub.name ? "#28A745" : "#DDD",
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
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 8,
            }}
          >
            {currentServices.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceChange(service.id)}
                style={{
                  padding: 10,
                  border: `1px solid ${selectedServices.includes(service.id) ? "#007BFF" : "#999"}`,
                  borderRadius: 8,
                  cursor: "pointer",
                  backgroundColor: selectedServices.includes(service.id) ? "#D0E7FF" : "#FFF",
                }}
              >
                <p style={{ margin: 0, fontWeight: "bold" }}>{service.name}</p>
                <p style={{ margin: 0 }}>{service.price} руб.</p>
              </div>
            ))}
          </div>
          {fieldErrors.services && <div style={{ color: "red", textAlign: "center", marginBottom: 8 }}>{fieldErrors.services}</div>}
        </>
      )}

      {/* Форма */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setFieldErrors((prev) => ({ ...prev, name: undefined }));
          }}
          required
          style={{
            padding: 8,
            borderRadius: 6,
            border: `1px solid ${fieldErrors.name ? "red" : "#999"}`,
          }}
        />
        {fieldErrors.name && <div style={{ color: "red", fontSize: 12 }}>{fieldErrors.name}</div>}

        <select
          value={contactMethod}
          onChange={(e) => {
            setContactMethod(e.target.value);
            setContactValue("");
            setFieldErrors((prev) => ({ ...prev, contactValue: undefined }));
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
                ? "Введите номер телефона (+79991234567)"
                : contactMethod === "whatsapp"
                  ? "Введите номер WhatsApp"
                  : contactMethod === "telegram"
                    ? "Введите @username или ссылку"
                    : "Введите ссылку на VK"
          }
          value={contactValue}
          onChange={(e) => {
            setContactValue(e.target.value);
            setFieldErrors((prev) => ({ ...prev, contactValue: undefined }));
          }}
          required
          style={{
            padding: 8,
            borderRadius: 6,
            border: `1px solid ${fieldErrors.contactValue ? "red" : "#999"}`,
          }}
        />
        {fieldErrors.contactValue && <div style={{ color: "red", fontSize: 12 }}>{fieldErrors.contactValue}</div>}

        <textarea
          placeholder="Сообщение"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

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
      </form>
    </div>
  );
};

export default StyledCalculator;
