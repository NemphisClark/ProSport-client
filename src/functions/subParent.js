import axios from "axios";

export const getParentSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/parent-subs`);

export const getParentSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/parent-sub/${slug}`);

export const removeParentSub = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/parent-sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const createParentSub = async (subParent, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/parent-sub`, subParent, {
    headers: {
      authtoken,
    },
  });
