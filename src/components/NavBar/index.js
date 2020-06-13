import React from 'react';
import styled from 'styled-components';
//import { FaSignOutAlt } from 'react-icons/fa';

import { LogoutButton } from '@nostack/no-stack';

// change styling here
const Wrapper = styled.div`
  left: 0;
  top: 0;
  padding: 2em 1em;
  //font-size: 1rem;
  color: #000;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 400;
  text-transform: uppercase;
  span {
    font-weight: 700;
  }
`;

const Logout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    border: none;
    background: transparent;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
  }
`;

// const Logout = styled.div`
//   display: grid;
//   grid-template-columns: auto 1fr;
//   grid-gap: 0.5em;
//   justify-content: center;
//   align-items: center;
// `;

const NavBar = () => (
  <Wrapper>
    <Logo>
      <span>multi</span>task
    </Logo>
    <Logout>
      <LogoutButton className='logout-btn' />
    </Logout>
  </Wrapper>
);

export default NavBar;
