import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getProduct } from '../functions/product';

import SingleProduct from '../components/Cards/SingleProduct';

import './style.scss';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});

  // redux
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct(slug).then((res) => {
      setProduct(res.data);
    });
  }, [user, slug]);

  const loadSingleProduct = (slug) => {
    return getProduct(slug);
  };

  return (
    <div className="product-view__container">
      <div className="product-view__container-content">
        <SingleProduct product={product} />
      </div>
    </div>
  );
};

export default Product;
