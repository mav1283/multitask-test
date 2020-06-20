import React, { useRef, useEffect, useState } from 'react';
//import React, { Component, createRef } from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import { v4 } from 'uuid';

// import Modal from 'react-modal';
// import '../../Modals/modals.css';

import ModalContainer from '../../Modals/ModalContainer';

import { FaPlus } from 'react-icons/fa';

import { flattenData } from '../../../flattenData';

import ItemCreationForm from '../ItemCreationForm';
import Item from '../Item';

import { SOURCE_LIST_ID } from '../../../config';
import { LIST_RELATIONSHIPS, SOURCE_LIST_QUERY } from '../../source-props/list';

// np__added_start unit: list, comp: Items, loc: styling

// add styling here

const ItemsPageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  grid-gap: 1em;
  min-width: 240px;
  align-self: center;
  align-items: start;
`;

const ItemsStyleWrapper = styled.div`
  display: grid;
  grid-gap: 1em;
  padding: 1.5em;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);
  background: #fff;
  align-items: start;
  height: auto !important;
`;

const ItemsContentStatus = styled.h3`
  display: flex;
  justify-content: start;
  text-align: left;
  margin: 0;
  color: ${(props) => (props.isEmpty ? '#6aa5fe' : '#b3b3b3')};
  font-weight: 400;
`;

const ItemsList = styled.ul`
  display: grid;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const AddTaskButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  line-height: 1;
  background: #4aa5d4;
  color: #fff;
  text-align: center;
  font-size: 1.06125rem;
  font-weight: 500;
  padding: 1em;
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
  svg {
    margin-left: 0.5em;
  }
`;

// np__added_end unit: list, comp: Items, loc: styling

function Items(props) {
  const wrapperRef = useRef();
  const [selectedItemId, setSelectedItemId] = useState('');
  const [addTaskModal, setAddTaskModal] = useState(false);

  // const handleClick = (e) => {
  //   const node = wrapperRef.current;

  //   if (node && node !== e.target && !node.contains(e.target)) {
  //     setSelectedItemId('');
  //   }
  // };

  const handleSelect = (id) => setSelectedItemId(id);
  const handleModal = () => setAddTaskModal((prevState) => !prevState);

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClick);
  //   return () => document.removeEventListener('mousedown', handleClick);
  // }, []);

  const { userId } = props;

  const parameters = {
    currentUser: userId,
  };

  return (
    <Unit
      id={SOURCE_LIST_ID}
      typeRelationships={LIST_RELATIONSHIPS}
      query={SOURCE_LIST_QUERY}
      parameters={parameters}
    >
      {({ loading, error, data, refetchQueries }) => {
        if (loading) return 'Loading...';

        if (error) {
          console.error(error);
          return `Error: ${error.graphQLErrors}`;
        }

        const items = data.unitData.map((el) => flattenData(el));

        return (
          <ItemsPageWrapper>
            <ItemsStyleWrapper
            // ref={wrapperRef} onClick={handleClick}
            >
              <ItemsContentStatus isEmpty={items.length !== 0 ? true : false}>
                {items.length !== 0 ? 'Active tasks' : 'No active tasks'}
              </ItemsContentStatus>
              <ItemsList>
                {items &&
                  items.map((item) => (
                    <Item
                      key={v4()}
                      parentId={userId}
                      item={item}
                      selected={selectedItemId}
                      refetchQueries={refetchQueries}
                      selectHandler={handleSelect}
                    />
                  ))}
              </ItemsList>
            </ItemsStyleWrapper>

            <AddTaskButton onClick={handleModal}>
              Add a task <FaPlus />
            </AddTaskButton>
            <ModalContainer status={addTaskModal} exithandler={handleModal}>
              <div className='modal-body'>
                <ItemCreationForm
                  userId={userId}
                  refetchQueries={refetchQueries}
                  exitModal={handleModal}
                />
              </div>
            </ModalContainer>
            {/* np__added_start unit: list, comp: Items, loc: renderEnding */}
            {/* np__added_end unit: list, comp: Items, loc: renderEnding */}
          </ItemsPageWrapper>
        );
      }}
    </Unit>
  );
}

export default Items;
