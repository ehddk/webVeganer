import { BsRobot } from "react-icons/bs";
import styles from "./Chat.module.scss";
import React from "react";
import cn from "classnames/bind";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineEnter } from "react-icons/ai";
const cx = cn.bind(styles);
const Chat = () => {
  const [customQuestion, setCustomQuestion] = useState<string>(""); // 추가

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
  const [isMounted, setIsMounted] = useState(false);
  const chatAreaRef = React.useRef<HTMLDivElement>(null);
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
      setCustomQuestion("");
    } catch (error) {
      setAnswer("답변을 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className={cx("FaqList")}>
        <div className={cx("FaqHeader")}>
          <h2 className={cx("FaqTitle")}>
            <BsRobot className={cx("FaqTitleIcon")} />
            비거너 AI에게 물어보세요
          </h2>
          <p className={cx("FaqSubtitle")}>
            비건 음식·카페에 대해 궁금한 점이 있다면 무엇이든 물어보세요!
          </p>
        </div>

        <div className={cx("ChatContainer")}>
          {/* 추천 질문 칩 */}
          <div className={cx("Suggestions")}>
            <span className={cx("SuggestionsLabel")}>✨ 추천 질문</span>
            <div className={cx("ChipList")}>
              {FAQ_QUESTIONS.map((q) => (
                <button
                  key={q}
                  className={cx("Chip", {
                    active: selectedQuestion === q,
                  })}
                  onClick={() => fetchFaqAnswer(q)}
                  disabled={loading}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* 채팅 영역 */}
          <div className={cx("ChatArea")} ref={chatAreaRef}>
            {!selectedQuestion && !answer ? (
              <div className={cx("ChatEmpty")}>
                <BsRobot className={cx("EmptyIcon")} />
                <p className={cx("EmptyText")}>
                  위 추천 질문을 클릭하거나, 아래에 직접 입력해 보세요
                </p>
              </div>
            ) : (
              <>
                {selectedQuestion && (
                  <div className={cx("Bubble", "BubbleUser")}>
                    <FaUserCircle className={cx("Avatar", "AvatarUser")} />
                    <div className={cx("BubbleContent")}>
                      {selectedQuestion}
                    </div>
                  </div>
                )}
                {(loading || answer) && (
                  <div className={cx("Bubble", "BubbleAi")}>
                    <BsRobot className={cx("Avatar", "AvatarAi")} />
                    <div className={cx("BubbleContent")}>
                      {loading ? (
                        <div className={cx("TypingDots")}>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      ) : (
                        answer
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 입력 영역 */}
          <form
            className={cx("InputArea")}
            onSubmit={(e) => {
              e.preventDefault();
              if (customQuestion.trim() && !loading) {
                fetchFaqAnswer(customQuestion);
              }
            }}
          >
            <input
              type="text"
              className={cx("QuestionInput")}
              placeholder="질문을 입력해 보세요..."
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className={cx("SendButton")}
              disabled={!customQuestion.trim() || loading}
              aria-label="전송"
            >
              <AiOutlineEnter />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
