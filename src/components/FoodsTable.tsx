import { Food } from "../services/fakeFoodService";
import TableBody from "./TableBody";
import TableHeader, { column } from "./TableHeader";

export interface SortColumn {
  path: string;
  order: "asc" | "desc";
}

interface Props {
  foods: Food[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
  onDelete(id: string): void;
  onFavor(id: string): void;
}

function FoodsTable({ foods, sortColumn, onDelete, onFavor, onSort }: Props) {
  const columns: column[] = [
    { path: "name", label: "Name" },
    { path: "category.name", label: "Category" },
    { path: "price", label: "Price" },
    { path: "numberInStock", label: "Stock" },
    { key: "favorite" },
    { key: "delete" },
  ];
  return (
    <table className="table">
      <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
      <TableBody
        columns={columns}
        foods={foods}
        onDelete={onDelete}
        onFavor={onFavor}
      />
    </table>
  );
}

export default FoodsTable;
