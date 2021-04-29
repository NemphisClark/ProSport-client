import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';

import Search from '../Forms/Search';
import Modal from '../Modal/index';

import LogoIcon from '../../images/logo.svg';
import PersonIcon from '../../images/signin.svg';
import BasketIcon from '../../images/basket.svg';

import './custom.scss';

const Header = () => {
  const [modalActive, setModalActive] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const logout = () => {
    firebase.auth().signOut();

    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
  };

  const renderLoggedInLinks = () => {
    return (
      <div>
        <a href="/user/dashboard" className="header-btn__red">
          <img style={{ width: '22px' }} src={PersonIcon} alt="account" />
          Профиль
        </a>

        {/* <a onClick={logout}>logout</a> */}
      </div>
    );
  };

  const renderNoLoggedInLinks = () => {
    return (
      <button className="header-btn__red" onClick={() => setModalActive(true)}>
        <img src={PersonIcon} alt="account" />
        Войти
      </button>
    );
  };

  return (
    <header className="header">
      <div className="header-inner">
        <a href="/" className="header-logo">
          <div className="header-logo__img">
            <img src={LogoIcon} alt="logo" />
          </div>
          <div className="header-logo__title">ProSport</div>
        </a>

        <Search />

        <div className="header-btns">
          {!user && renderNoLoggedInLinks()}
          {user && renderLoggedInLinks()}

          <a href="/basket" className="header-btn__dark">
            <img src={BasketIcon} alt="basket" />
            Корзина
          </a>
        </div>

        <Modal active={modalActive} setActive={setModalActive} />
      </div>
    </header>
  );
};

export default Header;
