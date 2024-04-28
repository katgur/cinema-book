import style from "./style.module.scss";

function calcPages(page: number, totalPages: number) {
  const siblingCount = 1;
  const boundary = 3;
  const res = [];
  if (page < boundary + siblingCount * 2) {
    for (
      let i = 1;
      i <= Math.min(totalPages, boundary + siblingCount * 2);
      i++
    ) {
      res.push(i);
    }
    if (res.length + 1 < totalPages) {
      res.push(-1, totalPages);
    } else if (res.length < totalPages) {
      res.push(totalPages);
    }
    return res;
  } else if (page > totalPages - boundary - siblingCount * 2) {
    for (
      let i = Math.max(1, totalPages - boundary - siblingCount * 2);
      i <= totalPages;
      i++
    ) {
      res.push(i);
    }
    if (res.length + 1 < totalPages) {
      return [1, -1, ...res];
    } else if (res.length < totalPages) {
      return [1, ...res];
    }
    return res;
  } else {
    res.push(1, -1);
    for (
      let i = Math.max(1, page - siblingCount);
      i <= Math.min(totalPages, page + siblingCount);
      i++
    ) {
      res.push(i);
    }
    res.push(-1, totalPages);
    return res;
  }
}

interface PaginationViewProps {
  page: number;
  totalPages: number;
  onPageChanged: (page: number) => void;
}

function PaginationView({
  page,
  totalPages,
  onPageChanged,
}: PaginationViewProps) {
  const pagination = calcPages(page, totalPages);
  return (
    <ul className={style.container}>
      {pagination.map((paginationCell, index) => {
        return (
          <li key={paginationCell + index}>
            {paginationCell === -1 ? (
              <span className={style.dots}>...</span>
            ) : (
              <button
                className={`${style.page} ${page === paginationCell ? style.pageSelected : style.pageNotSelected}`}
                onClick={() => onPageChanged(paginationCell)}
              >
                {paginationCell}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default PaginationView;
