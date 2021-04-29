import React from "react";

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCatagoryChange,
  handleSizesChange,
  parentSubOptions,
  subOptions,
  showParentSub,
  showSub,
}) => {
  // destructure
  const {
    title,
    description,
    price,
    sizes,
    structures,
    seasons,
    categories,
    parentSubs,
    subs,
    quantity,
    colors,
    brands,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          placeholder="Добавить название"
          type="text"
          name="title"
          className="form-control__input"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          placeholder="Количество"
          type="number"
          name="quantity"
          className="form-control__input"
          min="1"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          placeholder="Добавить цену"
          type="number"
          name="price"
          className="form-control__input"
          min="400"
          value={price}
          onChange={handleChange}
          style={{ width: "200px" }}
        />
      </div>
      <div className="form-group" style={{ marginTop: "20px" }}>
        <span style={{ color: "#868686" }}>Выберите размерный ряд</span>

        <div style={{ display: "flex", marginTop: "10px" }}>
          {sizes
            ? sizes.map((s) => (
                <div
                  onClick={(e) => {
                    const productSize = e.target;
                    const sizeBorderColor = "2px solid rgb(129, 129, 129)";

                    if (productSize.style.border == sizeBorderColor) {
                      productSize.style.border = null;
                    } else {
                      productSize.style.border = sizeBorderColor;
                    }

                    handleSizesChange(e);
                  }}
                  className="size-admin"
                >
                  {s}
                </div>
              ))
            : null}
        </div>
      </div>

      <div className="form-group">
        <select name="season" className="custom-select" onChange={handleChange}>
          {seasons.map((pSeasons) => (
            <option key={pSeasons} value={pSeasons}>
              {pSeasons}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <select
          name="structure"
          className="custom-select"
          onChange={handleChange}
        >
          {structures.map((pStructure) => (
            <option key={pStructure} value={pStructure}>
              {pStructure}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <select name="brand" className="custom-select" onChange={handleChange}>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <select
          name="category"
          className="custom-select"
          onChange={handleCatagoryChange}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      {showParentSub && (
        <div>
          <select
            className="custom-select"
            style={{ width: "100%" }}
            value={parentSubs}
            onChange={(e) => {
              setValues({ ...values, parentSubs: e.target.value });
            }}
          >
            {parentSubOptions.length &&
              parentSubOptions.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
          </select>
        </div>
      )}
      {showSub && (
        <div>
          <select
            className="custom-select"
            style={{ width: "100%" }}
            value={subs}
            onChange={(e) => {
              setValues({ ...values, subs: e.target.value });
            }}
          >
            {subOptions.length &&
              subOptions.map((s) => {
                let parentSub = "Категория";

                {
                  parentSubOptions.map((parentName) => {
                    if (parentName._id === s.parent) {
                      parentSub = parentName.name;
                    } else {
                      parentSub = parentSub;
                      if (parentSub == "Категория") {
                        parentSub = null;
                      }
                    }
                  });
                }

                return (
                  <React.Fragment>
                    {parentSub ? (
                      <option key={s._id} value={s._id}>
                        {s.name} / {parentSub}
                      </option>
                    ) : null}
                  </React.Fragment>
                );
              })}
          </select>
        </div>
      )}
      <div className="form-group">
        <textarea
          placeholder="Добавить описание"
          type="text"
          name="description"
          className="form-control__input"
          value={description}
          onChange={handleChange}
          style={{
            marginTop: "20px",
            height: "370px",
            maxHeight: "400px",
            minHeight: "40px",
            maxWidth: "400px",
            minWidth: "400px",
          }}
        />
      </div>
      <button
        className="btn-light"
        style={{ position: "absolute", right: "525px", bottom: "-200px" }}
      >
        Добавить
      </button>
    </form>
  );
};

export default ProductCreateForm;
