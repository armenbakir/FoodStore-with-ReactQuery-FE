import _ from "lodash";
import { useState } from "react";
import { paginate } from "@utils";
import { FoodsTable } from "@components";
import { Category, Food, SortColumn } from "@types";
import { ListGroup, Pagination, SearchBox } from "@components/common";
import { getCategories, getFoods } from "@services";

const DEFAULT_CATEGORY: Category = { _id: "", name: "All categories" };
const DEFAULT_SORT_COLUMN: SortColumn = { path: "name", order: "asc" };
const PAGE_SIZE = 4;
function FoodsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [foods, setFoods] = useState(getFoods());
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [sortColumn, setSortColumn] = useState(DEFAULT_SORT_COLUMN);

  function handleDelete(id: string) {
    const newFoods = foods.filter((food) => food._id !== id);
    setFoods(newFoods);
  }

  function handleFavor(id: string) {
    const newFoods = foods.map((food) => {
      if (food._id === id) {
        food.isFavored = !food.isFavored;
      }
      return food;
    });
    setFoods(newFoods);
  }

  function handleCategorySelect(category: Category) {
    setSelectedCategory(category);
    setSelectedPage(1);
    setSearchQuery("");
  }

  function handleSearch(value: string) {
    setSearchQuery(value);
    setSelectedCategory(DEFAULT_CATEGORY);
  }

  if (foods.length === 0) return <p>There are no foods in the database</p>;

  let filteredFoods = foods;

  if (searchQuery) {
    filteredFoods = foods.filter((food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else if (selectedCategory._id) {
    filteredFoods = foods.filter(
      (food) => food.category._id === selectedCategory._id
    );
  }

  const sortedFoods = _.orderBy(
    filteredFoods,
    sortColumn.path,
    sortColumn.order
  );

  const paginatedFoods = paginate(sortedFoods, PAGE_SIZE, selectedPage);

  return (
    <div className="row container pt-3">
      <div className="col-3">
        <ListGroup
          items={[DEFAULT_CATEGORY, ...getCategories()]}
          selectedItem={selectedCategory}
          onItemSelect={handleCategorySelect}
        />
      </div>
      <div className="col">
        <p>Showing {filteredFoods.length} foods in the database</p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <FoodsTable
          foods={paginatedFoods}
          sortColumn={sortColumn}
          onDelete={handleDelete}
          onFavor={handleFavor}
          onSort={setSortColumn}
        />
        <Pagination
          totalCount={filteredFoods.length}
          pageSize={PAGE_SIZE}
          selectedPage={selectedPage}
          onPageSelect={setSelectedPage}
        />
      </div>
    </div>
  );
}

export default FoodsPage;
