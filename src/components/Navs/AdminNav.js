import React from "react";
import { NavLink } from "react-router-dom";

import "./style.scss";

const AdminNav = () => (
  <nav className="admin-nav">
    <ul>
      <li className="user-link">
        <NavLink to="/admin/dashboard">Заказы</NavLink>
      </li>

      <li className="user-link">
        <NavLink to="/admin/products">Все товары</NavLink>
      </li>

      <li className="user-link">
        <NavLink to="/admin/product">Добавить товар</NavLink>
      </li>

      <li className="user-link">
        <NavLink to="/admin/category">Категории</NavLink>
      </li>

      <li className="user-link">
        <NavLink to="/admin/parent-sub">Подкатегории (родитель)</NavLink>
      </li>

      <li className="user-link">
        <NavLink to="/admin/sub">Подкатегории (дочерняя)</NavLink>
      </li>

      <li className="user-link">
        <NavLink to="/admin/personal-data">Личные данные</NavLink>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
