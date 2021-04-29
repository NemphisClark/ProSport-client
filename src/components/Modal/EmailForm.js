import React, { useState, useContext } from "react";
import { toast } from "react-toastify";

import { auth } from "../../firebase";
import { FormsContext } from "./FormsContext";

const EmailForm = () => {
  const [email, setEmail] = useState("");

  const { switchToEmailLogin } = useContext(FormsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const backendConfig = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, backendConfig);

    toast(`Ссылка для регистрации отправлена на почту: ${email}`, {
      progressClassName: "Toastify__progress-bar--dark",
      autoClose: 2000,
      draggable: true,
    });

    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  return (
    <form className="modal__form" noValidate onSubmit={handleSubmit}>
      <label>По почте</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="modal__form-redir" onClick={switchToEmailLogin}>
        У меня уже есть аккаунт
      </div>

      <div className="modal__form-btn-wrapper">
        <button
          type="submit"
          className="modal__form-btn"
          onSubmit={() => {
            handleSubmit();
            setEmail("");
          }}
          disabled={email.length < 1}
        >
          Отправить письмо
        </button>
      </div>
    </form>
  );
};

export default EmailForm;
