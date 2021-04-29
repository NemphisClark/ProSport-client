import React from "react";

import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-block-wrapper">
        <div className="footer-block">
          <div>
            Email:{" "}
            <a href="mailto:Saenkovanna@gmail.com">Saenkovanna@gmail.com</a>
          </div>

          <div>
            Контактный телефон: <a href="tel:89277399967">8(927)73-99-967</a>
          </div>
        </div>
        <div className="footer-block">
          <div>Адреса физических магазинов</div>

          <div>-ул. Мичурина д3</div>
          <div>-ул. Магнитогорская д5</div>
        </div>
        <div className="footer-block">
          <div>Время работы</div>

          <div className="footer-block__time">
            <div>Пн-Пт: 08:00-16:00</div>
            <div>Сб-Вс: 10:00-15:00</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
