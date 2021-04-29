import React from "react";

import CartPaymentTab from "./CartPaymentTab";
import CartDeliveryTab from "./CartDeliveryTab";

import "./cart.scss";

const CartTabsSteps = ({ stepTitle }) => {
  return (
    <div className="cart-steps">
      <h2>{stepTitle}</h2>

      <CartDeliveryTab />
    </div>
  );
};

export default CartTabsSteps;
