"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PiPlantFill } from "react-icons/pi";
import { GiRoastChicken } from "react-icons/gi";
import { LuMilk } from "react-icons/lu";
import styles from "./Brand.view.module.scss";
import cn from "classnames/bind";
import { FaCow, FaEgg, FaFish } from "react-icons/fa6";
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
            <p className={cx("description")}>
              채소, 과일, 해초 따위의 식물성 음식 이외에는 아무것도 먹지 않는
              철저하고 완전한 채식주의자를 뜻해요. 고기는 물론 우유, 달걀도 먹지
              않으며 어떤 이들은 실크나 가죽같이 동물에게서 원료를 얻는 제품도
              사용하지 않아요.
            </p>
          </div>

          <h2 className={cx("SubTitle")}>
            비건이 무엇인가요?
            <br />
            What is vegan?
          </h2>
        </div>
        <div className={cx("Divider")} />
        <div className={cx("Content2")}>
          <h2 className={cx("TitlePurpose")}>
            Veganer의 추구하는 가치는 무엇인가요? <br />
            What is our purpose?
          </h2>
          <div className={cx("TitlePurposeContent")}>
            기후변화대응을 위해 작은 실천움직임에 대한 관심도가 확산되면서
            사회적 인식 및 소비 또한 자연친환경 스타일로 확산되는 추세입니다.
            <span>
              ‘제로 웨이스트’, ‘비건’, 저탄소’ 등등 환경 보호 관련 캠페인 및
              사업 또한 추진되고 있습니다. Veganer는 현재,새로운 세대를 위해
              작은 행동일지라도 환경 보호에 이바지할 수 있도록 발판을
              마련해드리고 싶습니다.
            </span>
            <span>
              비건에 대한 거부감 및 무관심을 친밀함 또는 익숙함으로 느껴지도록
              작은 관심들이 모여 함께 공존하는 지구의 평화에 함께 해주세요.
            </span>
          </div>
        </div>

        <div className={cx("Content3")}>
          <div className={cx("Title")}>
            <h2>비건에도 단계가 있다는 사실을 알고계시나요?</h2>
            <h2>비건이라고 해서 only 채식만 섭취하는게 아니라는 사실!</h2>
          </div>
          <div>
            <div className={cx("Container")}>
              <div className={cx("LeftSide")}>
                <div className={cx("Step")}>
                  <p>
                    <PiPlantFill />
                    플렉시 테리언
                  </p>
                  채식을 실천하지만 상황에 따라 육식을 겸하는 단계
                </div>
              </div>

              <div className={cx("Icons")}>
                <FaCow size={50} />
                <GiRoastChicken size={50} />
                <FaFish size={50} />
                <FaEgg size={50} />
                <LuMilk size={50} />
              </div>
            </div>
            <div className={cx("Container")}>
              <div className={cx("LeftSide")}>
                <div className={cx("Step")}>
                  <p>
                    <PiPlantFill />
                    폴로 베지테리언
                  </p>
                  동물성 원료 중 닭까지 섭취하는 단계
                </div>
              </div>
              <div className={cx("Icons")}>
                <FaCow size={50} />
                <GiRoastChicken size={50} />
                <FaFish className={cx("Icon")} size={50} />
                <FaEgg className={cx("Icon")} size={50} />
                <LuMilk className={cx("Icon")} size={50} />
              </div>
            </div>
          </div>
          <div className={cx("Container")}>
            <div className={cx("LeftSide")}>
              <div className={cx("Step")}>
                <p>
                  <PiPlantFill />
                  페스코 베지테리언
                </p>
                동물성 고기는 먹지 않지만 해산물은 섭취하는 단계
              </div>
            </div>
            <div className={cx("Icons")}>
              <FaCow className={cx("Icon")} size={50} />
              <GiRoastChicken className={cx("Icon")} size={50} />
              <FaFish className={cx("Icon")} size={50} />
              <FaEgg size={50} />
              <LuMilk size={50} />
            </div>
          </div>
          <div className={cx("Container")}>
            <div className={cx("LeftSide")}>
              <div className={cx("Step")}>
                <p>
                  <PiPlantFill />
                  락토-오보 베지테리언
                </p>
                육류 및 생선류는 먹지 않으며 우유,달걀 둘 다 섭취하는 단계
              </div>
            </div>
            <div className={cx("Icons")}>
              <FaCow className={cx("Icon")} size={50} />
              <GiRoastChicken className={cx("Icon")} size={50} />
              <FaFish className={cx("Icon")} size={50} />
              <FaEgg size={50} />
              <LuMilk size={50} />
            </div>
          </div>
          <div className={cx("Container")}>
            <div className={cx("LeftSide")}>
              <div className={cx("Step")}>
                <p>
                  <PiPlantFill />
                  오보 베지테리언
                </p>
                고기, 생선, 유제품은 먹지 않지만,동물성 원료 중 달걀까지만
                섭취하는단계
              </div>
            </div>
            <div className={cx("Icons")}>
              <FaCow className={cx("Icon")} size={50} />
              <GiRoastChicken className={cx("Icon")} size={50} />
              <FaFish className={cx("Icon")} size={50} />
              <FaEgg size={50} />
              <LuMilk style={{ opacity: "50%" }} size={50} />
            </div>
          </div>
          <div className={cx("Container")}>
            <div className={cx("LeftSide")}>
              <div className={cx("Step")}>
                <p>
                  <PiPlantFill />
                  락토 베지테리언
                </p>
                고기, 생선, 달걀 등 동물성 식품은 먹지 않지만 동물성 원료 중{" "}
                <br />
                우유까지만 섭취하는 단계
              </div>
            </div>
            <div className={cx("Icons")}>
              <FaCow className={cx("Icon")} size={50} />
              <GiRoastChicken className={cx("Icon")} size={50} />
              <FaFish className={cx("Icon")} size={50} />
              <FaEgg className={cx("Icon")} size={50} />
              <LuMilk size={50} />
            </div>
          </div>

          <div className={cx("Container")}>
            <div className={cx("LeftSide")}>
              <div className={cx("Step")}>
                <p>
                  <PiPlantFill />
                  비건
                </p>
                고기, 생선, 유제품, 달걀도 일절 섭취하지 않는 단계
              </div>
            </div>
            <div className={cx("Icons")}>
              <FaCow className={cx("Icon")} size={50} />
              <GiRoastChicken className={cx("Icon")} size={50} />
              <FaFish className={cx("Icon")} size={50} />
              <FaEgg className={cx("Icon")} size={50} />
              <LuMilk className={cx("Icon")} size={50} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandView;
