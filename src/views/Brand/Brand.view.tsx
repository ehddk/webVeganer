"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling,
  faFish,
  faDrumstickBite,
  faCow,
  faEgg,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Brand.view.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);

const BrandView = () => {
  return (
    <>
      <div className={cx("Banner")}>
        <div className={cx("Inside")}>
          <img
            src="../brand.png"
            style={{ width: "100%", height: "auto", marginTop: "-1px" }}
          />
        </div>
      </div>
      <div className={cx("Intro")}>
        <div className={cx("Content1")}>
          <div className={cx("Left")}>
            <p style={{ fontSize: "15px", lineHeight: "20px" }}>
              채소, 과일, 해초 따위의 식물성 음식 이외에는 아무것도 <br />
              먹지 않는 철저하고 완전한 채식주의자를 뜻해요.
              <br />
              고기는 물론 우유, 달걀도 먹지 않으며 어떤 이들은 실크나 가죽같이{" "}
              <br />
              동물에게서 원료를 얻는 제품도 사용하지 않아요.
            </p>
          </div>
          <div className={cx("Right")}>
            <h1 className={cx("SubTitle")}>
              비건이 무엇인가요?
              <br />
              What is vegan?
            </h1>
          </div>
        </div>
        <div className={cx("Content2")}>
          <h2 className={cx("TitlePurpose")}>
            Veganer의 추구하는 가치는 무엇인가요? <br />
            What is our purpose?
          </h2>
          <p className={cx("TitlePurposeContent")}>
            기후변화대응을 위해 작은 실천움직임에 대한 관심도가 확산되면서
            사회적 인식 및 소비 또한 자연친환경 스타일로 확산되는 추세입니다.
            <br />
            ‘제로 웨이스트’, ‘비건’, 저탄소’ 등등 환경 보호 관련 캠페인 및 사업
            또한 추진되고 있습니다. Veganer는 현재,새로운 세대를 위해 작은
            <br />
            행동일지라도 환경 보호에 이바지할 수 있도록 발판을 마련해드리고
            싶습니다. 비건에 대한 거부감 및 무관심을 친밀함 또는 익숙함으로
            <br />
            느껴지도록 작은 관심들이 모여 함께 공존하는 지구의 평화에 함께
            해주세요.
          </p>
        </div>
      </div>
      <div className={cx("Cont")}>
        <div className={cx("Title")}>
          <h2>비건에도 단계가 있다는 사실을 알고계시나요?</h2>
          <h2 style={{ marginLeft: "-40px" }}>
            비건이라고 해서 only 채식만 섭취하는게 아니라는 사실!
          </h2>
        </div>
        <div>
          <div className={cx("Step")}>
            <div className={cx("LeftSide")}>
              <p className={cx("Sort")}>
                <FontAwesomeIcon icon={faSeedling} />
                "플렉시 테리언"
                <br />
                <br />
                채식을 실천하지만 상황에 따라 육식을 겸하는 단계
              </p>
            </div>

            <div
              style={{
                padding: "30px",
                width: "50%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  margin: "60px 0 0 90px",
                }}
              >
                <FontAwesomeIcon icon={faCow} style={{ height: "60px" }} />
                <FontAwesomeIcon
                  icon={faDrumstickBite}
                  style={{ height: "60px" }}
                />
                <FontAwesomeIcon icon={faFish} style={{ height: "60px" }} />
                <FontAwesomeIcon icon={faEgg} style={{ height: "60px" }} />
                <img
                  src="/milk.png"
                  alt="milk"
                  style={{ width: "70px", height: "60px" }}
                />
              </div>
            </div>
          </div>
          <div className={cx("Step")}>
            <div className={cx("LeftSide")}>
              <div style={{ display: "flex", gap: "20px", margin: "0 auto" }}>
                <FontAwesomeIcon
                  icon={faCow}
                  style={{ height: "60px", color: "gray" }}
                />
                <FontAwesomeIcon
                  icon={faDrumstickBite}
                  style={{ height: "60px" }}
                />
                <FontAwesomeIcon icon={faFish} style={{ height: "60px" }} />
                <FontAwesomeIcon icon={faEgg} style={{ height: "60px" }} />
                <img
                  className={cx("Img")}
                  src="/milk.png"
                  alt="milk"
                  style={{ width: "70px", height: "60px" }}
                />
              </div>
            </div>
            <div className={cx("RightSide")}>
              <h2 className={cx("TitlePurpose")}>
                <p className={cx("Sort")}>
                  <FontAwesomeIcon icon={faSeedling} />
                  폴로 베지테리언
                  <br />
                  <br />
                  동물성 원료 중 닭까지 섭취하는 단계
                </p>
              </h2>
            </div>
          </div>
          <div className={cx("Step")}>
            <div className={cx("LeftSide")}>
              <p className={cx("Sort")}>
                <FontAwesomeIcon icon={faSeedling} />
                페스코 베지테리언
                <br />
                <br />
                동물성 고기는 먹지 않지만 해산물은 섭취하는 단계
              </p>
            </div>
            <div className={cx("RightSide")}>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  // margin: "60px 0 0 90px",
                }}
              >
                <FontAwesomeIcon
                  icon={faCow}
                  style={{ height: "60px", color: "gray" }}
                />
                <FontAwesomeIcon
                  icon={faDrumstickBite}
                  style={{ height: "60px", color: "gray" }}
                />
                <FontAwesomeIcon icon={faFish} style={{ height: "60px" }} />
                <FontAwesomeIcon icon={faEgg} style={{ height: "60px" }} />
                <img src="/milk.png" alt="milk" className={cx("Img")} />
              </div>
            </div>
          </div>
          <div className={cx("Step")}>
            <div className={cx("LeftSide")}>
              <div style={{ display: "flex", gap: "20px", margin: "0 auto" }}>
                <FontAwesomeIcon icon={faCow} className={cx("Icon")} />
                <FontAwesomeIcon
                  icon={faDrumstickBite}
                  className={cx("Icon")}
                />
                <FontAwesomeIcon icon={faFish} className={cx("Icon")} />
                <FontAwesomeIcon icon={faEgg} style={{ height: "60px" }} />
                <img
                  src="/milk.png"
                  alt="milk"
                  style={{ width: "70px", height: "60px" }}
                />
              </div>
            </div>
            <div className={cx("RightSide")}>
              <h2 className={cx("TitlePurpose")}>
                <p className={cx("Sort")}>
                  <FontAwesomeIcon icon={faSeedling} />
                  락토-오보 베지테리언
                  <br />
                  <br />
                  육류 및 생선류는 먹지 않으며 우유,달걀 둘 다 섭취하는 단계
                </p>
              </h2>
            </div>
          </div>
          <div className={cx("Step")}>
            <div className={cx("LeftSide")}>
              <p className={cx("Sort")}>
                <FontAwesomeIcon icon={faSeedling} />
                오보 베지테리언
                <br />
                <br />
                고기, 생선, 유제품은 먹지 않지만,동물성 원료 중 달걀까지만
                <br /> 섭취하는단계
              </p>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  margin: "60px 0 0 90px",
                }}
              >
                <FontAwesomeIcon icon={faCow} className={cx("Icon")} />
                <FontAwesomeIcon
                  icon={faDrumstickBite}
                  className={cx("Icon")}
                />
                <FontAwesomeIcon icon={faFish} className={cx("Icon")} />
                <FontAwesomeIcon icon={faEgg} style={{ height: "60px" }} />
                <img
                  src="/milk.png"
                  alt="milk"
                  style={{ width: "70px", height: "60px", opacity: "50%" }}
                />
              </div>
            </div>
          </div>
          <div className={cx("Step")}>
            <div className={cx("LeftSide")}>
              <div style={{ display: "flex", gap: "20px", margin: "0 auto" }}>
                <FontAwesomeIcon icon={faCow} className={cx("Icon")} />
                <FontAwesomeIcon
                  icon={faDrumstickBite}
                  className={cx("Icon")}
                />
                <FontAwesomeIcon icon={faFish} className={cx("Icon")} />
                <FontAwesomeIcon icon={faEgg} className={cx("Icon")} />
                <img
                  src="/milk.png"
                  alt="milk"
                  style={{ width: "70px", height: "60px" }}
                />
              </div>
            </div>
            <div className={cx("RightSide")}>
              <h2 className={cx("TitlePurpose")}>
                <p className={cx("Sort")}>
                  <FontAwesomeIcon icon={faSeedling} />
                  락토 베지테리언
                  <br />
                  <br />
                  고기, 생선, 달걀 등 동물성 식품은 먹지 않지만 동물성 원료 중{" "}
                  <br />
                  우유까지만 섭취하는 단계
                </p>
              </h2>
            </div>
          </div>
          <div className={cx("Step")}>
            <div className={cx("LeftSide")}>
              <p className={cx("Sort")}>
                <FontAwesomeIcon icon={faSeedling} />
                비건
                <br />
                <br />
                고기, 생선, 유제품은 먹지 않지만,동물성 원료 중 <br />
                달걀까지만 섭취하는단계
              </p>
            </div>
            <div className={cx("RightSide")}>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  margin: "60px 0 0 90px",
                }}
              >
                <FontAwesomeIcon icon={faCow} className={cx("Icon")} />
                <FontAwesomeIcon
                  icon={faDrumstickBite}
                  className={cx("Icon")}
                />
                <FontAwesomeIcon icon={faFish} className={cx("Icon")} />
                <FontAwesomeIcon icon={faEgg} className={cx("Icon")} />
                <img
                  src="/milk.png"
                  alt="milk"
                  style={{ width: "70px", height: "60px", opacity: "50%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandView;
