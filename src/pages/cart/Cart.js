import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { userCart } from "../../functions/user";

import Checkbox from "../../components/Checkbox";
import ProductCardInCheckout from "../../components/Cards/ProductCardInCheckout";

import CartSteps from "./CartSteps";
import CartPaymentTab from "./CartPaymentTab";
import CartDeliveryTab from "./CartDeliveryTab";
import CartDataTab from "./CartDataTab";

import "./cart.scss";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  // To select (all) checkboxes
  useEffect(() => {
    setList(cart);
  }, [list]);

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const catalog = list.map((p) => {
    return (
      <div>
        <ProductCardInCheckout
          key={p._id}
          p={p}
          isCheck={isCheck}
          setIsCheck={setIsCheck}
        />
      </div>
    );
  });

  // save order (cash on delivery) to DB
  const saveCashOrderToDB = () => {
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const handleRemoveAll = () => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart = [];

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      list.map((product, i) => {
        if (product._id) {
          list.splice(i, 1);
        }
        return null;
      });

      localStorage.setItem("cart", JSON.stringify(list));
      dispatch({
        type: "ADD_TO_CART",
        payload: list,
      });
    }
  };

  var today = new Date();
  var tomorrow = new Date();
  today.setDate(today.getDate());
  tomorrow.setDate(tomorrow.getDate() + 3);

  const showCartItems = () => (
    <div className="basket-body">
      <div className="basket-header">
        <div className="basket-select">
          <label className="checkbox-container">
            <Checkbox
              type="checkbox"
              name="selectAll"
              id="selectAll"
              handleClick={handleSelectAll}
              isChecked={isCheckAll}
            />
            ?????????????? ??????
            <span className="checkmark"></span>
          </label>
        </div>

        {isCheckAll ? (
          <div className="basket-select__delete" onClick={handleRemoveAll}>
            ?????????????? ??????
          </div>
        ) : null}

        {isCheck && isCheck.length > 0 ? (
          <div className="basket-select__delete" onClick={handleRemove}>
            ?????????????? ??????????????????
          </div>
        ) : null}
      </div>

      <div className="basket-delivery">
        <span>
          ?????????????????????? {today.getDate()} - {tomorrow.getDate()} ??????????
        </span>
      </div>

      <div className="basket-content">
        <div className="basket-content__left">
          {catalog}

          <h2>?????? 1 - ???????????????? ???????????? ????????????????</h2>
          <CartDeliveryTab />

          <h2>?????? 2 - ???????????????? ???????????? ????????????</h2>
          <CartPaymentTab />

          <h2>?????? 3 - ???????????? ???????????? ????????????????????</h2>
          <CartDataTab />
        </div>

        <CartSteps />
      </div>
    </div>
  );

  return (
    <div className="basket">
      <div className="basket-wrapper">
        <h2>??????????????</h2>
        {!cart.length ? (
          <p style={{ padding: "0 40px 400px 40px" }}>
            ?? ?????????????? ?????? ??????????????.{" "}
            <a href="/catalogue" style={{ color: "#e44747" }}>
              ???????????????????? ??????????????.
            </a>
          </p>
        ) : (
          showCartItems()
        )}
      </div>
    </div>
  );
};

export default Cart;
