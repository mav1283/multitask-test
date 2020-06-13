import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';
//import Modal from 'react-modal';
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
`
);

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
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

const ItemValueContainer = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1.25rem;
  text-align: left;
  text-transform: capitalize;
  text-decoration: ${(props) => props.isChecked && 'line-through'};
  color: ${(props) => (props.isChecked ? '#dae1e5' : '#000')};
`;

function Item({
  item,
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
}) {
  const [itemValue, updateItemValue] = useState(item.value);
  const [editModal, setEditModal] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);
  const [isChecked, updateIsChecked] = useState(false);

  const handleEditModal = () => setEditModal((prevState) => !prevState);
  const handleDeleteModal = () => setDeleteModal((prevState) => !prevState);

  if (!selected) {
    return (
      <ItemStyleWrapper>
        <ItemCheckBox htmlFor={item.id}>
          <input
            type='checkbox'
            id={item.id}
            checked={isChecked}
            onChange={handleItemCheckedStatus}
          />
          <FaCheck />
        </ItemCheckBox>
        <ItemValueContainer
          onClick={() => onSelect(item.id)}
          isChecked={isChecked}
        >
          {itemValue}
        </ItemValueContainer>
      </ItemStyleWrapper>
    );
  }

  function handleItemCheckedStatus() {
    updateIsChecked((previousState) => !previousState);
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

    setEditModal(false);
    updateIsSaving(false);
  }

  function handleCancelEdit() {
    setEditModal(false);
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
    } catch (e) {
      updateIsDeleting(false);
    }
  }

  function handleCancelDelete() {
    setDeleteModal(false);
  }

  return (
    <ItemStyleWrapper selected={selected}>
      <ItemCheckBox htmlFor={item.id}>
        <input
          type='checkbox'
          id={item.id}
          checked={isChecked}
          onChange={handleItemCheckedStatus}
        />
      </ItemCheckBox>
      <ItemValueContainer>{itemValue}</ItemValueContainer>

      <Button type='button' onClick={handleEditModal}>
        <FaEdit />
      </Button>
      <Button type='button' onClick={handleDeleteModal}>
        <FaTrashAlt />
      </Button>
      <ModalContainer status={editModal} exithandler={handleEditModal}>
        <div className='modal-body'>
          <EditInstanceForm
            id={item.id}
            label='Item Value:'
            value={itemValue}
            onChange={handleItemValueChange}
            onSave={handleItemValueSave}
            onCancel={handleCancelEdit}
            disabled={isSaving}
          />
        </div>
      </ModalContainer>
      <ModalContainer status={deleteModal} exithandler={handleDeleteModal}>
        <div className='modal-body'>
          <ItemValueContainer>{itemValue}</ItemValueContainer>
          <DeleteInstanceMenu
            onDelete={handleDelete}
            onCancel={handleCancelDelete}
            disabled={isDeleting}
          />
        </div>
      </ModalContainer>
    </ItemStyleWrapper>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'updateInstance' }),
  graphql(EXECUTE, { name: 'deleteInstance' })
)(Item);
