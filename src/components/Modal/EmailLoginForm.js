import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../../firebase";

import { createOrUpdateUser } from "../../authFunctions/auth";

const EmailLoginForm = ({ history }) => {
  const [email, setEmail] = useState("nemph1s.k@gmail.com");
  const [password, setPassword] = useState("tester");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

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
    setLoading(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // history.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const loginForm = () => (
    <form className="modal__form" noValidate onSubmit={handleSubmit}>
      <label>По почте</label>
      <input
        id="email"
        label="Эл. почта"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        autoFocus
      />
      <input
        name="password"
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        autoComplete="current-password"
      />

      <div className="modal__form-btn-wrapper">
        <button
          type="submit"
          className="modal__form-btn"
          onSubmit={() => {
            handleSubmit();
            setEmail("");
          }}
          onSubmit={handleSubmit}
          disabled={!email || password.length < 6}
        >
          Войти
        </button>
      </div>
    </form>
  );

  return <div>{loginForm()}</div>;
};

export default EmailLoginForm;
