import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import Vonage from "@vonage/server-sdk";

import { createOrUpdateUser } from "../../authFunctions/auth";
import { FormsContext } from "./FormsContext";

const PhoneForm = ({ history }) => {
  const [phone, setPhone] = useState("");

  let dispatch = useDispatch();

  const { switchToEmail } = useContext(FormsContext);

  const roleBasedRedirect = (res) => {
    // check if intended
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/orders");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vonage = new Vonage({
      apiKey: "f7deb586",
      apiSecret: "l0MnyO7m4qBbTALs",
    });

    vonage.verify.request(
      {
        number: "79505391366",
        brand: "ProSport",
        code_length: "6",
      },
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          const verifyRequestId = result.request_id;
          console.log("request_id", verifyRequestId);

          createOrUpdateUser(verifyRequestId)
            .then((res) => {
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name: res.data.name,
                  email: res.data.email,
                  token: verifyRequestId,
                  role: res.data.role,
                  _id: res.data._id,
                },
              });
              roleBasedRedirect(res);
            })
            .catch((err) => console.log(err));
        }
      }
    );

    console.log("Submited");
  };

  return (
    <form className="modal__form" onSubmit={handleSubmit}>
      <label>По номеру телефона</label>
      <input
        type="text"
        placeholder="+79*********"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <div id="recaptcha-container"></div>

      <div className="modal__form-redir" onClick={switchToEmail}>
        У меня нет доступа к телефону
      </div>

      <div className="modal__form-btn-wrapper">
        <button
          type="submit"
          id="sign-in-button"
          className="modal__form-btn"
          onSubmit={(e) => {
            e.preventDefault();
            setPhone("");
          }}
          disabled={phone.length < 3}
        >
          Отправить код
        </button>
      </div>
    </form>
  );
};

export default PhoneForm;
