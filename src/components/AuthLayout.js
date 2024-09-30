import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AuthCard = styled.div`
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const AuthLayout = ({ children }) => {
  return (
    <Wrapper>
      <AuthCard>
        {children}
      </AuthCard>
    </Wrapper>
  );
};

export default AuthLayout;
