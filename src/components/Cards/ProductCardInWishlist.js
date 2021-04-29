import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { getWishlist, removeWishlist } from "../../functions/user";
import Checkbox from "../Checkbox";

import CloseIcon from "@material-ui/icons/Close";
import laptop from "../../images/laptop.png";
import "./ProductCard.scss";

const ProductCardInWishList = ({
  product,
  isCheck,
  setIsCheck,
  wishlist,
  setWishlist,
}) => {
  // redux
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const { slug, title, price, images, size } = product;
  let productSizeInCart = size;

  // const [wishlist, setWishlist] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    const loadWishlist = () => {
      getWishlist(user.token).then((res) => {
        // console.log(res);
        setWishlist(res.data.wishlist);
      });
    };

    setList(wishlist);
    loadWishlist();
  }, [user.token, list]);

  const loadWishlist = () => {
    getWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });
  };

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
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);

    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const handleRemove = (productId) => {
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });
  };

  return (
    <div
      className="product-card"
      data-price={price}
      style={{ height: "430px", position: "relative" }}
    >
      <label className="checkbox-container" style={{ marginLeft: "10px" }}>
        <Checkbox
          key={product._id}
          type="checkbox"
          name={product.title}
          id={product._id}
          handleClick={handleClick}
          isChecked={isCheck.includes(product._id)}
        />
        <span className="checkmark"></span>
      </label>
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "6px",
          height: "24px",
          width: "24px",
        }}
        onClick={() => handleRemove(product._id)}
      >
        <CloseIcon
          style={{
            cursor: "pointer",
            fontSize: "30px",
          }}
        />
      </div>

      <a href={`/product/${slug}`}>
        <img
          className="product-card__img"
          src={images && images.length ? images[0].url : laptop}
          alt="Изображение продукта"
        />
      </a>

      <div className="product-card__info">
        <div className="product-card__info-title">{title}</div>
        <div className="product-card__info-price">{price} &#8381;</div>
      </div>

      <div className="wishlist-card__cart" onClick={handleAddToCart}>
        В корзину
      </div>
    </div>
  );
};

export default ProductCardInWishList;
