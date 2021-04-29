import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const saveUserAddress = async (authtoken, address) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );

export const saveUserAddressHome = async (authtoken, addressHome) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address/home`,
    { addressHome },
    {
      headers: {
        authtoken,
      },
    }
  );

export const saveUserAddressApartment = async (authtoken, addressApartment) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address/apartment`,
    { addressApartment },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserAddress = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/address`, {
    headers: {
      authtoken,
    },
  });

export const getUserHome = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/address/home`, {
    headers: {
      authtoken,
    },
  });

export const getUserApartment = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/address/apartment`, {
    headers: {
      authtoken,
    },
  });

export const saveEmail = async (authtoken, cartEmail) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/save-email`,
    { cartEmail },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getEmail = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/get-email`, {
    headers: {
      authtoken,
    },
  });

export const savePhone = async (authtoken, phoneNumber) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/save-phone`,
    { phoneNumber },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getPhone = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/get-phone`, {
    headers: {
      authtoken,
    },
  });

export const saveCard = async (authtoken, userCard) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/user-card`,
    { userCard },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getCard = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/user-cards`, {
    headers: {
      authtoken,
    },
  });

export const saveUserName = async (authtoken, userName) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/save-name`,
    { userName },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserName = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/get-name`, {
    headers: {
      authtoken,
    },
  });

export const saveUserSurname = async (authtoken, userSurname) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/save-surname`,
    { userSurname },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserSurname = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/get-surname`, {
    headers: {
      authtoken,
    },
  });

export const createOrder = async (authtoken, paymentResponse) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { paymentResponse },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authtoken,
    },
  });

export const getWishlist = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      authtoken,
    },
  });

export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createCashOrderForUser = async (authtoken, COD) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    { COD },
    {
      headers: {
        authtoken,
      },
    }
  );
