import React from 'react';
import laptop from '../../images/laptop.png';
import _ from 'lodash';

import './ProductCard.scss';

const ProductCard = ({ product }) => {
  // destructure
  const { images, title, slug, price } = product;

  return (
    <div className="product-card" data-price={price}>
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
    </div>
  );
};

export default ProductCard;
