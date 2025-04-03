"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
export default function Blog({ query }) {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const Btn = styled.button`
    color: white;
    background: green;
    border: 0;
    padding: 5px;
  `;
  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        const res = await fetch(
          `/api/crawl/blog?query=${encodeURIComponent(query)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        setItems(data.items);
      }
    };

    fetchData();
  }, [query]);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginTop: "20px" }}>
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "black" }}
              >
                <p>{item.title}</p>
              </Link>
              <p>{item.description}</p>{" "}
              {/* Use descriptions array to get the corresponding description */}
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        {currentPage > 1 && (
          <Btn onClick={() => setCurrentPage(currentPage - 1)}>이전</Btn>
        )}
        {currentPage < totalPages && (
          <Btn onClick={() => setCurrentPage(currentPage + 1)}>다음</Btn>
        )}
      </div>
    </div>
  );
}
