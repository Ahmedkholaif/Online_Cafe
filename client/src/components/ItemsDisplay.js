import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

class ItemsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items
    };
  }


componentWillReceiveProps(nextProps){
    this.setState({
       items:nextProps.items,
    })
}

  render() {
    return (
      <Col>
        <Row className="justify-content-md-center">
          <Col>
            <Row>
              {this.state.items.map(item => (
                <Col xs="3">
                  <Row className={"item"}>
                    <Col>
                      <img src={item.image} height="50px" />
                    </Col>
                  </Row>
                  <Row className={"item"}>
                    <Col>
                      <Link to={`/book?${item.productName}`} replace>
                        {item.productName}
                      </Link>
                    </Col>
                  </Row>
                  <Row className={"item lastItem"}>
                    <Col>
                      <Link to={`/author?${item.category}`} replace>
                        {item.category}
                      </Link>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default ItemsDisplay;
