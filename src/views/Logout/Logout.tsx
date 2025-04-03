"use client";

import styled from "styled-components";
const Del = styled.button`
  height: 20px;
  border: 0;
  margin: 15px 0 0 30px;
`;
export default function Logout() {
  return (
    <Del
      onClick={() => {
        //signOut();
      }}
    >
      로그아웃
    </Del>
  );
}
