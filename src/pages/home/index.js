import React from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import './index.scss';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="main-block">
        <Carousel>
          <img
            style={{ objectFit: 'fill', height: '100%' }}
            src="https://res.cloudinary.com/nem10ib/image/upload/v1615386270/ProSport/new-collection_egkcmf.jpg"
            alt="Изображение продукта"
          />
          <img
            style={{ objectFit: 'fill', height: '100%' }}
            src="https://res.cloudinary.com/nem10ib/image/upload/v1615388475/ProSport/banner_spring_2021_wgss8w.webp"
            alt="Изображение продукта"
          />
        </Carousel>
      </div>

      <div className="second-section">
        <div className="small-block">Реклама</div>
        <div className="large-block">Изображение</div>
      </div>

      <div className="third-section">
        <div className="large-block">Изображение</div>
        <div className="small-block">Реклама</div>
      </div>
    </div>
  );
};

export default HomePage;
