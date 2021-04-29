import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/Navs/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import {
  createParentSub,
  removeParentSub,
  getParentSubs,
} from "../../../functions/subParent";
import CategoryForm from "../../../components/Forms/CategoryForm";
import LocalSearch from "../../../components/Forms/LocalSearch";

import CloseIcon from "@material-ui/icons/Close";

import "../style.scss";

const SubParentCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [parentSubs, setParentSubs] = useState([]);
  // step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadParentSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadParentSubs = () =>
    getParentSubs().then((s) => setParentSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createParentSub({ name, parent: category }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadParentSubs();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeParentSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadParentSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
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
        {/* <LocalSearch keyword={keyword} setKeyword={setKeyword} /> */}
        <div>
          {parentSubs.filter(searched(keyword)).map((s) => (
            <div className="card-category" key={s._id}>
              {s.name}

              <div
                style={{ marginRight: "10px", cursor: "pointer" }}
                onClick={() => handleRemove(s.slug)}
              >
                <CloseIcon style={{ fontSize: "20px" }} />
              </div>
            </div>
          ))}
        </div>

        <div>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <div className="form-group">
            <select
              name="category"
              className="custom-select"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Выберите категорию</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubParentCreate;
