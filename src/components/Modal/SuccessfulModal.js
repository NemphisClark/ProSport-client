import React from "react";

import "./index.scss";

const SuccessfulModal = ({ active }) => {
  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="modal__body" style={{ height: "250px" }}>
        <div
          className="modal__content"
          style={{ borderRadius: "5px", padding: "0 40px" }}
        >
          <div className="modal__successful">
            <h2>Ваш заказ оформлен!</h2>
            <span>Вся информация будет в личном кабинете</span>
          </div>

          <a className="modal__successful-link" href="/catalogue">
            Вернуться к покупкам
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulModal;
