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
    <div id="filters-container" className="flex gap-8 mt-10 items-center">
      <div id="makes-filter">
        <label className="font-bold text-lg mr-2">Vehicle Make:</label>
        <select id="makes" className="border p-1" onChange={handleMakeFilter}>
          <option>-</option>
          {makes.map((make, i) => {
            return <option key={i}>{make.name}</option>;
          })}
        </select>
      </div>
      <div id="category-filter">
        <label className="font-bold text-lg mr-2">Category:</label>
        <select
          id="categories"
          className="border p-1 pr-10"
          onChange={handleCategoryFilter}
        >
          <option>-</option>
          {categories.map((obj, i) => {
            return <option key={i}>{obj.name}</option>;
          })}
        </select>
      </div>
      <div id="search-bar" className="flex items-center gap-2 ml-5">
        <IconContext.Provider value={{ size: "1.8em" }}>
          <AiOutlineSearch />
        </IconContext.Provider>
        <input
          className="p-1 border rounded"
          placeholder="Product Name"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default InventoryFilters;
