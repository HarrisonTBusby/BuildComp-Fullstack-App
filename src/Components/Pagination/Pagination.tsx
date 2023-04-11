import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Paginate from "react-paginate";
import { GetRandomUserData } from "../../Services/DataService";

const PaginationExample = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const ITEMS_PER_PAGE = 6;
  
  let size = data.length;
  const TOTAL_ITEMS = size;

  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const ItemList = () => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const itemsToDisplay = data.slice(startIndex, endIndex);

    return (
      <div className="cards">
        {itemsToDisplay.map((item: any, index) => (
          <div key={index}>
            <Card style={{ width: '16rem', height: '100%'}}>
              <Card.Img variant="top" src={item.picture.medium} />
              <Card.Body>
                <Card.Title>{item.name.first} {item.name.last}</Card.Title>
                <Card.Text>
                  <p>{item.cell}</p>
                  <p>{item.email}</p>
                  <h2>{item.location.country}</h2>
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    );
  };

  

  const getData = async () => {
    let data = await GetRandomUserData();
    setData(data.results);
    // console.log(data.results)
  }

  useEffect(() => {
    getData();
    
  }, [])


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