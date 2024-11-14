import { Button, Form } from 'react-bootstrap';
import '../.././css/join.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function UserEdit(){
    const edit = async (e)=> {

        // 기본 폼 제출 방지
       e.preventDefault();
   
           // 경고 문구 초기화
           document.getElementById("resultnickname").innerHTML = "";
           document.getElementById("resultusername").innerHTML = "";
           document.getElementById("resultpassword").innerHTML = "";
           document.getElementById("resultpasswordChk").innerHTML = "";
   
       if(document.joinform.nickname.value ===''){
           document.getElementById("resultnickname").innerHTML = "이름을 입력해주세요";
           document.joinform.nickname.focus();
           return;
       }
       const nameRegex = /^[가-힣]+$/;
       if (!nameRegex.test(document.joinform.nickname.value)) {
           document.getElementById("resultnickname").innerHTML = "이름을 올바르게 입력해주세요";
           document.joinform.nickname.focus();
           return;
       }
       if(document.joinform.username.value ===''){
           document.getElementById("resultusername").innerHTML = "아이디를 입력해주세요";
           document.joinform.username.focus();
           return;
       }
       const usernameRegex = /^[a-zA-Z0-9]{7,15}$/;
       if (!usernameRegex.test(document.joinform.username.value)) {
           document.getElementById("resultusername").innerHTML = "아이디는 영문과 숫자 조합으로 7~15자리로 입력해주세요";
           document.joinform.username.focus();
           return;
       }
       if(document.joinform.password.value ===''){
           document.getElementById("resultpassword").innerHTML = "비밀번호를 입력해주세요";
           document.joinform.password.focus();
           return;
       }
       const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
       if (!passwordRegex.test(document.joinform.password.value)) {
           document.getElementById("resultpassword").innerHTML = "비밀번호는 영문, 숫자, 특수문자를 포함하여 8~20자리로 입력해주세요";
           document.joinform.password.focus();
           return;
       }
       if(document.joinform.passwordChk.value ===''){
           document.getElementById("resultpasswordChk").innerHTML = "비밀번호 확인을 입력해주세요";
           document.joinform.passwordChk.focus();
           return;
       }
       if (document.joinform.passwordChk.value !== document.joinform.password.value) {
           document.getElementById("resultpasswordChk").innerHTML = "비밀번호가 일치하지 않습니다";
           document.joinform.passwordChk.focus();
           return;
       }
   
       const form = document.querySelector(".joinform");
       const formData = new FormData(form);
       
       const data = {
           nickname: formData.get("nickname"),
           username: formData.get("username"),
           password: formData.get("password")
       };
       try {
           // axios로 데이터 전송
           const response = await axios.put("/api/user/edit", data);
           if (response.status === 200) {
             alert("내 정보가 수정되었습니다.");
             window.location.href = "/user/logout";
           }
         } catch (error) {
           console.error("수정 실패:", error);
           alert("수정 실패, 다시 시도하세요.");
         }
      }
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
  
    return(
        <div id="join1">
            <div id='join2'>
                <h1 id='join-title'>내 정보 수정</h1>
            </div>

            <div id='joinform'>
            <Form name='joinform' className="joinform">
            <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>이름</Form.Label>
            <Form.Control name='nickname' type="text" placeholder="Enter name" defaultValue={user?.nickname || ""} />
            <span id="resultnickname"></span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>아이디</Form.Label>
                <Form.Control name='username' type="text" placeholder="Enter id" value={user?.username || ""} readOnly/>
                <span id="resultusername"></span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" defaultValue={user?.password || ""}/>
                <span id="resultpassword"></span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>비밀번호 확인</Form.Label>
                <Form.Control name='passwordChk' type="password" placeholder="Enter password" />
                <span id="resultpasswordChk"></span>
            </Form.Group>
               
            <br></br>
            <div className="d-grid gap-2">
                <Button className='title' onClick={edit} variant="warning" >내 정보 수정</Button>
            </div>
            </Form>
            </div>
        </div>
    );
}

export default UserEdit;