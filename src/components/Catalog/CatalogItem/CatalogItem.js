import React from 'react';
import axios from 'axios';

const CatalogItem = ({ post }) => {
  const addHandler = () => {
    axios.post(`http://localhost:3001/api/edit/${post.id}`)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error('Error adding data:', error);
      });
  };

  return (
    <li className="post">
      <h2>{post.name}</h2>
      <div className="img">
        <img src={post.images[0].src} alt={post.images[0].alt} />
      </div>
      <p dangerouslySetInnerHTML={{ __html: post.short_description }}></p>
      <p>Price: {post.prices.price} {post.prices.currency_suffix}</p>
      <div className='category'>
      {post.categories.map((category) => (
        <p key={category.name} className="category">
          {category.name}
        </p>
      ))}
      </div>
      <button className="btn" onClick={addHandler}>
        Add To Cart
      </button>
    </li>
  );
};

export default CatalogItem;

