import Navbar from "./Navbar";
import "animate.css";
import InventoryTile from "./InventoryTile";
import InventoryFilters from "./InventoryFilters";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarLinks from "./NavbarLinks";
import VerticalNav from "./VerticalNav";

const Inventory = () => {
  const [products, setProducts] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [makes, setMakes] = useState();
  const [makeFilter, setMakeFilter] = useState();
  const [categoryFilter, setCategoryFilter] = useState();
  const [search, setSearch] = useState();
  const [categories, setCategories] = useState();
  const [err, setError] = useState();
  const [showLinks, setShowLinks] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch all product data for inventory grid
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products/");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchProducts();
  }, []);

  // Fetch all vehicle makes for inventory filters
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch("http://localhost:8000/makes/");
        const data = await response.json();
        setMakes(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchMakes();
  }, []);

  // Fetch all product categories for inventory filters
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/product-categories/"
        );
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchCategories();
  }, []);

  // Handles filter logic on inventory display
  useEffect(() => {
    if (products) {
      const filterArray = products.filter((obj) => {
        if (obj.make === makeFilter && obj.category === categoryFilter) {
          return obj;
        } else if (
          obj.make === makeFilter &&
          (categoryFilter === "-" || categoryFilter === undefined)
        ) {
          return obj;
        } else if (
          obj.category === categoryFilter &&
          (makeFilter === "-" || makeFilter === undefined)
        ) {
          return obj;
        }
      });
      setFilteredProducts(filterArray);
    }
  }, [makeFilter, categoryFilter]);

  // Search bar functionality
  useEffect(() => {
    if (filteredProducts.length > 0) {
      const searchArray = filteredProducts.filter((obj) => {
        if (obj.name.toLowerCase().includes(search)) {
          return obj;
        }
      });
      if (search === "") {
        setSearchProducts([]);
      } else {
        setSearchProducts(searchArray);
      }
    } else if (products) {
      const searchArray = products.filter((obj) => {
        if (obj.name.toLowerCase().includes(search)) {
          return obj;
        }
      });
      if (search === "") {
        setSearchProducts([]);
      } else {
        setSearchProducts(searchArray);
      }
    }
  }, [search]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selectMakeFilter = (e) => {
    setMakeFilter(e.target.value);
  };

  const selectCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
  };

  const searchValue = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  if (searchProducts.length > 0) {
    return (
      <div
        id="inventory-container"
        className="grid grid-rows-[0.3fr_1.7fr] h-screen"
      >
        {showLinks ? (
          <>
            <Navbar
              handleNav={() => {
                setShowLinks(!showLinks);
              }}
            />
            <div className="flex flex-col items-center gap-10 animate__animated animate__fadeInRight">
              <NavbarLinks />
            </div>
          </>
        ) : isMobile ? (
          <div
            id="inventory-container"
            className="grid grid-rows-[0.3fr_1.7fr] h-screen"
          >
            <Navbar
              handleNav={() => {
                setShowLinks(!showLinks);
              }}
            />
            <div id="products" className="flex flex-col pb-16 items-center">
              <div className="text-4xl font-extrabold">Inventory</div>
              <InventoryFilters
                makes={makes}
                categories={categories}
                search={search}
                makeFilter={makeFilter}
                categoryFilter={categoryFilter}
                handleMakeFilter={selectMakeFilter}
                handleCategoryFilter={selectCategoryFilter}
                handleSearch={searchValue}
              />
              <div id="product-filters" className="flex"></div>
              <div
                id="product-rows"
                className="mt-16 w-11/12 grid grid-cols-1 gap-4"
              >
                {searchProducts.map((obj, i) => {
                  return (
                    <Link to={`/inventory/${obj._id}`}>
                      <InventoryTile data={obj} key={obj._id} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div
            id="inventory-container"
            className="grid grid-cols-[0.4fr_1.5fr] h-screen"
          >
            <VerticalNav />
            <div className="flex flex-col md:my-16 items-center">
              <div>
                <div className="text-4xl font-extrabold">Inventory</div>
                <InventoryFilters
                  makes={makes}
                  categories={categories}
                  search={search}
                  makeFilter={makeFilter}
                  categoryFilter={categoryFilter}
                  handleMakeFilter={selectMakeFilter}
                  handleCategoryFilter={selectCategoryFilter}
                  handleSearch={searchValue}
                />
                <div id="product-filters" className="flex"></div>
                <div
                  id="product-rows"
                  className="mt-16 w-[900px] grid grid-cols-1 gap-4"
                >
                  {searchProducts.map((obj, i) => {
                    return (
                      <Link to={`/inventory/${obj._id}`}>
                        <InventoryTile data={obj} key={obj._id} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (filteredProducts.length > 0) {
    return (
      <div
        id="inventory-container"
        className="grid grid-rows-[0.3fr_1.7fr] h-screen"
      >
        {showLinks ? (
          <>
            <Navbar
              handleNav={() => {
                setShowLinks(!showLinks);
              }}
            />
            <div className="flex flex-col items-center gap-10 animate__animated animate__fadeInRight">
              <NavbarLinks />
            </div>
          </>
        ) : isMobile ? (
          <div
            id="inventory-container"
            className="grid grid-rows-[0.3fr_1.7fr] h-screen"
          >
            <Navbar
              handleNav={() => {
                setShowLinks(!showLinks);
              }}
            />
            <div id="products" className="flex flex-col pb-16 items-center">
              <div className="text-4xl font-extrabold">Inventory</div>
              <InventoryFilters
                makes={makes}
                categories={categories}
                handleSearch={searchValue}
                makeFilter={makeFilter}
                categoryFilter={categoryFilter}
                handleMakeFilter={selectMakeFilter}
                handleCategoryFilter={selectCategoryFilter}
              />
              <div id="product-filters" className="flex"></div>
              <div
                id="product-rows"
                className="mt-16 w-11/12 grid grid-cols-1 gap-4"
              >
                {filteredProducts.map((obj, i) => {
                  return (
                    <Link to={`/inventory/${obj._id}`}>
                      <InventoryTile data={obj} key={obj._id} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div
            id="inventory-container"
            className="grid grid-cols-[0.4fr_1.5fr] h-screen"
          >
            <VerticalNav />
            <div id="products" className="flex flex-col md:my-16 items-center">
              <div>
                <div className="text-4xl font-extrabold">Inventory</div>
                <InventoryFilters
                  makes={makes}
                  categories={categories}
                  handleSearch={searchValue}
                  makeFilter={makeFilter}
                  categoryFilter={categoryFilter}
                  handleMakeFilter={selectMakeFilter}
                  handleCategoryFilter={selectCategoryFilter}
                />
                <div
                  id="product-rows"
                  className="mt-16 w-[900px] grid grid-cols-1 gap-4"
                >
                  {filteredProducts.map((obj, i) => {
                    return (
                      <Link to={`/inventory/${obj._id}`}>
                        <InventoryTile data={obj} key={obj._id} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (products) {
    return (
      <div
        id="inventory-container"
        className="grid grid-rows-[0.3fr_1.7fr] h-screen"
      >
        {showLinks ? (
          <>
            <Navbar
              handleNav={() => {
                setShowLinks(!showLinks);
              }}
            />
            <div className="flex flex-col items-center gap-10 animate__animated animate__fadeInRight">
              <NavbarLinks />
            </div>
          </>
        ) : isMobile ? (
          <div
            id="inventory-container"
            className="grid grid-rows-[0.3fr_1.7fr] h-screen"
          >
            <Navbar
              handleNav={() => {
                setShowLinks(!showLinks);
              }}
            />
            <div id="products" className="flex flex-col pb-16 items-center">
              <div className="text-4xl font-extrabold">Inventory</div>
              <InventoryFilters
                makes={makes}
                categories={categories}
                handleSearch={searchValue}
                makeFilter={makeFilter}
                categoryFilter={categoryFilter}
                handleMakeFilter={selectMakeFilter}
                handleCategoryFilter={selectCategoryFilter}
              />
              <div id="product-filters" className="flex"></div>
              <div
                id="product-rows"
                className="mt-16 w-11/12 grid grid-cols-1 gap-4"
              >
                {products.map((obj, i) => {
                  return (
                    <Link to={`/inventory/${obj._id}`}>
                      <InventoryTile data={obj} key={obj._id} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div
            id="inventory-container"
            className="grid grid-cols-[0.4fr_1.5fr] h-screen"
          >
            <VerticalNav />
            <div id="products" className="flex flex-col my-16 items-center">
              <div>
                <div className="text-4xl font-extrabold">Inventory</div>
                <InventoryFilters
                  makes={makes}
                  categories={categories}
                  handleSearch={searchValue}
                  makeFilter={makeFilter}
                  categoryFilter={categoryFilter}
                  handleMakeFilter={selectMakeFilter}
                  handleCategoryFilter={selectCategoryFilter}
                />
                <div
                  id="product-rows"
                  className="mt-16 w-[900px] grid grid-cols-1 gap-4"
                >
                  {products.map((obj, i) => {
                    return (
                      <Link to={`/inventory/${obj._id}`}>
                        <InventoryTile data={obj} key={obj._id} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Inventory;
