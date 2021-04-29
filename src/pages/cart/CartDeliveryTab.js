import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  saveUserAddress,
  saveUserAddressHome,
  saveUserAddressApartment,
  saveEmail,
  savePhone,
} from "../../functions/user";

import "./cart.scss";

const CartDeliveryTab = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [address, setAddress] = useState("");
  const [addressHome, setAddressHome] = useState("");
  const [addressApartment, setAddressApartment] = useState("");
  const [email, setEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const saveAddressToDB = (e) => {
    e.preventDefault();

    saveUserAddress(user.token, address).then((res) => {
      saveUserAddressHome(user.token, addressHome).then((res) => {
        if (res.data.ok) {
          setAddressSaved(true);
        }
      });

      saveUserAddressApartment(user.token, addressApartment).then((res) => {
        if (res.data.ok) {
          setAddressSaved(true);
        }
      });

      if (res.data.ok) {
        setAddressSaved(true);

        toast("Данные сохранены!", {
          progressClassName: "Toastify__progress-bar--dark",
          autoClose: 2000,
          draggable: true,
        });
      }
    });

    saveEmail(user.token, email).then((res) => {
      console.log(res);
    });

    savePhone(user.token, userPhone).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="container">
      <div className="block-tabs">
        <button className="p-tabs">Доставка курьером</button>
      </div>

      <div className="content-tabs">
        <div className="content  active-content">
          <div className="content-tabs__info">
            <form onSubmit={saveAddressToDB}>
              <div>
                <span className="content-tabs__info-label">Улица:</span>
                <input
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  className="content-tabs__info-input"
                  type="text"
                  placeholder="Введите улицу"
                  style={{ marginRight: "40px" }}
                />

                <span className="content-tabs__info-label">Дом:</span>
                <input
                  value={addressHome}
                  onChange={(e) => {
                    setAddressHome(e.target.value);
                  }}
                  className="content-tabs__info-input"
                  type="text"
                  placeholder="1"
                  style={{ marginRight: "40px", width: "40px" }}
                />

                <span className="content-tabs__info-label">Квартира:</span>
                <input
                  value={addressApartment}
                  onChange={(e) => {
                    setAddressApartment(e.target.value);
                  }}
                  className="content-tabs__info-input"
                  type="text"
                  placeholder="10"
                  style={{ marginRight: "10px", width: "40px" }}
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
                  value={userPhone}
                  onChange={(e) => {
                    setUserPhone(e.target.value);
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
                disabled={
                  address.length < 1 &&
                  addressHome.length < 1 &&
                  addressApartment < 1
                }
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

export default CartDeliveryTab;
