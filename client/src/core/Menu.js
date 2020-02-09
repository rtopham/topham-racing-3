import React, {Component} from 'react'
import {Navbar, Nav, Image, Container} from "react-bootstrap"
import {Link, withRouter} from 'react-router-dom'
import auth from './../auth/auth-helper'
import brandImage from './../assets/images/chainring.gif'

class Menu extends Component{
  constructor(props) {
    super(props)
 
    this.state={
    key:"1"
    }
  
}

setActiveKey=(selectedKey)=>{
this.setState({key:selectedKey})
}

componentDidMount=()=>{
  if(this.props.history.location.pathname==='/') this.setState({key:"0"})
  if(this.props.history.location.pathname.substring(0,6)==='/stats') this.setState({key:"1"})
  if(this.props.history.location.pathname.substring(0,12)==='/user/strava/') this.setState({key:"2"})
  if(this.props.history.location.pathname==='/signin') this.setState({key:"3"})
  if(this.props.history.location.pathname.substring(0,16)==='/user/dashboard/') this.setState({key:"4"})

}

componentDidUpdate=()=>{
/*
  if(this.props.history.location.pathname==='/') this.setState({key:"1"})
  if(this.props.history.location.pathname==='/user/strava/'+auth.isAuthenticated().user._id) this.setState({key:"2"})
  if(this.props.history.location.pathname==='/signin') this.setState({key:"3"})
  if(this.props.history.location.pathname==='/user/dashboard/'+auth.isAuthenticated().user._id) this.setState({key:"4"})
  */
}


render(){
const loggedIn=auth.isAuthenticated()
const user=loggedIn.user

return(

<Navbar expand="sm" bg="light" fixed="top" onSelect={this.setActiveKey}>

<Container fluid="true" className="menuContainer">

<Navbar.Brand href="/"><Image className="brandImage" src={brandImage}/>Topham Racing</Navbar.Brand>


{loggedIn&&<Navbar.Text>Logged in as: {user.name} </Navbar.Text>}
<Nav>
<Nav.Item><Nav.Link as={Link} eventKey="1" active={this.state.key==="1"}  to="/stats">Stats</Nav.Link></Nav.Item>
<Nav.Item><Nav.Link as={Link} eventKey="2" active={this.state.key==="2"}  to="/strava">Strava</Nav.Link></Nav.Item>



{/*   {!loggedIn&&<Nav.Item><Nav.Link as={Link} eventKey="3" active={this.state.key==="3"}  to="/signup">Sign Up</Nav.Link></Nav.Item>} */}
  {!loggedIn&&<Nav.Item><Nav.Link as={Link} eventKey="3" active={this.state.key==="3"}  to="/signin">Sign In</Nav.Link></Nav.Item>}
{/*   {loggedIn&&<Nav.Item><Nav.Link  as={Link} eventKey="4" active={this.state.key==="4"}  to={"/user/" + auth.isAuthenticated().user._id}>My Profile</Nav.Link></Nav.Item>} */}
  {loggedIn&&<Nav.Item><Nav.Link  as={Link} eventKey="4" active={this.state.key==="4"}  to={"/user/dashboard/" + auth.isAuthenticated().user._id}>Dashboard</Nav.Link></Nav.Item>}
  {loggedIn&&<Nav.Item><Nav.Link            eventKey="5" active={this.state.key==="5"} onClick={() => auth.signout(() =>this.props.history.push('/signin'))}>Sign out</Nav.Link></Nav.Item>}

</Nav>
</Container>

</Navbar>

)
}
 
}

export default withRouter(Menu)
