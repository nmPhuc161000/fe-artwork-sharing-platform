import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import {
  Icon,
  Col,
  Card,
  Row,
  CardTitle,
} from "react-materialize";
export default function Home() {

  return (
    <>
      <div className="container-fluid">
        <Row style={{
          width: "95%",
        }}>
          <Col m={3}>

            <Card
              closeIcon={<Icon>close</Icon>}
              header={
                <CardTitle
                  image="https://materializecss.com/images/sample-1.jpg"
                  reveal
                  waves="light"
                />
              }
              reveal={
                <p>
                  Here is some more information about this product that is only
                  revealed once clicked on.
                </p>
              }
              revealIcon={<Icon>more_vert</Icon>}
              title="Card Title"
            >
              <Link to={'/detail'}>
                <button className='waves-effect waves-light btn'>Detail</button>
              </Link>
            </Card>

          </Col>
        </Row>
      </div>
    </>
  );
}
