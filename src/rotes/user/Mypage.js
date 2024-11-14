import { Button, Form, Navbar } from 'react-bootstrap';
import '../.././css/join.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Mypage(){
 const [user, setUser] = useState(null);
 useEffect(() => {
    axios
      .get('/user/mypage/auth')
      .then((response) => {
        setUser(response.data); // Set the users state with the response data
      })
      .catch((error) => {
        console.error("Error fetching users:", error); // Handle errors
      });
  }, []);
    
   const Edit = async (e)=> {
    window.location.href = "/user/edit"
    
   }

    const userDelete = async (e)=> {
    const confirmation = window.confirm('삭제시 포스트가 삭제됩니다. 삭제 후 복원 불가능합니다.')
    if(confirmation){
        try {
            // axios로 데이터 전송
            const response = await axios.delete("/user/delete");
            if (response.status === 200) {
                alert("회원탈퇴가 완료되었습니다.");
                window.location.href = "/user/logout";
            }
        } catch (error) {
            // 백엔드에서 게시물이 있어 탈퇴 불가 메시지를 보낸 경우
            if (error.response && error.response.status === 400) {
                alert("게시물이 있어 회원탈퇴를 할 수 없습니다.");
                window.location.href = "/user/mypage";
            } else {
                console.error("회원 탈퇴 실패:", error);
                alert("회원 탈퇴 실패, 다시 시도하세요.");
            }
        }
        
    }
   
    
   }
    return(
        <div id="join1">
            <div id='join2'>
                <h1 id='join-title'>내 정보</h1>
            </div>
            <div id='joinform'>
            <Form name='joinform' className="joinform">
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>이름</Form.Label>
                    <Form.Control name='nickname' type="text" placeholder="Enter name" value={user?.nickname || ""} />
                    <span id="resultnickname"></span>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control name='username' type="text" placeholder="Enter id" value={user?.username || ""} />
                    <span id="resultusername"></span>
                </Form.Group>
                <br></br>
                <div className="d-grid gap-2">
                <Button className='title' onClick={Edit} variant="warning" >내 정보 수정</Button>
                <Button className='title' onClick={userDelete} variant="danger" >회원탈퇴</Button>
                </div>
            </Form>
            </div>
        </div>
    );
}

export default Mypage;