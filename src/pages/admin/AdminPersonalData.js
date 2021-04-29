import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  getUserAddress,
  getUserApartment,
  getUserHome,
  getCard,
  getEmail,
  getPhone,
  getUserName,
  getUserSurname,
} from "../../functions/user";
import { auth } from "../../firebase";

import AdminNav from "../../components/Navs/AdminNav";
import ProfileIcon from "../../images/profile-logo.svg";

import "./style.scss";

const UserDashboard = () => {
  const [password, setPassword] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userAddressHome, setUserAddressHome] = useState("");
  const [userAddressApartment, setUserAddressApartment] = useState("");
  const [userCards, setUserCards] = useState("");

  let { user } = useSelector((state) => ({ ...state }));

  // Get User Address from Database
  useEffect(() => {
    getEmail(user && user.token).then((res) => {
      setEmail(res.data.cartEmail);
    });
    getUserName(user && user.token)
      .then((res) => {
        setUserName(res.data.userName);
      })
      .catch((err) => console.log(err));
    getUserSurname(user && user.token)
      .then((res) => {
        setUserSurname(res.data.userSurname);
      })
      .catch((err) => console.log(err));
    getUserAddress(user && user.token)
      .then((res) => {
        setUserAddress(res.data.address);
      })
      .catch((err) => console.log(err));
    getUserHome(user && user.token)
      .then((res) => {
        setUserAddressHome(res.data.addressHome);
      })
      .catch((err) => console.log(err));
    getUserApartment(user && user.token)
      .then((res) => {
        setUserAddressApartment(res.data.addressApartment);
      })
      .catch((err) => console.log(err));
    getCard(user && user.token)
      .then((res) => {
        setUserCards(res.data.userCard);
      })
      .catch((err) => console.log(err));
    getPhone(user && user.token).then((res) => {
      setUserPhone(res.data.phoneNumber);
    });
  }, [user && user.address]);

  const personalInfo = () => {
    return (
      <div className="profile-container-info__block-wrapper">
        <div className="profile-container-info__block-title">
          Персональные данные
        </div>

        <div className="profile-container-info__block">
          <div className="profile-container-info__block-info">
            <div className="profile-container-info__block-img">
              <img src={ProfileIcon} alt="Фото профиля" />
            </div>
            <div className="profile-container-info__block-data">
              <span id="profile-fullname">
                {userName} {userSurname}
              </span>
              <span>e-mail: {email}</span>
              <span>Телефон: {userPhone}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const personalAddress = () => {
    return (
      <div className="profile-container-info__block-wrapper">
        <div className="profile-container-info__block-title">
          Сохраненные адреса
        </div>

        <div className="profile-container-info__block">
          <div className="profile-container-info__block-info">
            <div className="profile-container-info__block-data">
              <div id="profile-address">
                {userAddress} {userAddressHome}, {userAddressApartment}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const personalCards = () => {
    return (
      <div className="profile-container-info__block-wrapper">
        <div className="profile-container-info__block-title">
          Сохраненные карты
        </div>

        <div className="profile-container-info__block">
          <div className="profile-container-info__block-info">
            <div id="profile-cards">{userCards}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-container">
      <div className="admin-container__nav">
        <AdminNav />
      </div>

      <div className="profile-container-content">
        <div className="profile-container-content__personal-data">
          {personalInfo()}
          {personalAddress()}
        </div>

        <div className="profile-container-content__personal-data">
          {personalCards()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
