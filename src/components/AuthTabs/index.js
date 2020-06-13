import React, { useState } from 'react';
import styled from 'styled-components';

const AuthWrapper = styled.div`
  display: grid;
  grid-gap: 1em;
`;

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1em;
`;

const Button = styled.button(
  ({ selected }) => `

  background: transparent;
  opacity: ${selected ? 1.0 : 0.5};
  border: none;

  padding: 0;
  margin: 0;
  text-transform: uppercase;
  color: ${selected ? '#4AA5D4' : '#999'};
  cursor: ${selected ? 'initial' : 'pointer'};
  transition: opacity 0.5s ease;
  &:hover {
    opacity: 1.0;
    text-decoration: underline;
  }
`
);

const AuthTabs = ({ menuTitles, children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <AuthWrapper>
      <MenuContainer>
        {menuTitles.map((title, index) => (
          <Button
            key={index}
            selected={index === selectedTab}
            onClick={(e) => {
              e.preventDefault();

              setSelectedTab(index);
            }}
          >
            {title}
          </Button>
        ))}
      </MenuContainer>
      <div>
        {React.Children.map(children, (child, index) => {
          if (index !== selectedTab) {
            return null;
          }

          return <div className='test'>{child}</div>;
        })}
      </div>
    </AuthWrapper>
  );
};

export default AuthTabs;
