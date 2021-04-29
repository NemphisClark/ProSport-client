import React from "react";
import CloseIcon from "@material-ui/icons/Close";

import Checkbox from "../Checkbox";
import laptop from "../../images/laptop.png";

import "./ProductCard.scss";

const AdminProductCard = ({ product, handleRemove, isCheck, setIsCheck }) => {
  // destructure props
  const { title, images, slug, price } = product;

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);

    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  return (
    <div className="product-card" style={{ position: "relative" }}>
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

      <div className="product-remove" onClick={() => handleRemove(slug)}>
        <CloseIcon style={{ fontSize: "30px" }} />
      </div>
    </div>
  );
};

export default AdminProductCard;
