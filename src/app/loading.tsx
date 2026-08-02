import cn from "classnames/bind";
import styles from "./loading.module.scss";

const cx = cn.bind(styles);

const SKELETON_CARD_COUNT = 6;

/**
 * 서버 컴포넌트의 데이터 페칭이 끝나기 전까지 보여줄 스켈레톤.
 *
 * 이 파일이 없으면 Next.js는 page.tsx의 await가 끝날 때까지 HTML을
 * 한 바이트도 내보내지 않는다. (= 백엔드 콜드 스타트 시간만큼 흰 화면)
 * loading.tsx가 있으면 헤더/푸터와 이 스켈레톤이 즉시 스트리밍된다.
 */
export default function Loading() {
  return (
    <div className={cx("Wrapper")} aria-busy="true" aria-live="polite">
      <span className="sr-only">불러오는 중입니다</span>

      <section className={cx("Content")}>
        <div className={cx("Section")}>
          <div className={cx("Block", "Title")} />

          <div className={cx("Grid")}>
            {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
              <div className={cx("Card")} key={index}>
                <div className={cx("Block", "CardImage")} />
                <div className={cx("Block", "CardLineLong")} />
                <div className={cx("Block", "CardLineShort")} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
