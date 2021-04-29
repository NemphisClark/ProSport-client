import React, { useState } from "react";

import { FormsContext } from "./FormsContext";
import PhoneForm from "./PhoneForm";
import EmailForm from "./EmailForm";
import EmailLoginForm from "./EmailLoginForm";

import CloseIcon from "@material-ui/icons/Close";

import "./index.scss";

const Modal = ({ active, setActive }) => {
  const [activeForm, setActiveForm] = useState("phoneForm");

  const switchToEmail = () => {
    setActiveForm("emailForm");
  };

  const switchToEmailLogin = () => {
    setActiveForm("EmailLoginForm");
  };

  const contextValue = { switchToEmail, switchToEmailLogin };

  return (
    <FormsContext.Provider value={contextValue}>
      <div className={active ? "modal active" : "modal"}>
        <div className="modal__body">
          <div className="modal__content">
            <div className="modal__header">
              <div className="modal__header-title">Вход или регистрация</div>
              <div
                className="modal__header-close"
                onClick={() => {
                  setActive(false);
                  setActiveForm("phoneForm");
                }}
              >
                <CloseIcon style={{ fontSize: "20px" }} />
              </div>
            </div>
            {activeForm === "phoneForm" && <PhoneForm />}
            {activeForm === "emailForm" && <EmailForm />}
            {activeForm === "EmailLoginForm" && <EmailLoginForm />}
          </div>
        </div>
      </div>
    </FormsContext.Provider>
  );
};

export default Modal;
