import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MdCheck, MdClose } from 'react-icons/md';

const Form = styled.form`
  grid-row: 2;
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-gap: 0.5em;
  padding: 1em;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4em;
  background: #fff;
`;

const FormControl = styled.label`
  display: flex;
  background: transparent;
  justify-content: flex-start;
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
    text-indent: 1em;
    outline: transparent;
  }
`;

const SubmitButton = styled.button`
  position: relative;
  display: flex;
  width: 1em;
  height: 1em;
  line-height: 1;
  font-size: 1rem;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.success ? '#4aa5d4' : props.danger ? 'tomato' : null};
  color: #fff;
  text-align: center;
  margin: 0;
  padding: 1em;
  text-transform: uppercase;
  border: none;
  border-radius: 50%;
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
  svg {
    position: absolute;
    font-size: 1.25rem;
  }
`;

function EditInstanceForm({
  id,
  label,
  value,
  onChange,
  onSave,
  onCancel,
  disabled,
}) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form>
      <FormControl htmlFor={id}>
        <input
          id={id}
          type='text'
          ref={inputRef}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </FormControl>
      <SubmitButton
        type='button'
        hoverColor='#00FF00'
        onClick={onSave}
        disabled={disabled}
        success
      >
        <MdCheck />
      </SubmitButton>
      <SubmitButton
        type='button'
        hoverColor='#FF0000'
        onClick={onCancel}
        disabled={disabled}
        danger
      >
        <MdClose />
      </SubmitButton>
    </Form>
  );
}

export default EditInstanceForm;
