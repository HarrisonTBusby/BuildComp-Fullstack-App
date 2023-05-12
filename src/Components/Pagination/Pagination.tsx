import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Paginate from "react-paginate";
import { GetRandomUserData } from "../../Services/DataService";
import { PeopleAPIResponse, PeopleData } from "../../Services/DataService";

const PaginationExample = () => {

  const [sort, setSort] = useState('unsorted');
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState<PeopleData[]>([]);
  const [sortedData, setSortedData] = useState<PeopleData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  
  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const ITEMS_PER_PAGE = 6;
  
  let size = sortedData.length;
  const TOTAL_ITEMS = size;

  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  const ItemList = ({sortedData}: any) => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const itemsToDisplay = sortedData.slice(startIndex, endIndex);

    return (
      <div className="cards">
        {itemsToDisplay.map((item: any, index: number) => (
          <div key={index}>
            <Card style={{ width: '16rem', height: '100%'}}>
              <Card.Img variant="top" src={item.picture.medium} />
              <Card.Body>
                <Card.Title>{item.firstName} {item.lastName}</Card.Title>
                <div>
                  <div>{item.cell}</div>
                  <div>{item.email}</div>
                  <div>{item.location.country}</div>
                </div>
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
    setData(data.data);
    setSortedData(data.data);
  }

  useEffect(() => {
    getData();
    
  }, [])

  const sortAlphabetically = () => {
    const newData = [...sortedData].sort((a, b) => {
      if (a.name.first < b.name.first) {
        if(sort === 'unsorted'){
          return -1;
        }
        if(sort === 'ascending'){
          return 1;
        }
      }

      if (a.name.first > b.name.first) {
        if(sort === 'unsorted'){
          return 1;
        }
        if(sort === 'ascending'){
          return -1;
        }
      }
      return 0;
    });

    setSortedData(newData);
    if(sort === 'unsorted'){
      setSort('ascending');
    }
    if(sort === 'ascending'){
      setSort('descending');
    }
    if(sort === 'descending'){
      setSortedData(data);
      setSort('unsorted')
    }
  };

  const sortByPrice = (minPrice: number, maxPrice: number, data: any) => {
    const newData = [...data].sort((a, b) => {
      if (a.name.first < b.name.first) {
        if(sort === 'unsorted'){
          return -1;
        }
        if(sort === 'ascending'){
          return 1;
        }
      }

      if (a.name.first > b.name.first) {
        if(sort === 'unsorted'){
          return 1;
        }
        if(sort === 'ascending'){
          return -1;
        }
      }
      return 0;
    });
  }

  const handleSearch = (input: string) => {

    // const ByName = (input: any) => {
    //   return (obj: any) => obj.gender === input;
    // }

    // const result = data.filter(ByName(input));
    setSearchInput(input);
    const filteredData = data.filter((item) => {
      // Convert the item object to a string and check if it contains the search term
      const itemString = JSON.stringify(item).toLowerCase();
      return itemString.includes(input.toLowerCase());
      
    });
    setSortedData(filteredData);
    
  }

  return (
    <div className="">
      <input onChange={(e) => handleSearch(e.target.value)} placeholder="search"></input>
      <button>Search</button>
      <button onClick={sortAlphabetically}>Sort Alphabetically</button>
      <ItemList sortedData={sortedData}/>
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