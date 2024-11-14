import logo from './logo.svg';
import './App.css';
import { Button, Card, Carousel, Col, Container, Form, Nav, Navbar, NavDropdown, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Join from './rotes/user/Join';
import Login from './rotes/user/Login';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Write from './rotes/post/Write';

import Detail from './rotes/post/Detail';
import List from './rotes/post/List';
import MyList from './rotes/post/MyList';
import Edit from './rotes/post/Edit';
import Delete from './rotes/post/Delete';
import Mypage from './rotes/user/Mypage';
import UserEdit from './rotes/user/UserEdit';
import Category from './rotes/post/Category';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState();
  useEffect(() => {
    axios
      .get('/user/auth')
      .then((response) => {
        setUser(response.data); // Set the users state with the response data
      })
      .catch((error) => {
        console.error("Error fetching users:", error); // Handle errors
      })
      .finally(() => {
        setLoading(false); // 로딩 완료 시 상태 업데이트
      });
    axios
      .get('/api/post/new')
      .then((response) => {
        setLists(response.data); // Set the users state with the response data
      })
      .catch((error) => {
        console.error("Error fetching users:", error); // Handle errors
      });
       
  }, []);
  if (loading) {
    return <div></div>; // 로딩 중일 때 표시할 내용
  }
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>

       
        <Navbar.Brand href="/" id='title' className="mx-auto title">PTZ</Navbar.Brand>
        
        
        <Navbar.Brand >{user ? `사진작가 ${user.nickname}님 환영합니다!` : 'Log-In'} </Navbar.Brand>
        
        {/* 화면이 작아졌을 때 토글 버튼 */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" id='toggle'/>

        {/* 오른쪽 정렬된 Nav 링크 (화면이 작아지면 토글 버튼 안에 들어감) */}
        <Navbar.Collapse id="basic-navbar-nav"  className="justify-content-end">
          <Nav>
            {/* 로그인 전 상태 */}
            {!user ? (
              <>
                <Nav.Link href="/user/join">회원가입</Nav.Link>
                <Nav.Link href="/user/login">로그인</Nav.Link>
              </>
            ) : (
              // 로그인 후 상태
              <>
                <Nav.Link href="/user/mypage">내정보</Nav.Link>
                <Nav.Link href="/post/write">포스팅하기</Nav.Link>
                <Nav.Link href="/user/logout">로그아웃</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Categories</Nav.Link>
            <Nav.Link href="/post/list">All Posts</Nav.Link>
            <Nav.Link href="/post/mylist">My Posts</Nav.Link>
          </Nav>
          <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button   variant="dark" type="submit">검색</Button>
          </Col>
        </Row>
      </Form>
        </Container>
      </Navbar>
      
      <Routes>
        <Route path="/" element={ 
          <>
            <div id="background-container">
        <div id="background-text">Welcome to PHOTOGRAPH-ZONE</div>
      </div>

      <div id='box'>
    <Row>
    <Col>
    <div className='custom-card'>
    <Card style={{ width: '458px' }}>
      <a href ="/post/category/Landscape & Cityscape">
      <Card.Img className='img' variant="top" src="img/gEVeMdQ2KRmCyvnpfYBZbY.jpg" />
      </a>
      <Card.Body>
      <a href ="/post/category/Landscape & Cityscape">
        <Card.Title>Landscape & Cityscape (자연과 도시 풍경)</Card.Title>
      </a>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    </Col>

    <Col>
    <div className='custom-card' >
    <Card style={{width: '458px' }}>
    <a href ="/post/category/Nature & Wildlife">
      <Card.Img className='img' variant="top" src="/img/Y3qdxuqYV3ocE-PbKQi2MdYpSt0Sxp33kryYz8GmAblDKKeGGt2cbii55RFWc0ppYx7eLrhLEi2XD9ZR4tfjcg.webp" />
    </a>
      <Card.Body>
      <a href ="/post/category/Nature & Wildlife">
        <Card.Title>Nature & Wildlife (자연과 야생의 삶)</Card.Title>
      </a>  
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    </Col>
    </Row>
    <br></br>
    <Row>
      <Col>
        <div className='custom-card'>
          <Card style={{ width: '458px' }}>
          <a href ="/post/category/Black & White">
            <Card.Img className='img' variant="top" src="img/Picture6_Compressed_637685250628475302.webp" />
          </a>  
            <Card.Body>
            <a href ="/post/category/Black & White">
              <Card.Title>Black & White (흑백)</Card.Title>
            </a>  
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
      </div>
      </Col>
      <Col>
       <div className='custom-card'>
      <Card style={{width: '458px'}}>
          <a href ="/post/category/Macro Photography">
            <Card.Img className='img' variant="top" src="img/다운로드.jpg" />
          </a>  
            <Card.Body>
            <a href ="/post/category/Macro Photography">
              <Card.Title>Macro Photography (매크로 사진)</Card.Title>
            </a>   
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
      </div>
      </Col>
     
    </Row>
    
    <br></br>
    
    <Row>
      <Col>
        <div className='custom-card'>
          <Card style={{ width: '458px' }}>
          <a href ="/post/category/People">
            <Card.Img className='img' variant="top" src="img/gettyimages-1420486889-612x612.jpg" />
          </a>    
            <Card.Body>
            <a href ="/post/category/People">
              <Card.Title>People (사람들)</Card.Title>
            </a>  
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
      </div>
      </Col>
      <Col>
       <div className='custom-card'>
      <Card style={{width: '458px'}}>
          <a href ="/post/category/Photo of the Day">
            <Card.Img className='img' variant="top" src="img/다운로드 (1).jpg" />
          </a>    
            <Card.Body>
            <a href ="/post/category/Photo of the Day">
              <Card.Title>Photo of the Day (오늘의 사진)</Card.Title>
            </a>    
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
      </div>
      </Col>
     
    </Row>
      </div>


    
    <div id='box2'>
    <h5 id='bottom'>New Posts</h5>
    <br></br>
      <Row>
        {
          (lists || []).map((list, index) => (
            <Col key = {index}>
            <div className='custom-card'>
            <Card>
            <Card.Header>{list.writerInfo.nickname}</Card.Header>
            <Card.Body>
              <a href={`/post/detail/${list._id}`}>
                <Card.Title>{list.title}</Card.Title>
              </a>
              <Card.Text>
                {list.category}
              </Card.Text>
              </Card.Body>
            </Card>
            </div>
        </Col>
          ))
        }
      </Row>
    </div>
        
          </> } />
       
   
      </Routes>

      
     

      
  <Routes>
    <Route path="/user">  
      <Route path="join" element={ <Join/> } />
      <Route path="login" element={ <Login/> } />
      <Route path="mypage" element={ <Mypage/> } />
      <Route path="edit" element={ <UserEdit/> } />
    </Route>
    <Route path="/post">  
      <Route path="write" element={ <Write/> } />
      <Route path="list" element={ <List/> } />
      <Route path="mylist" element={ <MyList/> } />
      <Route path="detail/:id" element={ <Detail/> } />
      <Route path="edit/:id" element={ <Edit/> } />
      <Route path="delete/:id" element={ <Delete/> } />
      <Route path="category/:id" element={ <Category/> } />
    </Route>
  </Routes>
  

  </>
  );
}

export default App;
