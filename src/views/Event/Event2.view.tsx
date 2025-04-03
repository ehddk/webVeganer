"use client";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 0 0 80px 0;
`;

const ItemContainer = styled.div`
  width: 600px;
  height: 200px;
  box-shadow: 3px 3px 2px lightgray;
  border: 1px solid lightgray;
`;

const DetailContainer = styled.div`
  display: flex;
  gap: 25px;
  padding: 20px;
`;

const LeftContainer = styled.div`
  width: 150px;
  height: 150px;
  border: 1px solid blue;
`;

const RightContainer = styled.div`
  width: 400px;
  height: 150px;
  border: 1px solid red;
`;

export default function Event2View() {
  return (
    <>
      <div style={{ padding: "80px 0 0 120px" }}>
        <p>전체</p>
        <GridContainer>
          <ItemContainer>
            <DetailContainer>
              <LeftContainer>
                <img
                  src="/milk.png"
                  alt=""
                  style={{ width: "100px", padding: "20px" }}
                ></img>
              </LeftContainer>
              <RightContainer>
                <div style={{ padding: "0 0 10px 10px" }}>
                  <h4>
                    한국비건진흥원, '비건전문가자격증' 온·오프라인 교육 개설
                  </h4>
                  <p>
                    식약처가 인정한 비건분야 민간자격증 취득을 위한 교육 개시
                    한국의 비건·식물기반식 시장 활성화와 문화 확산 위해 지속적
                    노력 다할 것
                  </p>
                </div>
              </RightContainer>
            </DetailContainer>
          </ItemContainer>
          <ItemContainer>
            <DetailContainer>
              <LeftContainer></LeftContainer>
              <RightContainer></RightContainer>
            </DetailContainer>
          </ItemContainer>
          <ItemContainer>
            <DetailContainer>
              <LeftContainer></LeftContainer>
              <RightContainer></RightContainer>
            </DetailContainer>
          </ItemContainer>
          <ItemContainer>
            <DetailContainer>
              <LeftContainer></LeftContainer>
              <RightContainer></RightContainer>
            </DetailContainer>
          </ItemContainer>
        </GridContainer>
      </div>
    </>
  );
}
