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
      setFont:false,
    };
  }

  handleArrayChange = (event) => {
    const inputValue = event.target.value;
    let textArray = [];
  
    if (inputValue) {
      const valuesToAdd = inputValue.split(',');
      const trimmedValues = valuesToAdd.map(value => value.trim());
      const validValues = trimmedValues.filter(value => value !== '');
      textArray = validValues;
    }
  
    this.props.onsetArray(textArray);
  }
  
  handleSizeChange=(event)=>{
    if(event.target.value<=40){
      this.props.onsetSize(event.target.value);
  }
  else{
    window.alert("Maximum no of elements is 40");
    this.props.onsetSize("20");
  }
}

  handleSpeedChange=(event)=>{
    this.props.onsetSpeed(event.target.value);
  }


  setSortvalue = (sortValue) => {
    // Reset font size for all sort values
    const sortValues = ["mergesort", "selection sort", "insertion sort", "bubblesort"];
    sortValues.forEach(value => {
      const element = document.getElementById(value);
      if (element) {
        element.style.fontSize = "initial"; // Reset font size
      }
    });
 
    // Set font size for the current sort value
    this.setState({ sortValue });
    const currentElement = document.getElementById(sortValue);
    if (currentElement) {
      currentElement.style.fontSize = "x-large";
    };
  };
 

  callRequestedsort = () => {
    if(this.state.sortValue==""){
      this.setState({disabledState : false});
      window.alert("please select a sort algorithm");
    }
    else{
    this.setState({ disabledState: true }, () => {    
      switch (this.state.sortValue) {
        case "mergesort":
          this.props.onMergeSort(() => {
            this.setState({ disabledState: false });    
          });
          break;
        case "bubblesort":
          this.props.onbubbleSort(() => {
            this.setState({ disabledState: false });    
          });
          break;
        case "selection sort":
          this.props.onselectionSort(() => {
            this.setState({ disabledState: false });    
          });
        case "insertion sort" :
          this.props.oninsertionSort(()=>{
            this.setState({ disabledState: false })
          })
       

        default:
          console.log("invalid value");
          break;
      }
    });
  }
  };

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
            <Nav.Link   onClick={()=>{this.props.onGenerateNewArray()}} disabled={this.state.disabledState}>Generate New Array</Nav.Link>

            <Nav.Link   id="mergesort" onClick={()=>{this.setSortvalue("mergesort")}} disabled={this.state.disabledState}>Mergesort</Nav.Link>

            <Nav.Link  id="selection sort"  onClick={()=>{this.setSortvalue("selection sort")}} disabled={this.state.disabledState}>Selection sort</Nav.Link>

            <Nav.Link  id='insertion sort'  onClick={()=>{this.setSortvalue("insertion sort")}} disabled={this.state.disabledState}>Insertion sort</Nav.Link>

            <Nav.Link  id="bubblesort"  onClick={()=>{this.setSortvalue("bubblesort")}} disabled={this.state.disabledState}>Bubblesort</Nav.Link>

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
            <Form.Group  controlId="formGroupPassword">
              <Form.Control type="text" id="textInput" placeholder="Enter Array" style={{width :"200px"}} onChange={this.handleArrayChange} disabled={this.state.disabledState}/>
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