import { ListGroup, Pagination} from 'react-bootstrap';
import '../.././css/list.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Category() {
  const { id } = useParams();
  const [lists, setLists] = useState([]);
 

  useEffect(() => {
    axios
      .get(`/api/post/category/${id}`)
      .then((response) => {
        setLists(response.data); // 서버 응답에서 게시물 목록 설정
      })
      .catch((error) => {
        console.error("Error fetching list:", error); // 에러 처리
      });
  }, [id]); // id가 변경될 때마다 데이터를 새로 요청


  

  
    
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
                
            </div>
        </>
    );
}

export default Category;
