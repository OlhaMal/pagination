import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

export const App = () => {
  const baseUrl = 'https://64f388a0edfa0459f6c6a66a.mockapi.io';
  const endpoint = '/projects';
  const [data, setData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const limit = 3;

  useEffect(() => {
    axios
      .get(baseUrl + endpoint)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was a problem with the Axios GET request:', error);
        setData(null);
      });
  }, []);

  useEffect(() => {
    if (data) {
      const startIndex = currentPage * limit;
      const endIndex = startIndex + limit;
      setProjects(data.slice(startIndex, endIndex));
    }
  }, [currentPage, data]);

  const handlePageClick = event => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
    scrollToTop();
  };

  return (
    <div className="container">
      <div className="image-list">
        {projects &&
          projects.map(project => (
            <div key={project.id} className="image-wrapper">
              <img
                src={project.small_img}
                className="image"
                alt={`${project.name} small`}
              />
              <p style={{ textAlign: 'center' }}>{project.name}</p>
            </div>
          ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={Math.ceil(data?.length / limit)}
        previousLabel="<"
        forcePage={currentPage}
        renderOnZeroPageCount={null}
        containerClassName="paginationContainer"
        activeClassName="activePage"
        pageClassName="paginationItem"
        previousClassName="paginationItem"
        nextClassName="paginationItem"
      />
    </div>
  );
};
