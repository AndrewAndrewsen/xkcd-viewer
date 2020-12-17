import React from "react";

import styles from "./PaginationButton.module.css";

export default function PaginationButton({ index, setPage, currentPage }) {
  return (
    <div
      onClick={() => setPage(index)}
      className={`${styles.PaginationButton} ${
        index === currentPage && styles.active
      }`}
    >
      {index + 1}
    </div>
  );
}
