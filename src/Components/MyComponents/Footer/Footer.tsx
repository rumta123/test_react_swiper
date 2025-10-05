import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: "#f5f5f5",
      padding: "20px 0",
      borderTop: "1px solid #ddd",
      marginTop: 40
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
        {/* Контактная информация */}
        <p style={{ margin: 5 }}>© 2025 Ваша компания</p>
        <p style={{ margin: 5 }}>
          Телефон: <a href="tel:+71234567890">+7 (123) 456-78-90</a> | Email: <a href="mailto:info@company.ru">info@company.ru</a>
        </p>
        <p style={{ margin: 5 }}>
          <a href="/privacy">Политика конфиденциальности</a> | <a href="/terms">Пользовательское соглашение</a>
        </p>

        {/* Социальные сети */}
        <div style={{ marginTop: 10 }}>
          <a href="https://vk.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 5px" }}>VK</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 5px" }}>Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 5px" }}>Instagram</a>
        </div>

        {/* Примечание про Яндекс.Директ */}
        <p style={{ marginTop: 15, fontSize: 12, color: "#888" }}>
          Реклама от <a href="https://direct.yandex.ru" target="_blank" rel="noopener noreferrer">Яндекс.Директ</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
