import React from "react";
import Card from "../components/Card";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorites,
  onAddToCart,
  isLoading
}) {

  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        loading={isLoading}
        key={index}
        onFavorite={(obj) => onAddToFavorites(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex justify-center">
          <img className="search-icon" src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear c-up"
              src="/img/cancel-btn.svg"
              alt="cancel"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск ..."
            className="search"
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
