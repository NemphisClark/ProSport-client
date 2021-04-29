import React, { useEffect, useState } from 'react';
import { getProducts } from '../../functions/product';
import ProductCard from '../Cards/ProductCard';
import LoadingCard from '../Cards/LoadingCard';

import './style.scss';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAllProducts = () => {
      setLoading(true);
      // sort, order, limit

      getProducts('sold', 'desc', 4).then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
    };

    loadAllProducts();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <LoadingCard count={1} />
      ) : (
        <div className="products-container">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSellers;
