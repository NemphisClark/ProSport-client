import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  createOrder,
  getUserName,
  getUserSurname,
  emptyUserCart,
  getUserAddress,
  getUserApartment,
  getUserHome,
  getCard,
} from "../../functions/user";

import SuccessfulModal from "../../components/Modal/SuccessfulModal";

const CartSteps = () => {
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));
  const [modalActive, setModalActive] = useState(false);

  const [userAddress, setUserAddress] = useState("");
  const [userAddressHome, setUserAddressHome] = useState("");
  const [userAddressApartment, setUserAddressApartment] = useState("");
  const [card, setCard] = useState("");
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");

  // Get User Address from Database
  useEffect(() => {
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
        setCard(res.data.userCard);
      })
      .catch((err) => console.log(err));
  }, [user && user.address]);

  // Calculate total amount
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const getTotalDelivery = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const paymentIntent = {
      amount: getTotalDelivery(),
      name: userName,
      surname: userSurname,
      address: userAddress,
      addressHome: userAddressHome,
      addressApartment: userAddressApartment,
    };

    if (paymentIntent.error) {
      setError(`Payment failed ${paymentIntent.error.message}`);
      setProcessing(false);
    } else {
      // here you get result after successful payment
      // create order and save in database for admin to process

      setTimeout(() => {
        createOrder(user.token, paymentIntent)
          .then((res) => {
            if (res.data.ok) {
              // empty cart from local storage
              if (typeof window !== "undefined")
                localStorage.removeItem("cart");
              // empty cart from redux
              dispatch({
                type: "ADD_TO_CART",
                payload: [],
              });
              // empty cart from database
              emptyUserCart(user.token);
            }
          })
          .catch((err) => console.log("ORDER ERROR -> ", err));
      }, 5000);

      // empty user cart from redux store and local storage
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setModalActive(!modalActive);
    }
  };

  return (
    <div className="basket-content__right">
      <h3 className="basket-content__right-title">???????????????? ??????????</h3>
      <div className="basket-content__right-step">
        <span className="basket-content__right-step__number">?????? 1</span>
        <div>
          <span>????????????????: </span>
          <span className="underline-red">???????????????? ????????????????</span>
        </div>
        <div className="basket-content__right-step__delivery">
          <div>?????????????????? 10.00 - 20.00</div>
          <div>
            {userAddress ? (
              <div>
                {userAddress} {userAddressHome}, {userAddressApartment}
              </div>
            ) : (
              <div>?????????????? ?????????? ?? ???????????????? ????????????????</div>
            )}
          </div>
        </div>
      </div>
      <div className="basket-content__right-step">
        <span className="basket-content__right-step__number">?????? 2</span>
        <div>
          <span>????????????: </span>
          <span className="underline-red">????????????</span>
        </div>
        <div className="basket-content__right-step__info">
          <div>{card}</div>
        </div>
      </div>
      <div className="basket-content__right-step">
        <span className="basket-content__right-step__number">?????? 3</span>
        <div>
          <span>????????: </span>
          <span className="underline-red">
            {userName} {userSurname}
          </span>
        </div>
      </div>
      <div className="basket-content__right-amount">
        ?????????? ??????????????, {cart.length}????: {getTotal()} ????????????
      </div>
      <div className="basket-content__right-amount">
        ?????????????????? ????????????????: 500 ????????????
      </div>
      <div className="basket-content__right-total">
        ??????????: {getTotalDelivery()} ????????????
      </div>

      {user ? (
        <button
          onClick={handleSubmit}
          style={{ margin: "20px auto 0 auto" }}
          className="btn-dark"
        >
          ????????????????
        </button>
      ) : (
        <button className="btn-dark" style={{ margin: "20px auto 0 auto" }}>
          ?????????????? ?????? ????????????
        </button>
      )}

      <SuccessfulModal active={modalActive} setActive={setModalActive} />
    </div>
  );
};

export default CartSteps;
