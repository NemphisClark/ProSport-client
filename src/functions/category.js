import axios from "axios";

export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/category/categories`);

export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/remove/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const createCategory = async (category, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/category/create`, category, {
    headers: {
      authtoken,
    },
  });

export const getCategorySubs = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/category/parent-subs/${_id}`);
