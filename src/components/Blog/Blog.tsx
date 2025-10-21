"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Blog.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);
interface BlogItem {
  title: string;
  link: string;
  description: string;
  bloggername: string;
  postdate: string;
}
export default function Blog({ query }) {
  const [items, setItems] = useState<BlogItem[]>([]); // 빈 배열로 초기화
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;

      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/crawl/blog?query=${encodeURIComponent(query)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`API 요청 실패: ${res.status}`);
        }

        const data = await res.json();
        console.log("받아온 데이터:", data);

        // 데이터 구조 확인 - 네이버 API는 items 배열로 반환
        if (data.items && Array.isArray(data.items)) {
          setItems(data.items);
        } else {
          // 데이터가 객체인 경우 (0, 1, 2... 키를 가진 객체)
          const itemsArray = [];
          for (let key in data) {
            if (!isNaN(parseInt(key))) {
              itemsArray.push(data[key]);
            }
          }
          setItems(itemsArray);
        }
      } catch (err) {
        console.error("데이터 가져오기 오류:", err);
        setError(err.message);
        setItems([]); // 오류 발생 시 빈 배열로 설정
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <div>데이터를 불러오는 중입니다...</div>;
  if (error) return <div>오류가 발생했습니다: {error}</div>;

  return (
    <div>
      {items.length > 0 ? (
        currentItems.map((item, index) => (
          <div className={cx("Item")} key={index}>
            <Link
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cx("TitleLink")}
            >
              <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
            </Link>
            <p
              className={cx("Description")}
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
            <div className={cx("Detail")}>
              {item.bloggername} |
              {item.postdate &&
                ` ${new Date(
                  item.postdate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
                ).toLocaleDateString()}`}
            </div>
          </div>
        ))
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}

      {totalPages > 1 && (
        <div className={cx("Pagination")}>
          {currentPage > 1 && (
            <button
              className={cx("Btn")}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              이전
            </button>
          )}
          <span>
            {currentPage} / {totalPages}
          </span>
          {currentPage < totalPages && (
            <button
              className={cx("Btn")}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              다음
            </button>
          )}
        </div>
      )}
    </div>
  );
}
