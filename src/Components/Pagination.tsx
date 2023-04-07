import React, { useState } from "react";
import Paginate from "react-paginate";



const PaginationExample = () => {
const ITEMS_PER_PAGE = 4;
const TOTAL_ITEMS = 12;

const items = Array.from(Array(TOTAL_ITEMS).keys()).map(
  (index) => `Item ${index + 1}`
);


  const [currentPage, setCurrentPage] = useState<number>(0);

  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

const ItemList = () => {
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const itemsToDisplay = items.slice(startIndex, endIndex);

  return (
    <div>
      {itemsToDisplay.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};

  return (
    <div className="d-flex align-items-center flex-column my-4">
      <ItemList />
      <Paginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export { PaginationExample }