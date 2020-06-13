import styled from 'styled-components';

// export const Wrapper = styled.div`
//   width: 250px;

//   padding: 1em 0;

//   border: 1px solid rgba(0, 0, 0, 0.1);
//   border-radius: 10px 10px 10px 10px;
//   box-shadow: 10px 10px 8px -1px rgba(0, 0, 0, 0.6);
// `;

export const ErrorContainer = styled.div`
  font-size: 0.75rem;
  color: tomato;
`;

// export const Row = styled.div`
//   margin: 0.5em;
//   padding: 0.5em;
//   text-align: center;

//   input {
//     display: block;
//     margin: 0.5em auto;
//     width: 80%;
//   }
// `;

export const Wrapper = styled.div`
  display: grid;
  grid-gap: 1em;
  // min-width: 320px;
  // padding: 2em;
  // background: #fff;
  // border: 1px solid rgba(0, 0, 0, 0.1);
  // border-radius: 4px;
  // box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  form {
    display: inherit;
    grid-gap: inherit;
  }
`;

export const Row = styled.div`
  text-align: center;
`;

export const FormControl = styled.label`
  display: grid;
  grid-template-columns: 1fr;
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

export const SubmitButton = styled.button`
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
