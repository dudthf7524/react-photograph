import { ListGroup, Pagination} from 'react-bootstrap';
import '../.././css/list.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function List() {
    
  const [lists, setLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`/api/list?page=${currentPage}`)
      .then((response) => {
        setLists(response.data.posts); // 서버 응답에서 게시물 목록 설정
        setTotalPages(response.data.totalPages); // 전체 페이지 수 설정
      })
      .catch((error) => {
        console.error("Error fetching list:", error); // 에러 처리
      });
  }, [currentPage]); // 페이지가 변경될 때마다 데이터를 새로 요청


  
  // 페이지 변경 처리 함수
  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePaginationChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
    
    return (
        <>
            <div id="background-container">
                <div id="background-text">Welcome to PHOTOGRAPH-ZONE</div>
            </div>
            <div id="list">
                <ListGroup id="listgroup">
                    {
                        lists.map((list, index) => (
                            <ListGroup.Item key={index}>
                                <a href={`/post/detail/${list._id}`}>
                                    <h4>{list.title}</h4>
                                </a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                </svg>
                                <p id="writerid">
                                    {list.writerInfo.nickname} <span id="category">{list.category}</span>
                                </p>
                               
                               
                              
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
                <Pagination>
                <Pagination.First onClick={() => handlePaginationChange(1)} />
                <Pagination.Prev
                    onClick={() => handlePaginationChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {items}
                <Pagination.Next
                    onClick={() => handlePaginationChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
                <Pagination.Last onClick={() => handlePaginationChange(totalPages)} />
                </Pagination>
                
            </div>
        </>
    );
}

export default List;
