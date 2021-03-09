import React from 'react';
import './styles.css';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
function NavBar() {
  return (
    <>
      <Navbar className='nav-custom' variant='dark'>
        <Navbar.Brand className='logo' href='/home'>
          OdinBook
        </Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link className='link-set' href='#home'>
            Home
          </Nav.Link>
          <Nav.Link className='link-set' href='#features'>
            Profile
          </Nav.Link>
          <Nav.Link className='link-set' href='#pricing'>
            Requests
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          <Button variant='outline-light'>Search</Button>
        </Form>
      </Navbar>
    </>
  );
}

export default NavBar;
