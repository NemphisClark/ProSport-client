import React from "react";

import ProductCardInOrder from "./ProductCardInOrder";

import "./style.scss";

const ShowPaymentInfo = ({ order, showStatus = true }) => {
  let product = null;

  let products = order.products.map((p) => {
    product = p.product;
    console.log(product);
  });

  return (
    <React.Fragment>
      <ProductCardInOrder product={product} order={order} />
    </React.Fragment>
  );
};

export default ShowPaymentInfo;
