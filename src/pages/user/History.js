import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getUserOrders } from "../../functions/user";

import ShowPaymentInfo from "../../components/Cards/ShowPaymentInfo";
import ProductCard from "../../components/Cards/ProductCard";
import UserNav from "../../components/Navs/UserNav";

import "./style.scss";

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadUserOrders = () => {
      getUserOrders(user.token).then((res) => {
        setOrders(res.data);
      });
    };

    loadUserOrders();
  }, [user.token]);

  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="profile-container-contains">
        <ShowPaymentInfo order={order} />
      </div>
    ));

  return (
    <div className="profile-container">
      <div className="profile-container__nav">
        <UserNav />
      </div>

      <div className="profile-container-content">
        <div className="profile-container-header">
          {orders.length > 0 ? (
            <div className="profile-container-header__dark">Ваши заказы</div>
          ) : (
            "Заказов ещё не было"
          )}
        </div>

        {orders.length > 0 ? null : (
          <div className="profile-container-empty__msg">
            После первого заказа здесь будет собрана информация о нём: статус
            заказа, дата и адрес доставки, и состав заказа.
          </div>
        )}

        {orders.length > 0 ? (
          <div className="order-wrapper__col">{showEachOrders()}</div>
        ) : (
          <div className="profile-container__orders-empty"></div>
        )}
      </div>
    </div>
  );
};

export default History;
