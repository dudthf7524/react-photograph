import { Button, Form } from 'react-bootstrap';
import '../.././css/join.css';
import axios from 'axios';

function Login(){
    const login = async (e)=>{
    // 기본 폼 제출 방지
    e.preventDefault();
    document.getElementById("resultusername").innerHTML = "";
    document.getElementById("resultpassword").innerHTML = "";
    if(document.loginform.username.value ===''){
        document.getElementById("resultusername").innerHTML = "아이디를 입력해주세요";
        document.loginform.username.focus();
        return;
    }
    const usernameRegex = /^[a-zA-Z0-9]{7,15}$/;
    if (!usernameRegex.test(document.loginform.username.value)) {
        document.getElementById("resultusername").innerHTML = "아이디는 영문과 숫자 조합으로 7~15자리로 입력해주세요";
        document.loginform.username.focus();
        return;
    }
    if(document.loginform.password.value ===''){
        document.getElementById("resultpassword").innerHTML = "비밀번호를 입력해주세요";
        document.loginform.password.focus();
        return;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
    if (!passwordRegex.test(document.loginform.password.value)) {
        document.getElementById("resultpassword").innerHTML = "비밀번호는 영문, 숫자, 특수문자를 포함하여 8~20자리로 입력해주세요";
        document.loginform.password.focus();
        return;
    }
    const form = document.querySelector(".loginform");
    const formData = new FormData(form);
    
    const data = {
        username: formData.get("username"),
        password: formData.get("password")
    };
    try {
        // axios로 데이터 전송
        const response = await axios.post("/user/login", data);
        if (response.status === 200) {
          alert("로그인이 완료되었습니다.");
          window.location.href = "/";
        }
      } catch (error) {
        console.error("등록 실패:", error);
        alert("로그인 실패, 다시 시도하세요.");
      }
    }

    return(
        <div id="join1">
            <div id='join2'>
                <h1 id='join-title'>로그인</h1>
            </div>

            <div id='joinform'>
            <Form name='loginform' className='loginform'>
               
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control name='username' type="text" placeholder="Enter id" />
                    <span id="resultusername"></span>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" />
                    <span id="resultpassword"></span>
                </Form.Group>
                <br></br>
                <div className="d-grid gap-2">
                <Button onClick={login} variant="dark" >로그인</Button>
                </div>
            </Form>
            </div>
        </div>
    )
}
export default Login;