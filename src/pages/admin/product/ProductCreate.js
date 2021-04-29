import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import ProductCreateForm from "../../../components/Forms/ProductCreateForm";
import FileUpload from "../../../components/Forms/FileUpload";
import AdminNav from "../../../components/Navs/AdminNav";

import { CircularProgress } from "@material-ui/core";
import { getSubs } from "../../../functions/sub";

import "../style.scss";

let pushSizes = [];

const initialState = {
  title: "",
  description: "",
  price: 2000,
  categories: [],
  category: "",
  parentSubs: [],
  subs: [],
  quantity: "",
  images: [
    // {
    //   public_id: "jwrzeubemmypod99e8lz",
    //   url:
    //     "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480909/jwrzeubemmypod99e8lz.jpg",
    // }
  ],
  colors: [
    "Белый",
    "Бежевый",
    "Розовый",
    "Желтый",
    "Оранжевый",
    "Красный",
    "Зеленый",
    "Синий",
    "Фиолетовый",
    "Коричневый",
    "Серый",
    "Черный",
  ],
  brands: [
    "Hermes",
    "Fendi",
    "Gucci",
    "Louis & Vitton",
    "Dolce & Gabbana",
    "Giorgio Armani",
  ],
  structures: [
    "Хлопок",
    "Полиэстер",
    "Кожа",
    "Пластмасса",
    "Эластан",
    "Текстиль",
    "Замша",
    "Латекс",
  ],
  structure: "Кожа",
  seasons: ["Зима", "Весна", "Лето", "Осень"],
  season: "Лето",
  color: "Белый",
  brand: "Apple",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  size: pushSizes,
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [parentSubOptions, setParentSubOptions] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [showParentSub, setShowParentSub] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setValues({ ...values, categories: c.data }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        window.alert(`"${res.data.title}" добавлен`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCatagoryChange = (e) => {
    e.preventDefault();
    setShowParentSub(true);

    setValues({ ...values, category: e.target.value });

    getCategorySubs(e.target.value).then((res) => {
      setParentSubOptions(res.data);
    });

    getSubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });

    setTimeout(() => {
      setShowSub(true);
    }, 100);
  };

  const handleSizesChange = (e) => {
    e.preventDefault();

    pushSizes.push(e.target.textContent);
    setValues({ ...values, size: pushSizes });
  };

  return (
    <div className="admin-container">
      <div className="admin-container__nav">
        <AdminNav />
      </div>

      <div
        className="profile-container-content"
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div>
          <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
          />
        </div>

        <ProductCreateForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          setValues={setValues}
          values={values}
          handleCatagoryChange={handleCatagoryChange}
          handleSizesChange={handleSizesChange}
          parentSubOptions={parentSubOptions}
          subOptions={subOptions}
          showParentSub={showParentSub}
          showSub={showSub}
        />
      </div>
    </div>
  );
};

export default ProductCreate;
