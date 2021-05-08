import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { auth } from "../../firebase";
import { createOrUpdateUser } from "../../authFunctions/auth";

import "./styles.scss";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.location.href);
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (email.length < 1 || password.length < 6) {
      toast.error("Введены некорректные данные!");
      return;
    }

    if (password.length < 6) {
      toast.error("Пароль короче 6 символов!");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegistration");

        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        // redux store
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));

        // redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="modal active">
      <div className="modal__body">
        <div className="modal__content">
          <div className="modal__header">
            <div className="modal__header-title">Вход или регистрация</div>
          </div>

          <form className="modal__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              disabled
            />

            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
            />
            <br />
            <button
              type="submit"
              className="modal__form-btn"
              style={{ width: "200px" }}
            >
              Завершить регистрацию
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
