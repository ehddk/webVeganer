"use client";
import styles from "./Tab2.view.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);

export default function Tab2View() {
  return (
    <>
      <div style={{ padding: "80px 0 0 120px" }}>
        <p>전체</p>
        <div className={cx("GridContainer")}>
          <div className={cx("ItemContainer")}>
            <div className={cx("DetailContainer")}>
              <div className={cx("LeftContainer")}>
                <img
                  src="/milk.png"
                  alt=""
                  style={{ width: "100px", padding: "20px" }}
                ></img>
              </div>
              <div className={cx("RightContainer")}>
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
              </div>
            </div>
          </div>
          <div className={cx("ItemContainer")}>
            <div className={cx("DetailContainer")}>
              <div className={cx("LeftContainer")} />
              <div className={cx("RightContainer")} />
            </div>
          </div>
          <div className={cx("ItemContainer")}>
            <div className={cx("DetailContainer")}>
              <div className={cx("LeftContainer")} />
              <div className={cx("RightContainer")} />
            </div>
          </div>
          <div className={cx("ItemContainer")}>
            <div className={cx("DetailContainer")}>
              <div className={cx("LeftContainer")} />
              <div className={cx("LeftContainer")} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
