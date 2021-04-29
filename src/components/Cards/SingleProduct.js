import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { addToWishlist, userCart } from "../../functions/user";

import SizesModal from "../Modal/SizesModal";

import "./style.scss";

// this is children component of Product page
const SingleProduct = ({ product }) => {
  // redux
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  // router
  let history = useHistory();

  const [modalActive, setModalActive] = useState(false);

  const { title, price, images, description, size } = product;
  let productSizeInCart = [];

  const handleAddToCart = () => {
    toast("Спасибо! Ваш товар добавлен в корзину", {
      progressClassName: "Toastify__progress-bar--dark",
      autoClose: 1000,
      draggable: true,
    });

    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
        sizes: productSizeInCart,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));

      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      userCart(cart, user.token)
        .then((res) => {
          if (res.data.ok) console.log(res.data);
        })
        .catch((err) => console.log("cart save err", err));
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then(() => {
      toast("Добавлено в избранное", {
        progressClassName: "Toastify__progress-bar--dark",
        autoClose: 1000,
        draggable: true,
      });
      history.push("/user/wishlist");
    });
  };

  return (
    <React.Fragment>
      <div className="product-view__container-content__img">
        {images && images.length ? (
          <div>
            {images &&
              images.map((i) => (
                <img src={i.url} key={i.public_id} alt="Изображние продукта" />
              ))}
          </div>
        ) : (
          <div>Изображение не найдено</div>
        )}
      </div>

      <div style={{ width: "50%" }}>
        <div className="product-view__container-content__title">{title}</div>

        <div className="product-view__container-content__price">
          Цена: {price}
        </div>

        <div className="product-view__container-content__size">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "380px",
            }}
          >
            <span>Размеры</span>
            <div
              style={{ color: "#772f2f", cursor: "pointer" }}
              onClick={() => setModalActive(true)}
            >
              Подбор размера
            </div>

            <SizesModal active={modalActive} setActive={setModalActive} />
          </div>

          <div className="product-view__container-content__sizes">
            {size
              ? size.map((s) => (
                  <div
                    onClick={(e) => {
                      const productSize = e.target;
                      const sizeBorderColor = "2px solid rgb(129, 129, 129)";

                      if (productSize.style.border == sizeBorderColor) {
                        productSize.style.border = null;
                        productSizeInCart.shift();
                      } else {
                        productSize.style.border = sizeBorderColor;
                        productSizeInCart.shift();
                        productSizeInCart.push(e.target.textContent);
                      }
                    }}
                    className="size"
                  >
                    {s}
                  </div>
                ))
              : null}
          </div>
        </div>

        <div>
          <div className="product-btns">
            <button
              style={{ marginRight: "11px", borderRadius: "0" }}
              className="dark-btn__main"
              onClick={handleAddToCart}
              disabled={product.quantity < 1}
            >
              {product.quantity < 1 ? "Нет в наличии" : "Добавить в корзину"}
            </button>
            <button
              style={{ marginRight: "11px", borderRadius: "0" }}
              className="light-btn__main"
              onClick={handleAddToWishlist}
            >
              Добавить в избранное
            </button>
          </div>
        </div>

        <div className="product-view__container-content__description">
          <span>Описание:</span> {description}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleProduct;
