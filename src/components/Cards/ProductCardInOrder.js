import React from "react";
import laptop from "../../images/laptop.png";
import _ from "lodash";

import "./ProductCard.scss";

const ProductCardInOrder = ({ order, product, showStatus = true }) => {
  // destructure
  const { images, title, price } = product;

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 3);

  return (
    <div className="product-card__hover">
      <div className="product-card__order-info">
        <div>Доставка: курьером</div>
        <div>Улица: Тест 10, 14</div>
        <div>
          Дата заказа: {new Date(product.createdAt).getDate()}{" "}
          {new Date().toLocaleString("ru", {
            month: "long",
          })}
        </div>
        <div>
          Дата получения {new Date(product.createdAt).getDate() + 3}{" "}
          {new Date().toLocaleString("ru", {
            month: "long",
          })}
        </div>
        <div>
          Статус заказа:{" "}
          {showStatus && (
            <span style={{ color: "#e44747" }}>{order.orderStatus}</span>
          )}
        </div>
      </div>

      <div>
        <img
          className="product-card__img"
          src={images && images.length ? images[0].url : laptop}
          alt="Изображение продукта"
        />
      </div>

      <div className="product-card__info">
        <div className="product-card__info-title">{title}</div>
        <div className="product-card__info-price">{price} &#8381;</div>
      </div>
    </div>
  );
};

export default ProductCardInOrder;
