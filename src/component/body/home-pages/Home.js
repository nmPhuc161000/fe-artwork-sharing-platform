// import React from "react";
// import { Link } from "react-router-dom";
// import "./Home.css";
// import {
//   Icon,
//   Col,
//   Card,
//   Row,
//   CardTitle,
// } from "react-materialize";
// export default function Home() {

//   return (
//     <>
//       <div className="container-fluid">
//         <Row style={{
//           width: "95%",
//         }}>
//           <Col m={3}>

//             <Card
//               closeIcon={<Icon>close</Icon>}
//               header={
//                 <CardTitle
//                   image="https://materializecss.com/images/sample-1.jpg"
//                   reveal
//                   waves="light"
//                 />
//               }
//               reveal={
//                 <p>
//                   Here is some more information about this product that is only
//                   revealed once clicked on.
//                 </p>
//               }
//               revealIcon={<Icon>more_vert</Icon>}
//               title="Card Title"
//             >
//               <Link to={'/detail'}>
//                 <button className='waves-effect waves-light btn'>Detail</button>
//               </Link>
//             </Card>

//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }


import React from 'react';
import axios from 'axios';

export default function Home() {
  const callApi = async () => {
    try {
      // Gọi tới API bằng Axios
      const response = await axios.get('https://1e67-115-72-30-52.ngrok-free.app/api/Auth/users');
      console.log(response.data); // In kết quả từ API lên console (có thể xử lý dữ liệu ở đây)
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  return (
    <div>
      <div>Home</div>
      {/* Thêm nút button gọi đến hàm callApi khi được nhấn */}
      <button onClick={callApi}>Call API</button>
    </div>
  );
}
