import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Paginate from "react-paginate";



const PaginationExample = () => {
  const ITEMS_PER_PAGE = 6;
  const TOTAL_ITEMS = 24;

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
      <div className="cards">
        {itemsToDisplay.map((item, index) => (
          <div key={index}>
            <Card style={{ width: '16rem' }}>
              <Card.Img variant="top" src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51c1zFDNVmL._AC_SX679_.jpg" />
              <Card.Body>
                <Card.Title>Item #{item}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="">
      <ItemList />
      <div className="d-flex justify-content-center mt-4">
      <Paginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active-page"}
      />
      </div>
    </div>
  );
};

export { PaginationExample }