import React from "react";
import ShowPaymentInfo from "../Cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => {
  const showOrderInTable = (order) => (
    <div className="admin-order">
      <React.Fragment>
        <span>
          Заказчик: {order.paymentIntent.name} {order.paymentIntent.surname}
        </span>
        <span>
          Адрес доставки: {order.paymentIntent.address}{" "}
          {order.paymentIntent.addressHome},{" "}
          {order.paymentIntent.addressApartment}
        </span>
        <span>Статус заказа: {order.orderStatus}</span>
        <span>Сумма заказа: {order.paymentIntent.amount}&#8381;</span>
        <span>Товары:</span>
        {order.products.map((p, i) => (
          <div>
            {p.product.title}, размер {p.sizes}, цвет {p.color}
          </div>
        ))}
      </React.Fragment>
    </div>
  );

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {orders.map((order) => (
        <div key={order._id} style={{ marginRight: "20px" }}>
          {/* <div> */}
          {/* <ShowPaymentInfo order={order} showStatus={false} /> */}

          {/* <div className="row">
              <div className="col-md-4">Статус доставки</div>
              <div className="col-md-8">
                <select
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="form-control"
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="Не обработан">Не обработан</option>
                  <option value="В пути">В пути</option>
                  <option value="Доставлен">Доставлен</option>
                  <option value="Отклонен">Отклонен</option>
                  <option value="Доставлен">Доставлен</option>
                </select>
              </div>
            </div> */}
          {/* </div> */}

          {showOrderInTable(order)}
        </div>
      ))}
    </div>
  );
};

export default Orders;
