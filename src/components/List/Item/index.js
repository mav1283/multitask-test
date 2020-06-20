import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';

import ModalContainer from '../../Modals/ModalContainer';
import '../../Modals/modals.css';

import { FaCheck, FaTrashAlt, FaEdit } from 'react-icons/fa';

import {
  UPDATE_ITEM_FOR_LIST_ACTION_ID,
  DELETE_ITEM_FOR_LIST_ACTION_ID,
} from '../../../config';

import EditInstanceForm from '../../EditInstanceForm';
import DeleteInstanceMenu from '../../DeleteInstanceMenu';

// add styling here
const ItemStyleWrapper = styled.div(
  ({ selected, isDeleting }) => `
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  grid-gap: 1em;
  padding: 0.5em 1.5em;
  align-items: center;
  background-color: ${selected ? '#c8d3d9' : 'auto'};
  cursor: ${selected ? 'auto' : 'pointer'};
  p
`
);

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  padding: 0;
  color: #fff;
  transition: color 0.5s ease;
  &:hover {
    color: ${(props) => props.hoverColor || '#eee'};
  }
`;

const ItemCheckBox = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2em;
  height: 2em;
  line-height: 1;
  background: #f9f9f9;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  cursor: pointer;
  transition: 0.4s ease-in-out;
  input {
    display: none;
    &:checked ~ svg {
      display: block;
    }
  }
  svg {
    font-size: 1.25rem;
    color: #4aa5d4;
    display: none;
  }
`;

const ItemValueContainer = styled.label`
  margin: 0;
  padding: 0;
  font-size: 1.25rem;
  line-height: 1;
  text-align: left;
  text-transform: capitalize;
  text-decoration: ${(props) => props.isCrossedOut && 'line-through'};
  color: ${(props) => (props.isCrossedOut ? '#dae1e5' : '#000')};
  cursor: pointer;
  input {
    display: none;
  }
`;

function Item({
  item,
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  selectHandler,
}) {
  const [itemValue, updateItemValue] = useState(item.value);
  const [editModal, setEditModal] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);
  const [isCrossedOut, updateIsCrossedOut] = useState(false);

  const openEditModal = () => setEditModal(true);
  const closeEditModal = () => setEditModal(false);
  const openDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);
  // const handleOutsideClick = () => {
  //   if (selected === item.id) {
  //     selectHandler('');
  //   }
  // };

  useEffect(() => {
    console.log(selected);
  }, []);

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleOutsideClick);
  //   return () => document.removeEventListener('mousedown', handleOutsideClick);
  // }, []);

  function handleItemCheckedStatus() {
    updateIsCrossedOut((previousState) => !previousState);
  }

  function handleItemValueChange(e) {
    updateItemValue(e.target.value);
  }

  async function handleItemValueSave() {
    updateIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_ITEM_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          value: itemValue,
          instanceId: item.id,
        }),
      },
      refetchQueries,
    });

    await updateIsSaving(false);
    await closeEditModal();
    await selectHandler('');
    console.log('Saving');
  }

  function handleCancelEdit() {
    closeEditModal();
    selectHandler('');
    console.log('Canceling');
  }

  async function handleDelete() {
    updateIsDeleting(true);
    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_ITEM_FOR_LIST_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: item.id,
          }),
        },
        refetchQueries,
      });
      await closeDeleteModal();
      await selectHandler('');
    } catch (e) {
      updateIsDeleting(false);
    }
    console.log('Deleting');
  }

  function handleCancelDelete() {
    closeDeleteModal();
    selectHandler('');
  }

  if (selected !== item.id) {
    return (
      <ItemStyleWrapper>
        <ItemCheckBox htmlFor={item.id}>
          <input
            type='checkbox'
            id={item.id}
            checked={isCrossedOut}
            onChange={handleItemCheckedStatus}
          />
          <FaCheck />
        </ItemCheckBox>
        <ItemValueContainer isCrossedOut={isCrossedOut}>
          {itemValue}
          <input
            type='radio'
            checked={item.id === selected}
            value={item.id}
            onChange={(e) => selectHandler(e.target.value)}
          />
        </ItemValueContainer>
      </ItemStyleWrapper>
    );
  }

  return (
    <ItemStyleWrapper selected={selected}>
      <ItemCheckBox htmlFor={item.id}>
        <input
          type='checkbox'
          id={item.id}
          checked={isCrossedOut}
          onChange={handleItemCheckedStatus}
        />
        <FaCheck />
      </ItemCheckBox>

      <ItemValueContainer>
        {itemValue}
        <input
          type='radio'
          checked={selected === item.id}
          value={item.id}
          onChange={(e) => selectHandler(e.target.value)}
        />
      </ItemValueContainer>

      <Button type='button' id='edit-modal' onClick={openEditModal}>
        <FaEdit />
      </Button>
      <Button type='button' id='delete-modal' onClick={openDeleteModal}>
        <FaTrashAlt />
      </Button>

      <ModalContainer status={editModal} exitHandler={closeEditModal}>
        <EditInstanceForm
          id={item.id}
          label='Item Value:'
          value={itemValue}
          changeHandler={handleItemValueChange}
          saveHandler={handleItemValueSave}
          cancelHandler={handleCancelEdit}
          disabled={isSaving}
          exitModal={closeEditModal}
        />
      </ModalContainer>

      <ModalContainer status={deleteModal} exitHandler={closeDeleteModal}>
        <ItemValueContainer>{itemValue}</ItemValueContainer>
        <DeleteInstanceMenu
          deleteHandler={handleDelete}
          cancelHandler={handleCancelDelete}
          disabled={isDeleting}
          exitModal={closeDeleteModal}
        />
      </ModalContainer>
    </ItemStyleWrapper>
  );
}

// export default Item;

export default compose(
  graphql(EXECUTE, { name: 'updateInstance' }),
  graphql(EXECUTE, { name: 'deleteInstance' })
)(Item);
