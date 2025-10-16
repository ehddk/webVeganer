"use client";

import React, { useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import cn from "classnames/bind";
import styles from "./NumberPagination.module.scss";

const cx = cn.bind(styles);

interface NumberPaginationProps {
  /** 전체 항목 수 (서버로부터 받음) */
  total: number;
  /** 한 페이지당 항목 수 (예: 15) */
  limit: number;
  /** 한 번에 보여줄 페이지 블록 수 (예: 5) */
  pageCount: number;
  /** 추가적인 CSS 클래스 */
  className?: string;
  /** 페이지 변경 시 호출될 콜백 함수 */
  onChange: (newPage: number) => void;
}

const NumberPagination = (props: NumberPaginationProps) => {
  const { total, limit, pageCount, className, onChange } = props;
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. 현재 페이지 번호 계산
  const currentOffset = parseInt(searchParams?.get("offset") || "0", 10);
  // URL의 offset을 기반으로 현재 페이지 번호(1-based)를 계산합니다.
  const currentPage = Math.floor(currentOffset / limit) + 1;

  // 2. 총 페이지 수 계산
  const totalPages = useMemo(() => {
    if (total === 0) return 1;
    // Math.ceil을 사용하여 올림 처리 (예: 28 / 15 = 2페이지)
    return Math.ceil(total / limit);
  }, [total, limit]);

  // 3. 현재 페이지 블록 및 페이지 목록 계산
  const currentBlock = Math.ceil(currentPage / pageCount);
  const startPage = (currentBlock - 1) * pageCount + 1;
  const endPage = Math.min(startPage + pageCount - 1, totalPages);

  const pages = useMemo(() => {
    const list = [];
    for (let i = startPage; i <= endPage; i++) {
      list.push(i);
    }
    return list;
  }, [startPage, endPage]);

  // 4. 페이지 번호 클릭 핸들러
  const handleClick = useCallback(
    (page: number) => {
      // 부모 컴포넌트(CommuView)에서 전달받은 콜백 함수를 호출합니다.
      // 이 콜백 함수가 URL의 offset을 업데이트해야 합니다.
      onChange(page);
    },
    [onChange]
  );

  // 총 페이지가 1페이지 이하이면 페이지네이션을 숨깁니다.
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cx("PaginationWrapper", className)}>
      {/* 이전 블록 이동 버튼 */}
      <button
        onClick={() => handleClick(startPage - 1)}
        disabled={startPage === 1}
        className={cx("PageButton", { disabled: startPage === 1 })}
      >
        {"<<"}
      </button>

      {/* 페이지 번호 목록 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={cx("PageButton", { active: page === currentPage })}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {/* 다음 블록 이동 버튼 */}
      <button
        onClick={() => handleClick(endPage + 1)}
        disabled={endPage === totalPages}
        className={cx("PageButton", { disabled: endPage === totalPages })}
      >
        {">>"}
      </button>
    </div>
  );
};

export default NumberPagination;
