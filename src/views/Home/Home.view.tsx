"use client";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useRouter } from "next/navigation";
import styles from "./Home.view.module.scss";
import cn from "classnames/bind";
import { useState } from "react";
import { LINK_ROUTE } from "@/constants/link.constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Link from "next/link";
import { RestaurantImage } from "@/components/RestaurantImage/RestaurantImage";
import useIsMobile from "@/hooks/useIsMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const cx = cn.bind(styles);

type HomeViewProps = {
  data: Array<
    Restaurant.GetList.Response[number] & { initialBlogImages: string[] }
  >;
};

export default function HomeView(props: HomeViewProps) {
  const { data } = props;

  let router = useRouter();
  const [showItems, setShowItems] = useState(6);
  const isMobile = useIsMobile();
  const [customQuestion, setCustomQuestion] = useState<string>(""); // 추가

  function randomItem(arr: any, num: any) {
    const mix = arr.sort(() => 0.5 - Math.random());
    return mix.slice(0, num);
  }

  const randomResList = React.useMemo(() => {
    return randomItem(data, showItems);
  }, [data, showItems]); // data나 showItems가 변경될 때만 재계산

  const cafeList = React.useMemo(() => {
    return data.filter((item) => item.category === "과자점");
  }, [data]);

  const goDetail = (id: string) => {
    router.push(LINK_ROUTE.RESTAURANT.DETAIL.uri({ id }));
  };

  const FAQ_QUESTIONS = [
    "비건 음식점에 가면 보통 뭐 먹어요?",
    "고기 없이도 배부를 수 있나요?",
    "비건 초보자가 실패 안 하는 메뉴 추천해줘",
    "비건 음식은 맛이 없지 않나요?",
    "비건이랑 비건 옵션은 뭐가 다른가요?",
  ];

  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchFaqAnswer = async (question: string) => {
    setSelectedQuestion(question);
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/ai/faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("답변을 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cx("Wrapper")}>
      {/* <div className={cx("Banner")}>
        <img src="/vegan.png" alt="배너이미지" width={300} height={350} />
        <img src="/vegan2.png" alt="배너이미지" width={300} height={350} />
        <img src="/vegan3.png" alt="배너이미지" width={300} height={350} />
        <img src="/vegan4.png" alt="배너이미지" width={290} height={350} />
      </div> */}
      {/* <SearchBox
        placeholder="음식점,카페, 제품 등등을 검색해보세요"
        value={undefined}
        onChange={undefined}
      /> */}

      <section className={cx("Content")}>
        <div className={cx("Popular")}>
          <div className={cx("Header")}>
            <h2>인기 식당</h2>
            <p
              className={cx("More")}
              onClick={() => router.push("/restaurant")}
            >
              더보기
            </p>
          </div>{" "}
          <div className={cx("RestauantContent")}>
            {randomResList.map((data: any, index: number) => {
              const imageUrl = data.initialBlogImages?.[0];
              return (
                <ul key={index}>
                  <li>
                    <Link
                      className={cx("Link")}
                      href={LINK_ROUTE.RESTAURANT.DETAIL.uri({ id: data.id })}
                    >
                      <div className={cx("Thumbnail")}>
                        <RestaurantImage src={imageUrl} alt={data.upso_name} />
                      </div>
                      <button className={cx("Name")}>
                        <p>{data.upso_name} </p>
                        <p>[{data.cgg_code_name}]</p>
                      </button>
                    </Link>
                  </li>
                </ul>
              );
            })}{" "}
          </div>
        </div>

        <div className={cx("CafeWrapper")}>
          <div className={cx("Header")}>
            <h2>비건 카페</h2>
            <p className={cx("More")} onClick={() => router.push("/cafe")}>
              더보기
            </p>
          </div>

          <div className={cx("CafeContent")}>
            <Swiper
              className={cx("Swiper")}
              wrapperClass={cx("SwipperWrapper")}
              spaceBetween={50}
              slidesPerView={isMobile ? 2 : 3}
              onSwiper={(swiper) => console.log(swiper)}
              pagination={{ clickable: true, dynamicBullets: true }}
              modules={[Autoplay, Pagination]}
            >
              {cafeList?.map((item) => {
                const imageUrl = item.initialBlogImages?.[0];
                return (
                  <SwiperSlide key={item.id} className={cx("Slide")}>
                    <Link
                      className={cx("Link")}
                      href={LINK_ROUTE.RESTAURANT.DETAIL.uri({ id: item.id })}
                    >
                      <div className={cx("Thumbnail")}>
                        <RestaurantImage src={imageUrl} alt={item.upso_name} />
                      </div>
                      <button className={cx("Name")}>
                        <p>{item.upso_name} </p>
                        <p>[{item.cgg_code_name}]</p>
                      </button>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <div className={cx("FaqList")}>
          <h2 className={cx("Title")}>
            탭을 클릭하고 입력하여 궁금한 점을 물어보세요!
          </h2>
          <div className={cx("AnswerContent")}>
            {FAQ_QUESTIONS.map((q) => (
              <button
                key={q}
                className={cx("FaqButton", {
                  active: selectedQuestion === q,
                })}
                onClick={() => fetchFaqAnswer(q)}
              >
                {q}
              </button>
            ))}
            {answer && (
              <div className={cx("AnswerBox")}>
                {loading ? (
                  <p className={cx("Answer")}>답변을 불러오는 중...</p>
                ) : (
                  <p className={cx("Answer")}>{answer}</p>
                )}
              </div>
            )}
            <div className={cx("CustomQuestion")}>
              <input
                type="text"
                className={cx("QuestionInput")}
                placeholder="질문을 선택하거나 새로운 질문을 입력해 보세요"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && customQuestion.trim()) {
                    fetchFaqAnswer(customQuestion);
                  }
                }}
              />

              <FontAwesomeIcon
                className={cx("SendIcon")}
                icon={faCircleUp}
                onClick={() => {
                  if (customQuestion.trim()) {
                    fetchFaqAnswer(customQuestion);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
