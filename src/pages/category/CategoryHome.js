import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProductsByFilter } from "../../functions/product";
import { getCategories, getCategory } from "../../functions/category";

import ProductCard from "../../components/Cards/ProductCard";
import CategoryList from "../../components/Category/CategoryList";

import "./style.scss";

const CategoryHome = ({ match }) => {
  const { slug } = match.params;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [productSize, setProductSize] = useState("");
  const [structure, setStructure] = useState("");
  const [season, setSeason] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const structures = [
    "Хлопок",
    "Полиэстер",
    "Кожа",
    "Пластмасса",
    "Эластан",
    "Текстиль",
    "Замша",
    "Латекс",
  ];
  const seasons = ["Зима", "Весна", "Лето", "Осень"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
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
  ];
  const brands = [
    "Hermes",
    "Fendi",
    "Gucci",
    "Louis & Vitton",
    "Dolce & Gabbana",
    "Giorgio Armani",
  ];

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by categories
  const loadAllProducts = () => {
    getCategory(slug).then((res) => {
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 200);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on category
  // show categories in checkbox
  const showCategories = () => <CategoryList />;

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setBrand("");
    setProductSize("");
    setStructure("");
    setSeason("");
    setColor("");

    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  categories.map((c) => (
    <div key={c._id}>
      <div
        onChange={handleCheck}
        className="pb-2 pl-4 pr-4"
        value={c._id}
        name="category"
        checked={categoryIds.includes(c._id)}
      >
        {c.name}
      </div>
    </div>
  ));

  // 4. show products based on sizes
  const handleSizes = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setBrand("");
    setProductSize(e.target.value);
    setStructure("");
    setSeason("");
    setColor("");
    fetchProducts({ size: e.target.value });
  };

  const showSizes = () => {
    return sizes.map((size) => (
      <React.Fragment key={size}>
        <div>
          <input
            className="select-checkbox"
            id={size}
            type="checkbox"
            key={size}
            value={size}
            name={size}
            checked={size === productSize}
            onChange={handleSizes}
          />
          <label htmlFor={size}>{size}</label>
        </div>
      </React.Fragment>
    ));
  };

  // 5. show products based on brand name
  const handleBrand = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setBrand(e.target.value);
    setProductSize("");
    setStructure("");
    setSeason("");
    setColor("");
    fetchProducts({ brand: e.target.value });
  };

  const showBrands = () => {
    return brands.map((b) => (
      <React.Fragment key={b}>
        <div>
          <input
            className="select-checkbox"
            id={b}
            type="checkbox"
            key={b}
            value={b}
            name={b}
            checked={b === brand}
            onChange={handleBrand}
          />
          <label htmlFor={b}>{b}</label>
        </div>
      </React.Fragment>
    ));
  };

  // 6. show products based on color
  const handleColor = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setBrand("");
    setProductSize("");
    setStructure("");
    setSeason("");
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  const showColors = () => {
    return colors.map((c) => (
      <React.Fragment key={c}>
        <div>
          <input
            className="select-checkbox"
            id={c}
            type="checkbox"
            key={c}
            value={c}
            name={c}
            checked={c === color}
            onChange={handleColor}
          />
          <label htmlFor={c}>{c}</label>
        </div>
      </React.Fragment>
    ));
  };

  // 7. show products based on season of product
  const handleSeason = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setBrand("");
    setProductSize("");
    setStructure("");
    setColor("");
    setSeason(e.target.value);
    fetchProducts({ season: e.target.value });
  };

  const showSeasons = () => {
    return seasons.map((s) => (
      <React.Fragment key={s}>
        <div>
          <input
            className="select-checkbox"
            id={s}
            type="checkbox"
            key={s}
            value={s}
            name={s}
            checked={s === season}
            onChange={handleSeason}
          />
          <label htmlFor={s}>{s}</label>
        </div>
      </React.Fragment>
    ));
  };

  // 8. show products based on product structure
  const handleStructure = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setBrand("");
    setProductSize("");
    setSeason("");
    setColor("");
    setStructure(e.target.value);
    fetchProducts({ structure: e.target.value });
  };

  const showStructure = () => {
    return structures.map((struct) => (
      <React.Fragment key={struct}>
        <div>
          <input
            className="select-checkbox"
            id={struct}
            type="checkbox"
            key={struct}
            value={struct}
            name={struct}
            checked={struct === structure}
            onChange={handleStructure}
          />
          <label htmlFor={struct}>{struct}</label>
        </div>
      </React.Fragment>
    ));
  };

  const handlePriceIncrement = () => {
    let productList = document.querySelector(".products");

    for (let i = 0; i < productList.children.length; i++) {
      for (let j = i; j < productList.children.length; j++) {
        if (
          +productList.children[i].getAttribute("data-price") >
          +productList.children[j].getAttribute("data-price")
        ) {
          let replacedNode = productList.replaceChild(
            productList.children[j],
            productList.children[i]
          );
          insertAfter(replacedNode, productList.children[i]);
        }
      }
    }
  };

  const handlePriceDecrement = () => {
    let productList = document.querySelector(".products");

    for (let i = 0; i < productList.children.length; i++) {
      for (let j = i; j < productList.children.length; j++) {
        if (
          +productList.children[i].getAttribute("data-price") <
          +productList.children[j].getAttribute("data-price")
        ) {
          let replacedNode = productList.replaceChild(
            productList.children[j],
            productList.children[i]
          );
          insertAfter(replacedNode, productList.children[i]);
        }
      }
    }
  };

  const insertAfter = (elem, refElem) => {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
  };

  const [brandsDropdown, setBrandsDropdown] = useState(false);
  const [sortDropdown, setSortDropdown] = useState(false);
  const [sizesDropdown, setSizesDropdown] = useState(false);
  const [seasonDropdown, setSeasonDropdown] = useState(false);
  const [colorDropdown, setColorDropdown] = useState(false);
  const [structureDropdown, setStructureDropdown] = useState(false);

  // Toggle dropdowns
  const handleSortSelect = () => {
    setTimeout(() => {
      setSortDropdown(!sortDropdown);
      setBrandsDropdown(false);
      setSizesDropdown(false);
      setSeasonDropdown(false);
      setColorDropdown(false);
      setStructureDropdown(false);
    }, 100);
  };
  const handleBrandsSelect = () => {
    setTimeout(() => {
      setBrandsDropdown(!brandsDropdown);
      setSortDropdown(false);
      setSizesDropdown(false);
      setSeasonDropdown(false);
      setColorDropdown(false);
      setStructureDropdown(false);
    }, 100);
  };
  const handleSizesSelect = () => {
    setTimeout(() => {
      setSizesDropdown(!sizesDropdown);
      setBrandsDropdown(false);
      setSortDropdown(false);
      setSeasonDropdown(false);
      setColorDropdown(false);
      setStructureDropdown(false);
    }, 100);
  };
  const handleSeasonDropdown = () => {
    setTimeout(() => {
      setSeasonDropdown(!seasonDropdown);
      setSizesDropdown(false);
      setBrandsDropdown(false);
      setSortDropdown(false);
      setColorDropdown(false);
      setStructureDropdown(false);
    }, 100);
  };
  const handleColorDropdown = () => {
    setTimeout(() => {
      setColorDropdown(!colorDropdown);
      setSeasonDropdown(false);
      setSizesDropdown(false);
      setBrandsDropdown(false);
      setSortDropdown(false);
      setStructureDropdown(false);
    }, 100);
  };
  const handleStructureDropdown = () => {
    setTimeout(() => {
      setStructureDropdown(!structureDropdown);
      setColorDropdown(false);
      setSeasonDropdown(false);
      setSizesDropdown(false);
      setBrandsDropdown(false);
      setSortDropdown(false);
    }, 100);
  };

  return (
    <div className="catalogue">
      <div className="catalogue-wrapper">
        <div className="catalogue-menu">
          <div className="catalogue-menu__top">
            <div className="catalogue-menu__title">{category.name}</div>

            <div className="select" onClick={handleSortSelect}>
              <div className="select__title" data-default="Сортировать по">
                Сортировать по
              </div>

              {sortDropdown ? (
                <div className="select__content">
                  <div onClick={handlePriceIncrement}>По возрастанию</div>
                  <div onClick={handlePriceDecrement}>По убыванию</div>
                  <div onClick={handlePriceIncrement}>По новизне</div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="catalogue-menu__bottom">
            <div className="catalogue-menu__sections">
              <div className="select-types" onClick={handleBrandsSelect}>
                <div className="select__title" data-default="Бренды">
                  {brand ? brand : "Бренды"}
                </div>

                {brandsDropdown ? (
                  <div className="select__content-types">{showBrands()}</div>
                ) : null}
              </div>
              <div className="select-types" onClick={handleSizesSelect}>
                <div className="select__title" data-default="Размеры">
                  {productSize ? productSize : "Размеры"}
                </div>

                {sizesDropdown ? (
                  <div className="select__content-types">{showSizes()}</div>
                ) : null}
              </div>
              <div className="select-types" onClick={handleSeasonDropdown}>
                <div className="select__title" data-default="Сезон">
                  {season ? season : "Сезон"}
                </div>

                {seasonDropdown ? (
                  <div className="select__content-types">{showSeasons()}</div>
                ) : null}
              </div>
              <div className="select-types" onClick={handleColorDropdown}>
                <div className="select__title" data-default="Цвет">
                  {color ? color : "Цвет"}
                </div>

                {colorDropdown ? (
                  <div className="select__content-types">{showColors()}</div>
                ) : null}
              </div>
              <div className="select-types" onClick={handleStructureDropdown}>
                <div className="select__title" data-default="Состав">
                  {structure ? structure : "Состав"}
                </div>

                {structureDropdown ? (
                  <div className="select__content-types">{showStructure()}</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {products.length < 1 && <h2>Товары не найдены</h2>}

        <div className="products">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryHome;
