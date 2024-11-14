import '../.././css/detail.css';
import { useEffect, useState } from 'react';
import { Form, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';

function Detail() {

    
    const { id } = useParams(); // URL의 id 파라미터 받아오기
    const [post, setPost] = useState(null); // 게시물 데이터 상태
    const [comments, setComments] = useState();
    const comment = async (e)=>{
        
        e.preventDefault();
    
    const form = document.querySelector(".commentForm");
    const formData = new FormData(form);
    
    const data = {
        comment: formData.get("comment"),
    };
    try {
        // axios로 데이터 전송
        const response = await axios.post(`/post/comment/${id}`, data);
        if (response.status === 200) {
            alert("댓글이 등록되었습니다.");
            window.location.href = `/post/detail/${id}`;
        }
        } catch (error) {
        console.error("등록 실패:", error);
        alert("댓글 등록 실패, 다시 시도하세요.");
        }
    }

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
        if (id) {
            axios.get(`/api/post/comment/${id}`)
                .then((response) => {
                    setComments(response.data); // 응답 데이터를 post 상태로 설정
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
                        <br></br>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg>
                            <span id='writer'>{post.writerInfo.nickname}</span>
                        </div>
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
                        <hr></hr>
                        Comments
                        <form className='commentForm'>
                            <div id='comment'>
                                Write a comment...
                                <br></br>
                              
                                <input name='comment' id='commentbox' type='text' placeholder='댓글을 입력해주세요'></input>
                                <br></br>
                                <br></br>
                                
                                <div id='commentbuttonbox'>
                                    <Button onClick={comment} id='commentbutton' variant="outline-dark"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                                        </svg>
                                    </Button>
                                </div>
                            </div>
                        </form>
                        <br></br>
                        댓글
                        <br></br>
                        <br></br>
                        <div>
                        {
                        comments && comments.map((com, index) => (
                            <div key={index}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                </svg>&nbsp;
                                {com.writerInfo.nickname}&emsp;
                                {com.commentDate}
                                <a href={`/post/detail/${com._id}`}>
                                </a>
                                <br></br>
                                {com.comment}
                                <hr></hr>
                                
                            </div>
                        ))
                        }
                        </div>
                        
                        
                        <br></br>
                    </div>
                </div>
            </div>
            <div id='blackbox'>fasfs</div>
        </>
    );
}

export default Detail;
