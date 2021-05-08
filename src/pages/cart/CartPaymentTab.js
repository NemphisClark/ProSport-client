import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { saveCard, getCard } from "../../functions/user";

import "./cart.scss";

const CartPaymentTab = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [toggleState, setToggleState] = useState(1);
  const [userCard, setUserCard] = useState("");
  const [userCards, setUserCards] = useState("");

  // Get User Address from Database
  useEffect(() => {
    getCard(user && user.token)
      .then((res) => {
        setUserCards(res.data.userCard);
      })
      .catch((err) => console.log(err));
  }, [user && user.address]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const saveCardToDB = (e) => {
    e.preventDefault();

    saveCard(user.token, userCard).then((res) => {
      console.log("Submited");
      if (res.data.ok) {
        toast("Карта сохранена!", {
          progressClassName: "Toastify__progress-bar--dark",
          autoClose: 2000,
          draggable: true,
        });
      }
    });
  };

  return (
    <div className="container">
      <div className="block-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Онлайн оплата
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          При получении
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <div className="content-tabs__info">
            <form onSubmit={saveCardToDB}>
              <div className="content-tabs__info-choose">Выберите карту</div>
              <input
                className="red-input"
                type="text"
                placeholder="Введите номер карты"
                value={userCard}
                onChange={(e) => {
                  setUserCard(e.target.value);
                }}
              />
              <p>
                <input type="radio" id="test1" name="radio-group" checked />
                <label for="test1">
                  {userCards ? userCards : "Карта не добавлена"}
                </label>
              </p>
              <button
                style={{ marginTop: "60px" }}
                type="submit"
                className="btn-dark"
                disabled={userCard.length < 5}
              >
                Сохранить
              </button>
            </form>
          </div>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>При получении</h2>

          <p style={{ color: "#9A6464" }}>
            После проверки товара вы оплатите наличными или картой выбранные
            вами товары
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPaymentTab;
