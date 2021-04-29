import React, { useState, useEffect } from "react";

import { getCategories } from "../../functions/category";
import SubList from "../Category/SubList";

import "./style.scss";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id} className="header-menu__category">
        <a className="header-menu__category-link" href={`/category/${c.slug}`}>
          {c.name}

          <div key={c._id} className="header-menu__category-sub">
            <SubList parentId={c._id} />
          </div>
        </a>
      </div>
    ));

  return (
    <React.Fragment>
      {loading ? <h5>Загрузка...</h5> : showCategories()}
    </React.Fragment>
  );
};

export default CategoryList;
