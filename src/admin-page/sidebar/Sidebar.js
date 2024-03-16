import React from 'react';
import {
    BsFillBoxFill, BsFillGrid1X2Fill, BsEmojiSmile, BsFillGrid3X3GapFill, BsMenuButtonWideFill, BsPeopleFill, BsFillGearFill
} from 'react-icons/bs'
import './Sidebar.css';
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Sidebar() {
    const allSideMenu = document.querySelectorAll('.side-menu.top li a');
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        //window.location.reload();
    };
    allSideMenu.forEach(item => {
        const li = item.parentElement;

        item.addEventListener('click', function () {
            allSideMenu.forEach(i => {
                i.parentElement.classList.remove('active');
            })
            li.classList.add('active');
        })
    });
    return (
        <section id="sidebar" className="sidebar">
            <a href="/home-admin" className="brand">
                <BsEmojiSmile className='bx bxs-smile' />
                <span className="text">AdminHub</span>
            </a>
            <ul className="side-menu top">
                <li class="active">
                    <a href="#">
                        <BsFillGrid1X2Fill className='bx bxs-dashboard' />
                        <span className="text">Dashboard</span>
                    </a>
                </li>
                <li>
                    <Link href="#">
                        <BsFillBoxFill className='bx bxs-smile' />
                        <span className="text">Product</span>
                    </Link>
                </li>
                <li>
                    <a href="#">
                        <BsFillGrid3X3GapFill className='bx bxs-category' />
                        <span className="text">Category</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <BsMenuButtonWideFill className='bx bxs-report' />
                        <span className="text">Reports</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <BsPeopleFill className='bx bxs-cogs' />
                        <span className="text">Creator</span>
                    </a>
                </li>
            </ul>
            <ul className="side-menu">
                <li>
                    <a href="#">
                        <BsFillGearFill className='bx bxs-cog' />
                        <span className="text">Settings</span>
                    </a>
                </li>
                <li className='sidebar-list-item' onClick={handleLogout}>
                    <a href="" >
                        <RiLogoutBoxRLine className='bx bxs-setting' /> Logout
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Sidebar;
