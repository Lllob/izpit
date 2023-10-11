import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import CatalogItem from './CatalogItem/CatalogItem';

const Catalog = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('name');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/api/catalog`);
        const data = result.data;
        setPosts(data);
        setCategories(getUniqueCategories(data));
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchData(); 
  }, [page, selectedCategory, selectedSort]);

  //drop down menu
  const getUniqueCategories = (data) => {
    const uniqueCategories = [];
  
    data.forEach((post) => {
      post.categories.forEach((category) => {
        if (!uniqueCategories.includes(category.name)) {
          uniqueCategories.push(category.name);
        }
      });
    });
    return uniqueCategories;
  };
  

  const filterByCategory = (filter) => {
    setSelectedCategory(filter);
    setPage(1);
  };

  const sortBy = (sort) => {
    setSelectedSort(sort);
    setPage(1);
  };

  const filteredProducts = posts.filter((post) => {
    const categoryFilter = !selectedCategory || post.categories.some((category) => category.name === selectedCategory);
  //get all posts when no category is selected ||  or there is at least one category in post.categories whose name matches the selected category(then it takes only those posts) 
    return categoryFilter; //if it is true, the post goes into filteredProducts
  }).sort((a, b) => {
    if (selectedSort === 'name') {
      return a.name.localeCompare(b.name);
    } else if (selectedSort === 'price') {
      return a.prices.price - b.prices.price;
    }
    return 0;  //handle the case where the sorting criteria is not one of the expected values
  });

  const handleInfiniteScroll = useCallback(() => { // the function will only render on change setPage
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [setPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);

    // Cleanup: remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, [handleInfiniteScroll]);

  return (
    <div className="catalog">
    <div className="sorBottans">
    <div>
      <label htmlFor="category">Filter by Category: </label>
      <select id="category" value={selectedCategory} onChange={(e) => filterByCategory(e.target.value)}>
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
           {category}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label htmlFor="sort">Sort by: </label>
      <select id="sort" value={selectedSort} onChange={(e) => sortBy(e.target.value)}>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
    </div>
    </div>

    <InfiniteScroll
      dataLength={filteredProducts.length} next={handleInfiniteScroll}
      hasMore={true} loader={<h4>Loading...</h4>}
    >
      <ul className="posts">
        {filteredProducts.map((post) => (
          <CatalogItem key={post.id} post={post} />
        ))}
      </ul>
    </InfiniteScroll>
  </div>
  );
};

export default Catalog;




