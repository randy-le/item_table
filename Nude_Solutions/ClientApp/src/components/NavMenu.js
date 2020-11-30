import React from 'react';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import './NavMenu.css';

export function NavMenu () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand>Nude Solutions Assignment</NavbarBrand>
          </Container>
        </Navbar>
      </header>
    );
}
