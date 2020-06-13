import React from 'react';
import styled from 'styled-components';
import './App.css';
import { NoStackConsumer } from '@nostack/no-stack';

import { PLATFORM_ID, TYPE_USER_ID } from './config';

import NavBar from './components/NavBar';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Items from './components/List/Items';

import Modal from 'react-modal';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const LoginWrapper = styled.div`
  display: grid;
  grid-gap: 1em;
  min-width: 240px;
  padding: 2em;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  align-self: center;
  height: auto !important;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: inherit;
  height: 100%;
  padding: 2em 1em;
  background: ${(props) => props.bgColor};
  div {
    height: inherit;
  }
`;

/* REACT_MODAL: This is needed so screen readers don't see main content when modal is opened.
It is not recommended, but you can opt-out by setting `ariaHideApp={false}` */
Modal.setAppElement('#root');

const App = () => (
  <AppContainer>
    <NavBar />
    <Wrapper className='App'>
      <NoStackConsumer>
        {({ loading, currentUser }) => {
          if (loading) return null;
          if (!currentUser) {
            return (
              <ContentWrapper bgColor='#4AA5D4'>
                <LoginWrapper>
                  <AuthTabs menuTitles={['Login', 'Register']}>
                    <LoginForm />
                    <RegistrationForm
                      platformId={PLATFORM_ID}
                      userClassId={TYPE_USER_ID}
                    />
                  </AuthTabs>
                </LoginWrapper>
              </ContentWrapper>
            );
          }

          return (
            <ContentWrapper bgColor='#f3f8fb'>
              <Items userId={currentUser.id} />
            </ContentWrapper>
          );
        }}
      </NoStackConsumer>
    </Wrapper>
  </AppContainer>
);

export default App;
