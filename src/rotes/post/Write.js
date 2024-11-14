import { Button, Form } from "react-bootstrap";
import '../.././css/write.css';
import axios from "axios";

function Write(){
    const write = async (e)=>{
        e.preventDefault();

        const form = document.querySelector(".writeForm");
        const formData = new FormData(form);
    
        try {
            // axios로 데이터 전송
            const response = await axios.post("/post/write", formData);
            if (response.status === 200) {
              alert("포스팅 완료");
              window.location.href = "/post/list";
            }
          } catch (error) {
            console.error("등록 실패:", error);
            alert("포스팅 실패, 다시 시도하세요.");
          }
    }
    return(
        <div id="write">
            <Form id="title" className="writeForm" encType="multipart">
                <Form.Group  className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Post 카테고리</Form.Label>
                    <Form.Select name="category" aria-label="Default select example">
                    <option disabled selected>select 카테고리</option>
                    <option value="Landscape & Cityscape">Landscape & Cityscape (자연과 도시 풍경)</option>
                    <option value="Nature & Wildlife">Nature & Wildlife (자연과 야생의 삶)</option>
                    <option value="Black & White">Black & White (흑백)</option>
                    <option value="Macro Photography">Macro Photography (매크로 사진)</option>
                    <option value="People">People (사람들)</option>
                    <option value="Photo of the Day">Photo of the Day (오늘의 사진)</option>
                </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Post 제목</Form.Label>
                    <Form.Control name="title" id="title" type="email" placeholder="Post 제목을 입력해주세요" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Post 내용</Form.Label>
                    <Form.Control name="content" id="content" as="textarea" rows={3} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Photo 파일</Form.Label>
                    <Form.Control type="file" name="img" accept="image/*" rows={3} />
                </Form.Group>
                <br></br>
                <div className="d-grid gap-2">
                <Button onClick={write} variant="dark" >Posting</Button>
                </div>
            </Form>
        </div>
    )
}
export default Write;