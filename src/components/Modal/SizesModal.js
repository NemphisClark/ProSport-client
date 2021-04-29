import React, { useState } from "react";

import CloseIcon from "@material-ui/icons/Close";

import "./index.scss";

const SizesModal = ({ active, setActive }) => {
  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="modal__body" style={{ height: "250px" }}>
        <div className="modal__content">
          <div className="modal__header">
            <div className="modal__header-title">Таблица размеров</div>
            <div
              className="modal__header-close"
              onClick={() => {
                setActive(false);
              }}
            >
              <CloseIcon style={{ fontSize: "20px" }} />
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default SizesModal;
