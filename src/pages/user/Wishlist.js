import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getWishlist, removeWishlist } from "../../functions/user";

import Checkbox from "../../components/Checkbox";
import UserNav from "../../components/Navs/UserNav";
import ProductCardInWishList from "../../components/Cards/ProductCardInWishlist";

import "./style.scss";

const Wishlist = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [wishlist, setWishlist] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
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

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleRemoveAll = () => {
    wishlist.map((productId) => {
      removeWishlist(productId._id, user.token).then((res) => {
        loadWishlist();
      });
    });
  };

  const handleRemove = (productId) => {
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-container__nav">
        <UserNav />
      </div>

      <div className="profile-container-content">
        <div
          className="profile-container-content__other"
          style={{ flexDirection: "column" }}
        >
          {wishlist.length > 0 ? (
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
          ) : (
            <div className="profile-container-empty__msg-wishlist">
              Если вы хотите сохранить продукт, который вам понравился, вы
              можете нажать на кнопку "Добавить в избранное" на странице товара.
            </div>
          )}

          {wishlist.map((p) => (
            <div key={p._id} className="wishlist-card">
              <ProductCardInWishList
                product={p}
                key={p._id}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
