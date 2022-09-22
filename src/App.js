import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import unsplash from "./api";
import PhotoList from "./components/PhotoList.js/PhotoList";
import SearchBar from "./components/SearchBar/SearchBar";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [isLoaded, setIsloaded] = useState({status : true});
  const [resultList, setResultList] = useState([]);

  const handleChangeSearch = (event) => {
    const { value } = event.target;
    setSearchText(value);
  };

  const fetchData = () => {
    if (searchText) {
      setIsloaded({status : false});
      unsplash.search
      .getPhotos({
        query: searchText,
        page: 1,
        perPage: 30,
      })
      .then((response) => {
        setResultList(response.response.results);
        setIsloaded({status : true});
      });
    } else {
      setResultList([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 800);

    return () => clearTimeout(timer);
  }, [searchText]);

  if (!isLoaded.status) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

console.log(resultList)
  return (
    <div className="App">
      <h1 className="brand">Unsplash API</h1>
      <SearchBar value={searchText} onChange={handleChangeSearch} />
      {resultList.length > 0 ? <PhotoList photoList={resultList} /> : (
          <h3>No data found.</h3>
        )}
    </div>
  );
}
