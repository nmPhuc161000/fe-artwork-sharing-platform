import React from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
import './Admin.css'

function Admin() {
  return (
    <main className='main-container'>
      <div className='main-title'>
        <h4>DASHBOARD</h4>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <div className='text-ad'>
            <h3>PRODUCTS</h3>
            <p>300</p>
          </div>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <BsPeopleFill className='card_icon' />
          </div>
          <div className='text-ad'>
            <h3>CEARTOR</h3>
            <p>33</p>
          </div>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <BsFillBellFill className='card_icon' />
          </div>
          <div className='text-ad'>
            <h3>ALERTS</h3>
            <p>42</p>
          </div>
        </div>
      </div>
      <div class="table-data">
        <div class="order">
          <div class="head">
            <h3>Recent Orders</h3>
            <i class='bx bx-search' ></i>
            <i class='bx bx-filter' ></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Date Order</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src="/assets/image/Land.png" />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td><span class="status completed">Completed</span></td>
              </tr>
              <tr>
                <td>
                  <img src="/assets/image/Land.png" />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td><span class="status pending">Pending</span></td>
              </tr>
              <tr>
                <td>
                  <img src="/assets/image/Land.png" />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td><span class="status process">Process</span></td>
              </tr>
              <tr>
                <td>
                  <img src="/assets/image/Land.png" />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td><span class="status pending">Pending</span></td>
              </tr>
              <tr>
                <td>
                  <img src="/assets/image/Land.png" />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td><span class="status completed">Completed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default Admin