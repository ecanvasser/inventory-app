import { AiOutlineSearch } from "react-icons/ai";
import { IconContext } from "react-icons";

const InventoryFilters = ({
  makes,
  makeFilter,
  categories,
  categoryFilter,
  search,
  handleSearch,
  handleMakeFilter,
  handleCategoryFilter,
}) => {
  return (
    <div
      id="filters-container"
      className="flex flex-col sm:flex-row gap-4 mt-10 items-center"
    >
      <div id="search-bar" className="flex items-center gap-2">
        <IconContext.Provider value={{ size: "1.8em" }}>
          <AiOutlineSearch />
        </IconContext.Provider>
        <input
          className="p-1 border rounded"
          placeholder="Product Name"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="flex gap-8">
        <div id="makes-filter">
          <label className="font-bold text-lg flex items-center gap-2">
            Make:
            <select id="makes" defaultValue={makeFilter} className="border rounded p-1" onChange={handleMakeFilter}>
            <option>-</option>
            {makes.map((make, i) => {
              return <option value={make.name} key={i}>{make.name}</option>;
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
            defaultValue={categoryFilter}
            onChange={handleCategoryFilter}
          >
            <option>-</option>
            {categories.map((obj, i) => {
              return <option value={obj.name} key={i}>{obj.name}</option>;
            })}
          </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default InventoryFilters;
