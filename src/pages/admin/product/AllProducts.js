import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getProductsByCount, removeProduct } from "../../../functions/product";

import AdminNav from "../../../components/Navs/AdminNav";
import AdminProductCard from "../../../components/Cards/AdminProductCard";
import Checkbox from "../../../components/Checkbox";

import "../style.scss";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    if (window.confirm("Удалить товар?")) {
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`Товар "${res.data.title}" удален`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(products.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleRemoveAll = () => {
    products.map((slug) => {
      console.log(slug);
      removeProduct(slug.slug, user.token).then((res) => {
        loadAllProducts();
      });
    });
  };

  return (
    <div className="admin-container">
      <div className="admin-container__nav">
        <AdminNav />
      </div>

      <div
        className="profile-container-content"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {products.length > 0 ? (
          <div style={{ display: "flex" }}>
            <label className="checkbox-container">
              <Checkbox
                type="checkbox"
                name="selectAll"
                id="selectAll"
                handleClick={handleSelectAll}
                isChecked={isCheckAll}
              />
              Выбрать все
              <span className="checkmark"></span>
            </label>

            <div
              style={{
                display: "flex",
                marginLeft: "40px",
                marginTop: "4px",
                color: "#8F2929",
              }}
            >
              {isCheckAll ? (
                <div
                  className="basket-select__delete"
                  onClick={handleRemoveAll}
                  style={{ cursor: "pointer" }}
                >
                  Удалить все
                </div>
              ) : null}

              {isCheck && isCheck.length > 0 ? (
                <div
                  className="basket-select__delete"
                  onClick={() => {
                    handleRemove(isCheck);
                    console.log(isCheck);
                  }}
                  style={{ marginLeft: "20px", cursor: "pointer" }}
                >
                  Удалить выбранные
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="admin-products">
          {products.map((product) => (
            <div key={product._id} className="products">
              <AdminProductCard
                product={product}
                handleRemove={handleRemove}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
