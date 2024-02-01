import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React from 'react';

export default class Header1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disabledState:false
    };
  }


  handleSizeChange=(event)=>{
    this.props.onsetSize(event.target.value);
  }

  handleSpeedChange=(event)=>{
    this.props.onsetSpeed(event.target.value);
  }


render () {
    return(
    <Navbar expand="lg" className="bg-body-tertiary"  bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">Visuals</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link  id="new-array" onClick={this.props.onGenerateNewArray}>Generate New Array</Nav.Link>
            <Nav.Link  id="mergesort"  onClick={this.props.onMergeSort} >Mergesort</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown" >
              <NavDropdown.Item href="/sorting">Sorting</NavDropdown.Item>
              <NavDropdown.Item href="/graphs" >
               Graphs
              </NavDropdown.Item>
            </NavDropdown>

          </Nav>
          <Form>
           <Row>
            <Col>
            <Form.Group  controlId="formGroupEmail" >
              {/* <Form.Label style={{ color: 'white', }}>Number of Elements</Form.Label> */}
              <Form.Control type="number" placeholder="Number of Elements" id="array-size" style={{width :"200px"}} onChange={this.handleSizeChange}/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group  controlId="formGroupPassword">
              <Form.Control type="number" placeholder="Animation Speed" id="Ani-speed"  style={{width :"200px"}} onChange={this.handleSpeedChange}/>
            </Form.Group>
            </Col>
            <Col>
             <Button variant="outline-success"  id="submit-btn">Sort</Button>
            </Col>
            </Row> 
    
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
   }
}

