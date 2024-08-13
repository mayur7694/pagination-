import React, { useEffect, useState } from 'react';

const Pagination = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      setUserData(data);
    };
    
    fetchApi();
  }, []);

  const totalPages = Math.ceil(userData.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = userData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {itemsToDisplay.map((item,i )=> (
        <h3 key={item.id}>{item.id}. {item.title}</h3>
      ))}
      
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        style={{color:"red"}}>
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => (
          <button className='m-3'
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            disabled={i + 1 === currentPage}
          >
            {i + 1}
          </button>
        ))}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
