import React from 'react';
import './Request.css';

export default function Request() {
  return (
    <div className='request'>
        <section className='request-content'>
            <section className='conten-title'>
                <span>Request</span>
                <div>
                    <button>
                        New request
                    </button>
                </div>
            </section>
            <section className='content-box'>
                <div className='box-sideBar'>
                    <span>Unread</span>
                    <span>Sent</span>
                </div>
                <div className='box-request'>
                    <ul>
                        <li><span>No Unread Notes</span></li>
                    </ul>
                    <div></div>
                </div>
            </section>
        </section>
    </div>
  )
}
