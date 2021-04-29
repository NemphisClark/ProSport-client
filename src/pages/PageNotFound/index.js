import React from "react";
import { Container } from "@material-ui/core";

import "./custom.scss";

const NotFoundPage = () => {
  return (
    <Container maxWidth="xl" className="error-container">
      <h4>404</h4>
      <p className="return">
        Страница не найдена.
        <br />
        Вернуться на{" "}
        <a href="/" style={{ fontFamily: "Gerbera-Bold", color: "#111" }}>
          главную
        </a>
      </p>
    </Container>
  );
};

export default NotFoundPage;
