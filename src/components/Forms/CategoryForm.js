import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group" style={{ display: "flex" }}>
      <input
        type="text"
        className="form-control__input"
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        style={{
          width: "300px",
          marginBottom: "0",
          border: "1px solid #c4c4c4",
        }}
      />
      <button className="btn-light" style={{ fontSize: "15px" }}>
        Добавить
      </button>
    </div>
  </form>
);

export default CategoryForm;
