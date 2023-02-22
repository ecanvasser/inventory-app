import { AiOutlineSearch } from "react-icons/ai";
import { IconContext } from "react-icons";

const InventoryFilters = ({
  makes,
  categories,
  search,
  handleSearch,
  handleMakeFilter,
  handleCategoryFilter,
}) => {
  return (
    <div
      id="filters-container"
      className="flex flex-col gap-4 mt-10 items-center justify-center"
    >
      <div id="search-bar" className="flex items-center gap-2">
        <IconContext.Provider value={{ size: "1.8em" }}>
          <AiOutlineSearch />
        </IconContext.Provider>
        <input
          className="p-1 border rounded"
          placeholder="Product Name"
          onChange={handleSearch}
        />
      </div>
      <div className="flex gap-8">
        <div id="makes-filter">
          <label className="font-bold text-lg flex items-center gap-2">
            Make:
            <select id="makes" className="border rounded p-1" onChange={handleMakeFilter}>
            <option>-</option>
            {makes.map((make, i) => {
              return <option key={i}>{make.name}</option>;
            })}
          </select>
          </label>
          
        </div>
        <div id="category-filter">
          <label className="font-bold flex items-center gap-2 text-lg">
            Category:
            <select
            id="categories"
            className="border rounded p-1 pr-10"
            onChange={handleCategoryFilter}
          >
            <option>-</option>
            {categories.map((obj, i) => {
              return <option key={i}>{obj.name}</option>;
            })}
          </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default InventoryFilters;
