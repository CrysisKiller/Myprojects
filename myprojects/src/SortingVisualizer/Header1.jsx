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
      disabledState:false,
      sortValue:"",
    };
  }


  handleSizeChange=(event)=>{
    this.props.onsetSize(event.target.value);
  }

  handleSpeedChange=(event)=>{
    this.props.onsetSpeed(event.target.value);
  }

  setSortvalue = (sortValue) => {
    this.setState({ sortValue });
  };
  
  callRequestedsort=()=>{
    let disabledState=true;
    this.setState({disabledState});
    switch(this.state.sortValue){
      case "mergesort" : this.props.onMergeSort();
                         break;
      default : console.log("invalid value");
                break;                   
    }
    disabledState=false;
    this.setState({disabledState});

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
            <Nav.Link    onClick={()=>{this.props.onGenerateNewArray()}} disabled={this.state.disabledState}>Generate New Array</Nav.Link>
            <Nav.Link    onClick={()=>{this.setSortvalue("mergesort")}} disabled={this.state.disabledState}>Mergesort</Nav.Link>
            <Nav.Link    onClick={()=>{this.setSortvalue("quicksort")}} disabled={this.state.disabledState}>Quicksort</Nav.Link>
            <Nav.Link    onClick={()=>{this.setSortvalue("selection sort")}} disabled={this.state.disabledState}>Selection sort</Nav.Link>
            <Nav.Link    onClick={()=>{this.setSortvalue("insertion sort")}} disabled={this.state.disabledState}>Insertion sort</Nav.Link>
            <Nav.Link    onClick={()=>{this.setSortvalue("bubblesort")}} disabled={this.state.disabledState}>Bubblesort</Nav.Link>

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
              <Form.Control type="number" placeholder="Number of Elements" style={{width :"200px"}} onChange={this.handleSizeChange} disabled={this.state.disabledState}/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group  controlId="formGroupPassword">
              <Form.Control type="number" placeholder="Animation Speed" style={{width :"200px"}} onChange={this.handleSpeedChange} disabled={this.state.disabledState}/>
            </Form.Group>
            </Col>
            <Col>
             <Button variant="outline-success" onClick={()=>{this.callRequestedsort()}} disabled={this.state.disabledState}>Sort</Button>
            </Col>
            </Row> 
    
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
   }
}

