import '../.././css/detail.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

function Delete() {
    const deleteAPI = async () => {
        const confirmation = window.confirm('삭제시 포스트가 삭제됩니다. 삭제 후 복원 불가능합니다.');
        if (confirmation) {
            try {
                await axios.delete(`/api/post/delete/${id}`);
                alert("게시물이 성공적으로 삭제되었습니다.");
                // 삭제 후 원하는 위치로 이동 (예: 메인 페이지)
                window.location.href = '/post/mylist';
            } catch (error) {
                console.error("Error deleting post:", error);
                alert("게시물 삭제 중 오류가 발생했습니다.");
            }
        }
    };

    const { id } = useParams(); // URL의 id 파라미터 받아오기
    const [post, setPost] = useState(null); // 게시물 데이터 상태

    useEffect(() => {
        // id가 있을 때만 데이터 요청
        if (id) {
            axios.get(`/api/post/detail/${id}`)
                .then((response) => {
                    setPost(response.data); // 응답 데이터를 post 상태로 설정
                })
                .catch((error) => {
                    console.error("Error fetching post:", error);
                    alert("게시물 로드 중 오류가 발생했습니다.");
                });
        }
    }, [id]);

    if (!post) return <div>Loading...</div>; // 데이터가 로드되지 않았을 때 표시

    return (
        <>
            <div id="detail">
                <div id='detailbox'>
                    <div id='detailcontent'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg>
                            <span id='writer'>{post.writerInfo.nickname}</span>
                        </div>
                        <br></br>
                        <div>{post.writeDate}</div>
                        <br></br>
                        <div><h2>{post.title}</h2></div>
                        <div>in {post.category}</div>
                        <br></br>
                        <div>{post.content}</div>
                        <br></br>
                        {post.img && (
                            <div>
                                <Card.Img  variant="top" src={post.img} />
                            </div>
                        )}
                        <br></br>
                        <div className="d-grid gap-2">
                            
                            <Button onClick={deleteAPI} variant="danger" >Delete</Button>
                        </div>
                        <br></br>
                        <br></br>
                        </div>
                </div>
            </div>
            
            <div id='blackbox'>fasfs</div>
        </>
    );
}

export default Delete;
