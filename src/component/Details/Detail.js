import React, { useState } from 'react';
import { Icon, Modal, Button, Textarea } from 'react-materialize';
import './Detail.css';
export default function Detail({isLoggedIn }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [comment, setComment] = useState('');
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); // State để điều khiển việc hiển thị modal comment

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = () => {
        // Logic for submitting comment
        console.log('Comment submitted:', comment);
        // Close the modal after submitting comment
        setIsCommentModalOpen(false);
    };

    const toggleFullscreen = () => {
        const imageElement = document.querySelector('.product-tumb img'); // Lấy phần tử ảnh
        if (imageElement) {
            // Kiểm tra xem trình duyệt có hỗ trợ API fullscreen không
            if (imageElement.requestFullscreen) {
                // Nếu fullscreen đang được bật, tắt fullscreen
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    // Nếu fullscreen đang tắt, bật fullscreen cho phần tử ảnh
                    imageElement.requestFullscreen();
                }
            } else {
                alert('Your browser does not support fullscreen mode.');
            }
        } else {
            alert('Image element not found.');
        }
    };
    const handleDownloadClick = () => {
        if (isLoggedIn) {
            window.location.href = '/payment';
        } else {
            // Lưu địa chỉ URL của trang chi tiết trước khi chuyển hướng đến trang đăng nhập
            localStorage.setItem('redirectPath', window.location.pathname);
            window.location.href = '/login';
        }
    };

    const handleAuthorClick = () => {
        if (isLoggedIn) {
            window.location.href = '/profile';
        } else {
            // Lưu địa chỉ URL của trang chi tiết trước khi chuyển hướng đến trang đăng nhập
            localStorage.setItem('redirectPath', window.location.pathname);
            window.location.href = '/login';
        }
    };


    return (
        <div className='container-card'>
            <div className='product-card'>
                <div className='product-tumb'>
                    <img src='./assets/image/picLogin.png' alt='Product' />
                </div>
            </div>
            <div className='product-icons'>
                <div className='product-favorite'>
                    {/* Hiển thị nút favorite hoặc nút add vào yêu thích tùy thuộc vào trạng thái isFavorite */}
                    {isFavorite ? (
                        <button onClick={toggleFavorite}>
                            <Icon>favorite</Icon> {/* Icon hiển thị khi sản phẩm đã được thêm vào yêu thích */}
                            <span>In Favorites</span>
                        </button>
                    ) : (
                        <button onClick={toggleFavorite}>
                            <Icon>favorite_border</Icon> {/* Icon hiển thị khi sản phẩm chưa được thêm vào yêu thích */}
                            <span>Add to Favorites</span>
                        </button>
                    )}
                </div>
                <div className='product-comment'>
                    {/* Clicking on the icon opens the comment modal */}
                    <button onClick={() => setIsCommentModalOpen(true)}>
                        <Icon>comment</Icon>
                        <span>Comment</span>
                    </button>
                    {/* Modal displayed when isCommentModalOpen state is true */}
                    <Modal
                        open={isCommentModalOpen}
                        actions={[
                            <Button onClick={handleCommentSubmit} modal="close" waves="light">Submit</Button>
                        ]}
                        options={{ onCloseEnd: () => setIsCommentModalOpen(false) }} // Khi đóng modal, cập nhật state để đóng modal
                    >
                        <Textarea
                            placeholder="Add your comment here..."
                            value={comment}
                            onChange={handleCommentChange}
                        />
                    </Modal>
                </div>
                <div className='product-download'>
                    {/* Nút download */}
                    <button onClick={handleDownloadClick} href={isLoggedIn ? '/payment' : '/login'}>
                        <Icon>download</Icon>
                        <span>Download</span>
                    </button>
                </div>
                <div className='product-fullscreen'>
                    <button onClick={toggleFullscreen}>
                        <Icon>fullscreen</Icon>
                        <span>Fullscreen</span>
                    </button>
                </div>
            </div>
            <div className='product-info'>
                <a onClick={handleAuthorClick} href={isLoggedIn ? '/profile' : '/login'} className='author'>
                    <img src='./assets/image/avatar.png' alt='Author Avatar' />
                </a>
                <div className='artist'>
                    <p><strong>Artist:</strong> Ngoc Bao</p> {/* Thông tin về tác giả */}
                </div>
                <p><strong>Published:</strong> January 1, 2023</p>
            </div>
        </div>

    );
}