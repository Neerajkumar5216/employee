import React, { Component } from 'react';
 import { Navbar, Nav, NavItem } from 'react-bootstrap';
 // To use routing functionalities
 import { Link } from 'react-router-dom';
 import '../index.css';
 
 class Header extends Component {
 render() {
 return (
 <div>
 <Navbar>
 <Navbar.Header>
 <Navbar.Brand>
 <a href="javascript:void(0)">MERN Stack CRUD Operations</a>
 </Navbar.Brand>
 </Navbar.Header>
 <Nav>
 <NavItem href="javascript:void(0)">
 <Link to="/">Home</Link>
 </NavItem>
 <NavItem href="javascript:void(0)">
 <Link to="/addemployee">Add New Employee</Link>
 </NavItem>
 </Nav>
 </Navbar>
 </div>
 );
 }
 }
export default Header;





import React, { Component } from 'react';
 import { Switch, Route } from 'react-router-dom';
 
 // Our all component files
 import ListEmployee from '../Components/ListEmployee';
 import AddEmployee from '../Components/AddEmployee';
 import EditEmployee from '../Components/EditEmployee';
 
 class Main extends Component {
 
 render() {
 return (
 <main>
 <Switch>
 <Route exact path='/' component={ListEmployee} />
 <Route path='/list' component={ListEmployee} /> 
 <Route path='/addemployee' component={AddEmployee} />
 <Route path='/editemployee/:id' component={EditEmployee} />
 </Switch>
 </main>
 );
 }
 }

 export default Main;
 
 
 
 
 import React, { Component } from 'react';
 import Header from './Components/Header';
 import Main from './Components/Main';
 
 class App extends Component {
 render() {
 return (
 <div>
 <Header />
 <Main />
 </div>
 );
 }
 }
 
 export default App;
 
 
 
 
 import React, { Component } from 'react';
 import axios from 'axios';
 
 const customStyle = {
 width: '300px',
 margin: '0 auto'
 }
 
 class AddEmployee extends Component {
 constructor(props) {
 super(props);
 this.state = {
 firstName: '',
 lastName: '',
 email: '',
 phone: ''
 }
 }
 
 // When value changes of the fields
 handleChange = (event) => {
 this.setState({ [event.target.name]: event.target.value });
 }
 
 // To add new employee when user submits the form
 handleSubmit = (event) => {
 event.preventDefault();
 const { firstName, lastName, email, phone } = this.state;
 axios.post('http://localhost:4000/employees/addEmployee', {
 firstName: firstName,
 lastName: lastName,
 email: email,
 phone: phone,
 })
 .then((response) => {
 console.log(response);
 this.props.history.push('/');
 })
 .catch((error) => {
 console.log(error);
 });
 }
 
 render() {
 return (
 <div className="container">
 <form style={customStyle} onSubmit={this.handleSubmit}>
 <label>
 First Name
 <input
 name="firstName"
 type="text"
 value={this.state.firstName}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
 Last Name
 <input
 name="lastName"
 type="text"
 value={this.state.lastName}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
 Email
 <input
 name="email"
 type="text"
 value={this.state.email}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
 Phone No
 <input
 name="phone"
 type="text"
 value={this.state.phone}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <input
 type="submit"
 value="submit"
 className="btn btn-primary"
 />
 </form>
 </div>
 );
 }
 }
 
 export default AddEmployee;
 
 
 import React, { Component } from 'react';
 import axios from 'axios';
 import { Table, Button } from 'react-bootstrap';
 // To use routing functionalities
 import { Link } from 'react-router-dom';
 import '../index.css';
 import EmployeeService from './Services';
 
 var divStyle = {
 margin: '8% 8%',
 };
 
 class ListEmployee extends Component {
 
 constructor(props) {
 super(props);
 this.employeeService = new EmployeeService();
 this.state = {
 employees: []
 }
 this.deleteEmployee = this.deleteEmployee.bind(this);
 }
 
 componentDidMount = () => {
 this.getEmployeeList();
 }
 
 // To get all the employees
 getEmployeeList() {
 axios.get('http://localhost:4000/employees')
 .then((response) => {
 console.log(response);
 this.setState({
 employees: response.data
 });
 })
 .catch((error) => {
 console.log(error);
 })
 }
 
 // To delete any employee
 deleteEmployee(empid) {
 this.employeeService.deleteEmployee(empid);
 this.getEmployeeList();
 }
 
 render() {
 const { employees } = this.state;
 return (
 <div style={divStyle}>
 <Table responsive>
 <thead>
 <tr>
 <th>#</th>
 <th>First Name</th>
 <th>Last Name</th>
 <th>Email</th>
 <th>Phone</th>
 <th></th>
 <th></th>
 </tr>
 </thead>
 <tbody>
 {
 employees && employees.map((employee, i) => {
 return (
 <tr key={i}>
 <td>{i}</td>
 <td>{employee.firstName}</td>
 <td>{employee.lastName}</td>
 <td>{employee.email}</td>
 <td>{employee.phone}</td>
 <td>
 <Link to={"editemployee/" + employee._id} className="btn btn-primary">Edit</Link>
 </td>
 <td>
 <Button onClick={() => this.deleteEmployee(employee._id)} bsStyle="danger" >Delete</Button>
 </td>
 </tr>
 )
 })
 }
 </tbody>
 </Table>
 </div>
 );
 } 
 }
 
 export default ListEmployee;
 
 
 
 
 import React, { Component } from 'react';
 import axios from 'axios';
 
 const customStyle = {
 width: '300px',
 margin: '0 auto'
 }
 
 class EditEmployee extends Component {
 constructor(props) {
 super(props);
 this.state = {
 firstName: '',
 lastName: '',
 email: '',
 phone: ''
 }
 }
 
 componentDidMount = () => {
 this.getEmployeeById();
 }
 
 // To get employee based on ID
 getEmployeeById() {
 axios.get('http://localhost:4000/employees/editEmployee/' + this.props.match.params.id)
 .then((response) => {
 this.setState({
 firstName: response.data.firstName,
 lastName: response.data.lastName,
 email: response.data.email,
 phone: response.data.phone
 });
 })
 .catch((error) => {
 console.log(error);
 })
 }
 
 handleChange = (event) => {
 this.setState({ [event.target.name]: event.target.value });
 }
 
 // To update the record on submit
 handleSubmit = (event) => {
 event.preventDefault();
 const { firstName, lastName, email, phone } = this.state;
 axios.post('http://localhost:4000/employees/updateEmployee/' + this.props.match.params.id, {
 firstName: firstName,
 lastName: lastName,
 email: email,
 phone: phone,
 })
 .then((response) => {
 console.log(response);
 this.props.history.push('/');
 })
 .catch((error) => {
 console.log(error);
 });
 
 }
 
 render() {
 return (
 <div className="container">
 <form style={customStyle} onSubmit={this.handleSubmit}>
 <label>
 First Name
 <input
 name="firstName"
 type="text"
 value={this.state.firstName}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
 Last Name
 <input
 name="lastName"
 type="text"
 value={this.state.lastName}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
 Email
 <input
 name="email"
 type="text"
 value={this.state.email}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
 Phone No
 <input
 name="phone"
 type="text"
 value={this.state.phone}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <input
 type="submit"
 value="submit"
 className="btn btn-primary"
 />
 </form>
 </div>
 );
 }
 }
 
 export default EditEmployee;
 
 
 
 
 
 
 