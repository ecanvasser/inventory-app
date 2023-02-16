const InventoryFilters = ({ makes, categories, handleMakeFilter }) => {
  return (
    <div id="filters-container" className="flex gap-8 mt-10">
      <div id="makes-filter">
        <label className="font-bold text-lg mr-2">
          Vehicle Make:
        </label>
        <select id="makes" className="border p-1" onChange={handleMakeFilter}>
          <option>-</option>
          {makes.map((make, i) => {
            return <option key={i}>{make.name}</option>;
          })}
        </select>
      </div>
      <div id="category-filter">
        <label className="font-bold text-lg mr-2">
          Category:
        </label>
        <select id="categories" className="border p-1 pr-10">
          <option>-</option>
          {categories.map((obj, i) => {
            return <option key={i}>{obj.name}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default InventoryFilters;
