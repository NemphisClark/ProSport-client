import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";

import AdminNav from "../../../components/Navs/AdminNav";
import CategoryForm from "../../../components/Forms/CategoryForm";
import LocalSearch from "../../../components/Forms/LocalSearch";

import CloseIcon from "@material-ui/icons/Close";

import "../style.scss";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  // step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createCategory({ name }, user.token)
      .then((res) => {
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      removeCategory(slug, user.token)
        .then((res) => {
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
        });
    }
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="admin-container">
      <div className="admin-container__nav">
        <AdminNav />
      </div>

      <div
        className="profile-container-content"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          {categories.filter(searched(keyword)).map((c) => (
            <div className="card-category" key={c._id}>
              {c.name}

              <div
                style={{ marginRight: "10px", cursor: "pointer" }}
                onClick={() => handleRemove(c.slug)}
              >
                <CloseIcon style={{ fontSize: "20px" }} />
              </div>
            </div>
          ))}
        </div>

        <CategoryForm
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}
        />

        {/* <LocalSearch keyword={keyword} setKeyword={setKeyword} /> */}
      </div>
    </div>
  );
};

export default CategoryCreate;
