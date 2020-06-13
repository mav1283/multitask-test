import React, { useEffect, useRef, useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { withNoStack, EXECUTE } from '@nostack/no-stack';
import { FaPlus } from 'react-icons/fa';
import compose from '@shopify/react-compose';

import { CREATE_ITEM_FOR_LIST_ACTION_ID } from '../../../config';

// change styling here
const Form = styled.form`
  grid-row: 2;
  display: grid;
  grid-template-columns: 1fr auto;
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
  background: #4aa5d4;
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

function ItemCreationForm({ userId, createItem, refetchQueries, exitModal }) {
  const [itemValue, updateItemValue] = useState('');
  const [loading, updateLoading] = useState(false);
  const inputRef = useRef();

  function handleChange(e) {
    updateItemValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!itemValue) {
      return;
    }

    updateLoading(true);

    const createItemResponse = await createItem({
      variables: {
        actionId: CREATE_ITEM_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: userId,
          value: itemValue,
        }),
        unrestricted: false,
      },
      refetchQueries,
    });

    const newItemData = JSON.parse(createItemResponse.data.Execute);

    updateItemValue('');
    updateLoading(false);
    exitModal();
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl htmlFor='item-value'>
        <input
          id='item-value'
          type='text'
          ref={inputRef}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={itemValue}
          disabled={loading}
          placeholder='ex: Organize Meeting'
        />
      </FormControl>
      <SubmitButton type='submit' disabled={loading}>
        <FaPlus />
      </SubmitButton>
    </Form>
  );
}

export default compose(graphql(EXECUTE, { name: 'createItem' }))(
  ItemCreationForm
);
