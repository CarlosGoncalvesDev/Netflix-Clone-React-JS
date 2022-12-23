import React, { useState } from "react";
import "./MoviesRow.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default ({ title, items }) => {
  // ---------------------------------------------------------------------------
  //                             UseState
  // ---------------------------------------------------------------------------
  const [scrollX, setScrollX] = useState(0);

  // ---------------------------------------------------------------------------
  //                              Functions
  // ---------------------------------------------------------------------------

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    setScrollX(x);
  };

  // ---------------------------------------------------------------------------
  //                              Row Page
  // ---------------------------------------------------------------------------
  return (
    <div className="moviesRow">
      <h2>{title}</h2>
      <div className="moviesRow--left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div className="moviesRow--right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>

      <div className="moviesRow--listarea">
        <div
          className="moviesRow--list"
          style={{
            marginLeft: scrollX,
            width: items.results.length * 150,
          }}
        >
          {items.results.length > 0 &&
            items.results.map((item, key) => (
              <div key={key} className="moviesRow--item">
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.original_title}
                ></img>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
