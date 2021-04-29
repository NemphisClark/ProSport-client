import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  saveEmail,
  savePhone,
  saveUserName,
  saveUserSurname,
} from "../../functions/user";

import "./cart.scss";

const CartDataTab = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const saveFullnameToDB = (e) => {
    e.preventDefault();

    saveUserName(user.token, userName).then((res) => {
      if (res.data.ok) {
        toast("Данные сохранены!", {
          progressClassName: "Toastify__progress-bar--dark",
          autoClose: 2000,
          draggable: true,
        });
      }
    });

    saveUserSurname(user.token, userSurname).then((res) => {
      console.log(res);
    });

    savePhone(user.token, phoneNumber).then((res) => {
      console.log(res);
    });

    saveEmail(user.token, email).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="container">
      <div className="block-tabs">
        <button className="p-tabs">
          Это необходимо для доставки вам или получателю вашего товара. Мы не
          распространяем информацию третьим лицам и не расслылаем спам.
        </button>
      </div>

      <div className="content-tabs">
        <div className="content  active-content">
          <div className="content-tabs__info">
            <form onSubmit={saveFullnameToDB}>
              <div>
                <span className="content-tabs__info-label">Имя: </span>
                <input
                  className="content-tabs__info-input"
                  type="text"
                  placeholder="Введите ваше имя"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>
              <div>
                <span className="content-tabs__info-label">Фамилия: </span>
                <input
                  className="content-tabs__info-input"
                  type="text"
                  placeholder="Введите фамилию"
                  value={userSurname}
                  onChange={(e) => {
                    setUserSurname(e.target.value);
                  }}
                />
              </div>
              <div>
                <span className="content-tabs__info-label">
                  Контактный телефон:{" "}
                </span>
                <input
                  className="content-tabs__info-input"
                  type="tel"
                  placeholder="79923503535"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </div>
              <div>
                <span className="content-tabs__info-label">Почта: </span>
                <input
                  className="content-tabs__info-input"
                  type="email"
                  placeholder="Введите свой e-mail"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <button
                style={{ marginTop: "60px" }}
                type="submit"
                className="btn-dark"
                disabled={userName < 1 && userSurname < 1}
              >
                Сохранить
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDataTab;
