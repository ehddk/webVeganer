"use client";
import { PiPlantFill } from "react-icons/pi";
import { GiRoastChicken } from "react-icons/gi";
import { LuMilk } from "react-icons/lu";
import { FaCow, FaEgg, FaFish } from "react-icons/fa6";
import styles from "./Brand.view.module.scss";
import cn from "classnames/bind";
import React from "react";
import useIntersectionVisible from "@/hooks/useIntersectionVisible";

const cx = cn.bind(styles);

type FoodKey = "cow" | "chicken" | "fish" | "egg" | "milk";

const FOOD_ICONS: {
  key: FoodKey;
  Icon: React.ComponentType<{ size?: number }>;
  label: string;
}[] = [
  { key: "cow", Icon: FaCow, label: "소" },
  { key: "chicken", Icon: GiRoastChicken, label: "닭" },
  { key: "fish", Icon: FaFish, label: "생선" },
  { key: "egg", Icon: FaEgg, label: "달걀" },
  { key: "milk", Icon: LuMilk, label: "우유" },
];

type Level = {
  id: string;
  name: string;
  description: string;
  eats: FoodKey[];
  highlight?: boolean;
};

const LEVELS: Level[] = [
  {
    id: "flexi",
    name: "플렉시테리언",
    description: "채식을 실천하지만 상황에 따라 육식을 겸하는 단계",
    eats: ["cow", "chicken", "fish", "egg", "milk"],
  },
  {
    id: "pollo",
    name: "폴로 베지테리언",
    description: "동물성 원료 중 닭까지 섭취하는 단계",
    eats: ["chicken", "fish", "egg", "milk"],
  },
  {
    id: "pesco",
    name: "페스코 베지테리언",
    description: "동물성 고기는 먹지 않지만 해산물은 섭취하는 단계",
    eats: ["fish", "egg", "milk"],
  },
  {
    id: "lacto-ovo",
    name: "락토-오보 베지테리언",
    description: "육류 및 생선류는 먹지 않으며 우유, 달걀 둘 다 섭취하는 단계",
    eats: ["egg", "milk"],
  },
  {
    id: "ovo",
    name: "오보 베지테리언",
    description: "고기, 생선, 유제품은 먹지 않지만 달걀까지 섭취하는 단계",
    eats: ["egg"],
  },
  {
    id: "lacto",
    name: "락토 베지테리언",
    description: "고기, 생선, 달걀은 먹지 않으며 우유까지 섭취하는 단계",
    eats: ["milk"],
  },
  {
    id: "vegan",
    name: "비건",
    description:
      "고기, 생선, 유제품, 달걀도 일절 섭취하지 않는 가장 엄격한 단계",
    eats: [],
    highlight: true,
  },
];

function LevelCard({ level }: { level: Level }) {
  return (
    <div className={cx("LevelCard", { LevelCardHighlight: level.highlight })}>
      <div className={cx("LevelHeader")}>
        <PiPlantFill className={cx("LevelLeaf")} />
        <h3 className={cx("LevelName")}>{level.name}</h3>
      </div>
      <p className={cx("LevelDescription")}>{level.description}</p>
      <div className={cx("PipRow")}>
        {FOOD_ICONS.map(({ key, Icon, label }) => (
          <div
            key={key}
            className={cx("Pip", {
              PipActive: level.eats.includes(key),
            })}
            title={label}
            aria-label={`${label} ${level.eats.includes(key) ? "섭취" : "비섭취"}`}
          >
            <Icon size={20} />
          </div>
        ))}
      </div>
    </div>
  );
}

const REVEAL_OPTS = {
  threshold: 0.15,
  shouldResetOnExit: true,
} as const;

const BrandView = () => {
  // 섹션마다 자기 ref / isVisible을 가져야 각자 따로 fade-in 됨
  const intro = useIntersectionVisible<HTMLElement>(REVEAL_OPTS);
  const purpose = useIntersectionVisible<HTMLElement>(REVEAL_OPTS);
  const levels = useIntersectionVisible<HTMLElement>(REVEAL_OPTS);
  const cta = useIntersectionVisible<HTMLElement>(REVEAL_OPTS);

  return (
    <div className={cx("Wrapper")}>
      {/* HERO */}
      <section className={cx("Hero")}>
        <img className={cx("HeroImage")} src="/vegan.png" alt="비거너 히어로" />
        <div className={cx("HeroOverlay")} />
        <div className={cx("HeroContent")}>
          <div className={cx("HeroTagline")}>Be Veganer</div>
          <h1 className={cx("HeroTitle")}>지구를 위한 작은 실천</h1>
          <p className={cx("HeroSubtitle")}>
            비건은 단순한 식습관을 넘어, 자연과 함께 살아가는 가치입니다.
            <br />
            우리의 작은 선택이 지구를 지키는 큰 힘이 됩니다.
          </p>
        </div>
      </section>

      {/* WHAT IS VEGAN */}
      <section
        ref={intro.ref}
        id="Info"
        className={cx("Section", "SectionCream", "Reveal", {
          visible: intro.isVisible,
        })}
      >
        <div className={cx("SectionInner", "IntroGrid")}>
          <div className={cx("SectionHead")} style={{ marginBottom: 0 }}>
            <span className={cx("Eyebrow")}>What is Vegan?</span>
            <h2 className={cx("SectionTitle")}>
              우선, <strong>비건</strong>이<br />
              무엇인가요?
            </h2>
            <p className={cx("Body")}>
              채소, 과일, 해초 따위의 식물성 음식 이외에는 아무것도 먹지 않는
              철저하고 완전한 채식주의자를 뜻해요. 고기는 물론{" "}
              <strong>우유, 달걀</strong>도 먹지 않으며, 어떤 이들은 실크나
              가죽처럼 동물에게서 원료를 얻는 제품도 사용하지 않습니다.
            </p>
          </div>
          <img className={cx("IntroImage")} src="/vegan2.png" alt="비건 소개" />
        </div>
      </section>

      {/* OUR PURPOSE */}
      <section
        ref={purpose.ref}
        id="purpose"
        className={cx("Section", "SectionGreen", "Reveal", {
          visible: purpose.isVisible,
        })}
      >
        <div className={cx("SectionInner", "IntroGrid", "IntroReverse")}>
          <div className={cx("SectionHead")} style={{ marginBottom: 0 }}>
            <span className={cx("Eyebrow")}>Our Purpose</span>
            <h2 className={cx("SectionTitle")}>
              <strong>Veganer</strong>가<br />
              추구하는 가치
            </h2>
            <p className={cx("Body")}>
              기후변화 대응을 위한 작은 실천이 사회 전반으로 확산되며, 소비
              트렌드 또한 <strong>자연 친화</strong>적인 방향으로 움직이고
              있어요. ‘제로 웨이스트’, ‘비건’, ‘저탄소’ 등 환경 보호 캠페인이
              늘어나는 지금, <strong>Veganer</strong>는 새로운 세대가 작은
              행동으로도 환경 보호에 이바지할 수 있는 발판을 마련하고자 합니다.
            </p>
          </div>
          <img
            className={cx("IntroImage")}
            src="/vegan3.png"
            alt="비거너 가치"
          />
        </div>
      </section>

      {/* LEVELS */}
      <section
        ref={levels.ref}
        id="levels"
        className={cx("Section", "Reveal", { visible: levels.isVisible })}
      >
        <div className={cx("SectionInner")}>
          <div className={cx("SectionHead", "LevelsHead")}>
            <span className={cx("Eyebrow")}>Vegan Levels</span>
            <h2 className={cx("SectionTitle")}>
              비건에도 <strong>단계</strong>가 있습니다
            </h2>
            <p className={cx("Body")}>
              비건이라고 해서 채식만 섭취하는 것은 아니에요. 자신의 라이프
              스타일에 맞는 단계부터 시작해보세요.
            </p>
          </div>

          <div className={cx("LevelsGrid")}>
            {LEVELS.map((level) => (
              <LevelCard key={level.id} level={level} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={cta.ref}
        id="cta"
        className={cx("CTA", "Reveal", { visible: cta.isVisible })}
      >
        <div className={cx("CTAInner")}>
          <h2 className={cx("CTATitle")}>작은 관심이 모여 공존이 됩니다</h2>
          <p className={cx("CTASubtitle")}>
            비건에 대한 거부감과 무관심을 친밀함과 익숙함으로.
            <br />
            오늘 한 끼의 선택부터 함께해주세요.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BrandView;
