import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";
import { currentUser } from "./authFunctions/auth";

// using lazy
const Login = lazy(() => import("./components/Modal/EmailLoginForm"));
const HomePage = lazy(() => import("./pages/home"));
const Header = lazy(() => import("./components/Header/Header"));
const HeaderMenu = lazy(() => import("./components/HeaderMenu"));
const Footer = lazy(() => import("./components/Footer"));

const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const History = lazy(() => import("./pages/user/History"));
const UserRoute = lazy(() => import("./routes/UserRoute"));
const AdminRoute = lazy(() => import("./routes/AdminRoute"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const AdminPersonalData = lazy(() => import("./pages/admin/AdminPersonalData"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const UserDashboard = lazy(() => import("./pages/user/UserDashboard"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const SubParentPage = lazy(() =>
  import("./pages/category/subParent/SubParentPage")
);
const SubParentCreate = lazy(() =>
  import("./pages/admin/subParent/SubParentCreate")
);
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
const SubPage = lazy(() => import("./pages/category/sub/SubPage"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const Catalogue = lazy(() => import("./pages/catalogue/index"));
const Cart = lazy(() => import("./pages/cart/Cart"));

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // If user exists, his data will dispatch to redux (name, email, firebase token, role, _id)
        currentUser(idTokenResult.token)
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
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense fallback={<div className="loading-bg" />}>
      <Header />
      <HeaderMenu />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/auth/login" component={Login} />
        <Route
          exact
          path="/auth/register/complete"
          component={RegisterComplete}
        />

        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/catalogue" component={Catalogue} />
        <Route exact path="/basket" component={Cart} />

        <Route exact path="/parent-sub/:slug" component={SubParentPage} />
        <Route exact path="/sub/:slug" component={SubPage} />

        <UserRoute exact path="/user/dashboard" component={UserDashboard} />
        <UserRoute exact path="/user/orders" component={History} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />

        <AdminRoute
          exact
          path="/admin/personal-data"
          component={AdminPersonalData}
        />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute
          exact
          path="/admin/parent-sub"
          component={SubParentCreate}
        />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />

        <Route path="*" component={PageNotFound} />
      </Switch>
      <Footer />
    </Suspense>
  );
};

export default App;
