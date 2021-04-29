import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import firebase from "firebase";

import "./style.scss";

const UserNav = () => {
  let { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();
  let history = useHistory();

  const logout = () => {
    firebase.auth().signOut();

    dispatch({
      type: "LOGOUT",
      payload: null,
    });
  };

  const renderAdminLinks = () => {
    return (
      <li className="user-link">
        <a href="/admin/dashboard">Админ панель</a>
      </li>
    );
  };

  return (
    <nav className="user-nav">
      <ul>
        {user.role === "admin" ? renderAdminLinks() : null}

        <li className="user-link">
          <NavLink to="/user/dashboard">Личные данные</NavLink>
        </li>

        <li className="user-link">
          <NavLink to="/user/orders">Заказы</NavLink>
        </li>

        <li className="user-link">
          <NavLink to="/user/wishlist">Избранные</NavLink>
        </li>

        <li className="user-link" onClick={logout}>
          <a href="/">Выйти</a>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
