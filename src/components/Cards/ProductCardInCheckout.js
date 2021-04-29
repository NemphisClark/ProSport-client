import React, { useState, useEffect } from "react";
import ModalImage from "react-modal-image";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { addToWishlist } from "../../functions/user";

import laptop from "../../images/laptop.png";
import Checkbox from "../Checkbox";

import "./style.scss";

const ProductCardInCheckout = ({ p, isCheck, setIsCheck }) => {
  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  // router
  let history = useHistory();

  const [list, setList] = useState([]);

  // To select (all) checkboxes
  useEffect(() => {
    setList(cart);
  }, [list]);

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
        return null;
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();

    addToWishlist(p._id, user.token).then(() => {
      toast("Добавлено в избранное", {
        progressClassName: "Toastify__progress-bar--dark",
        autoClose: 1000,
        draggable: true,
      });
      history.push("/user/wishlist");
    });
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);

    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
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

      {
        console.log(cart);
      }

      localStorage.setItem("cart", JSON.stringify(list));
      dispatch({
        type: "ADD_TO_CART",
        payload: list,
      });
    }
  };

  const counts = [1, 2, 3, 4, 5];

  const showCount = () => {
    return counts.map((c) => (
      <React.Fragment key={c}>
        <div>
          <input
            className="select-checkbox"
            id={c}
            type="checkbox"
            key={c}
            value={c}
            name={c}
            onChange={handleQuantityChange}
          />
          <label htmlFor={c}>{c}</label>
        </div>
      </React.Fragment>
    ));
  };

  const [countDropdown, setCountDropdown] = useState(false);

  const handleCountSelect = () => {
    setTimeout(() => {
      setCountDropdown(!countDropdown);
    }, 100);
  };

  return (
    <div>
      <label className="checkbox-container">
        <Checkbox
          key={p._id}
          type="checkbox"
          name={p.title}
          id={p._id}
          handleClick={handleClick}
          isChecked={isCheck.includes(p._id)}
        />
        <span className="checkmark"></span>
      </label>

      <div className="basket-product">
        {p.images.length ? (
          <ModalImage small={p.images[0].url} large={p.images[0].url} />
        ) : (
          <ModalImage small={laptop} large={laptop} />
        )}

        <div className="basket-product__info">
          <div className="basket-product__info-top">
            <div className="basket-product__info-left">
              <div className="basket-product__title">{p.title}</div>
              <div className="basket-product__color">
                Артикул: {`${p && p._id.substring(0, 10)}`}
              </div>
              <div className="basket-product__color">Цвет: {p.color}</div>
              <div className="basket-product__size">Размер: {p.sizes}</div>
            </div>
            <div className="basket-product__info-right">
              <div className="basket-product__price">{p.price} рублей</div>
              <div className="basket-product__count">
                <span>Количество</span>

                <div
                  style={{ marginLeft: "10px" }}
                  className="select-types"
                  onClick={handleCountSelect}
                >
                  <div className="select__title" data-default="Бренды">
                    {p.count}
                  </div>

                  {countDropdown ? (
                    <div className="select__content-types">{showCount()}</div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="basket-product__info-bottom">
            <div
              className="basket-product__wishlist"
              onClick={handleAddToWishlist}
            >
              В избранное
            </div>
            <div className="basket-product__delete" onClick={handleRemove}>
              Удалить
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardInCheckout;
