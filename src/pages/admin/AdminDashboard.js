import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getOrders, changeStatus } from "../../functions/admin";

import Orders from "../../components/Order/Orders";
import AdminNav from "../../components/Navs/AdminNav";

import "./style.scss";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    getOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4))
      setOrders(res.data);
    });
  };

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then(() => {
      toast("Статус доставки изменен!", {
        progressClassName: "Toastify__progress-bar--dark",
        autoClose: 2000,
        draggable: true,
      });
      loadOrders();
    });
  };

  return (
    <div className="admin-container">
      <div className="admin-container__nav">
        <AdminNav />
      </div>

      {orders.length > 0 ? null : <h2>Заказов пока нет!</h2>}

      <div className="profile-container-content" style={{ display: "flex" }}>
        <Orders orders={orders} handleStatusChange={handleStatusChange} />
      </div>
    </div>
  );
};

export default AdminDashboard;
