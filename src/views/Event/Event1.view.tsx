"use client";
import styled from "styled-components";

const OptionContainer = styled.div`
  padding: 70px;
`;

const MenuList = styled.ul`
  display: flex;
  gap: 30px;
  list-style: none;
  font-size: 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-left: 7%;
  margin-top: 60px;
  gap: 30px;
`;

const ItemContainer = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid red;
`;

const ItemInfo = styled.div`
  margin-top: 10px;
  text-align: center;
`;

export default function Event1View() {
  return (
    <>
      {/* <SearchBox/> */}
      <OptionContainer>
        <MenuList>
          <li>전체</li>
          <li>페어</li>
          <li>페스타</li>
          <li>마켓</li>
        </MenuList>
      </OptionContainer>
      <GridContainer>
        <ItemContainer>
          <div></div>
          <ItemInfo>
            <p>이름</p>
            <p>메뉴명</p>
          </ItemInfo>
        </ItemContainer>
        <ItemContainer>
          <div></div>
          <ItemInfo>
            <p>이름</p>
            <p>메뉴명</p>
          </ItemInfo>
        </ItemContainer>
        <ItemContainer>
          <div></div>
          <ItemInfo>
            <p>이름</p>
            <p>메뉴명</p>
          </ItemInfo>
        </ItemContainer>
        <ItemContainer>
          <div></div>
          <ItemInfo>
            <p>이름</p>
            <p>메뉴명</p>
          </ItemInfo>
        </ItemContainer>
        <ItemContainer>
          <div></div>
          <ItemInfo>
            <p>이름</p>
            <p>메뉴명</p>
          </ItemInfo>
        </ItemContainer>
      </GridContainer>
    </>
  );
}
