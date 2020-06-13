import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa';

import { withNoStack } from '@nostack/no-stack';

import ForgotPasswordButton from '../ForgotPasswordButton';

const Wrapper = styled.div`
  display: grid;
  grid-gap: 1em;
  align-self: center;
  form {
    display: inherit;
    grid-gap: inherit;
  }
`;

const Row = styled.div`
  text-align: center;
`;

const FormControl = styled.label`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.5em;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 1em;
  background: #f9f9f9;
  align-items: center;
  font-size: 1.125rem;
  svg {
    color: #c8d3d9;
  }
  input {
    display: block;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    text-align: left;
    outline: transparent;
  }
`;

const SubmitButton = styled.button`
  position: relative;
  display: block;
  width: 100%;
  background: #4aa5d4;
  color: #fff;
  text-align: center;
  padding: 1em;
  text-transform: uppercase;
  border: none;
  border-radius: 2em;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.4s ease-in-out;
  &::before {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.1);
    border-radius: inherit;
    opacity: 0;
  }
  &:hover {
    &::before {
      opacity: 1;
    }
  }
`;

const ErrorContainer = styled.div`
  font-size: 0.75rem;
  color: tomato;
`;

const LoginForm = ({ loading, currentUser, login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (loading || currentUser) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await login({
        username,
        password,
      });
    } catch (error) {
      setError(
        error.message ||
          (error.graphQLErrors &&
            error.graphQLErrors.length &&
            error.graphQLErrors[0]) ||
          error
      );
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Row>
          <FormControl htmlFor='nostack-username'>
            <FaUser />
            <input
              id='nostack-username'
              type='text'
              name='username'
              disabled={isSubmitting}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='User Name'
            />
          </FormControl>
        </Row>
        <Row>
          <FormControl htmlFor='nostack-password'>
            <FaLock />
            <input
              id='nostack-password'
              type='password'
              name='password'
              disabled={isSubmitting}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            />
          </FormControl>
        </Row>
        <Row>
          <SubmitButton
            type='submit'
            disabled={isSubmitting || !username || !password}
          >
            Log In
          </SubmitButton>
        </Row>
        {error && (
          <Row>
            <ErrorContainer>{error}</ErrorContainer>
          </Row>
        )}
      </form>
      <Row>
        <ForgotPasswordButton />
      </Row>
    </Wrapper>
  );
};

export default withNoStack(LoginForm);
