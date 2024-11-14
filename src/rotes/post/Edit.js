import { Button, Card, Form } from "react-bootstrap";
import '../.././css/write.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Edit() {
    const { id } = useParams();
    const [post, setPost] = useState({
        category: "",
        title: "",
        content: "",
        img: null,
        imgUrl: "" // 기존 이미지 URL을 저장할 상태 추가
    });

    useEffect(() => {
        if (id) {
            axios.get(`/api/post/edit/${id}`)
                .then((response) => {
                    const data = response.data;
                    setPost({
                        ...data,
                        imgUrl: data.img // 기존 이미지 URL을 imgUrl에 저장
                    });
                })
                .catch((error) => {
                    console.error("Error fetching post:", error);
                    alert("게시물 로드 중 오류가 발생했습니다.");
                });
        }
    }, [id]);

    if (!post) return <div>Loading...</div>;

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // 이미지 파일이 있을 경우 상태 업데이트
        if (file) {
            setPost((prevPost) => ({
                ...prevPost,
                img: file // 파일 객체를 img에 설정
            }));

            // 파일 미리보기 설정
            const reader = new FileReader();
            reader.onloadend = () => {
                setPost((prevPost) => ({
                    ...prevPost,
                    imgUrl: reader.result // 미리보기 URL을 imgUrl에 저장
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const edit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("category", post.category);
        formData.append("title", post.title);
        formData.append("content", post.content);
        if (post.img) {
            formData.append("img", post.img); // img 파일 추가
        }

        try {
            const response = await axios.put(`/post/edit/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.status === 200) {
                alert("포스팅 완료");
                window.location.href = `/post/edit/${id}`;
            }
        } catch (error) {
            console.error("등록 실패:", error);
            alert("포스팅 실패, 다시 시도하세요.");
        }
    };
    

    return (
        <div id="write">
            <Form id='title' className="editForm" encType="multipart/form-data" onSubmit={edit}>
                <Form.Group  className="mb-3">
                    <Form.Label>Post 카테고리</Form.Label>
                    <Form.Select
                        name="category"
                        aria-label="Default select example"
                        value={post.category}
                        onChange={(e) => setPost({ ...post, category: e.target.value })} // onChange 추가
                    >
                        <option disabled value="">select 카테고리</option>
                        <option value="Landscape & Cityscape">Landscape & Cityscape (자연과 도시 풍경)</option>
                        <option value="Nature & Wildlife">Nature & Wildlife (자연과 야생의 삶)</option>
                        <option value="Black & White">Black & White (흑백)</option>
                        <option value="Macro Photography">Macro Photography (매크로 사진)</option>
                        <option value="People">People (사람들)</option>
                        <option value="Photo of the Day">Photo of the Day (오늘의 사진)</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Post 제목</Form.Label>
                    <Form.Control
                        name="title"
                        type="text"
                        placeholder="Post 제목을 입력해주세요"
                        value={post.title}
                        onChange={(e) => setPost({ ...post, title: e.target.value })} // onChange 추가
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Post 내용</Form.Label>
                    <Form.Control
                        name="content"
                        as="textarea"
                        rows={3}
                        value={post.content}
                        onChange={(e) => setPost({ ...post, content: e.target.value })} // onChange 추가
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Posted 파일</Form.Label>
                    {post.imgUrl && <Card.Img variant="top" src={post.imgUrl} />} {/* 이미지 URL 사용 */}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Photo 파일</Form.Label>
                    <Form.Control
                        type="file"
                        name="img"
                        accept="image/*"
                        onChange={handleImageChange} // 파일 변경 핸들러 설정
                    />
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button type="submit" variant="dark">Posting (수정)</Button>
                </div>
            </Form>
        </div>
    );
}

export default Edit;
