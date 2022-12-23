import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./Tmdb";
import MoviesRow from "./components/movies/MoviesRow";
import FeaturedMovie from "./components/featureds/FeaturedMovie";
import Header from "./components/header/Header";

export default () => {
  // -----------------------------------------------------------------------
  //                            UseStates
  // -----------------------------------------------------------------------
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  // -----------------------------------------------------------------------
  //                            UseEffects
  // -----------------------------------------------------------------------
  useEffect(() => {
    const loadAll = async () => {
      // Async -> wait for something
      // Take all list
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Take featured
      let originals = list.filter((i) => i.slug === "originals"); // Filtering the list by the originals
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      ); // Generating random number between "Originals"
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  // -----------------------------------------------------------------------
  //                               Page
  // -----------------------------------------------------------------------
  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && ( // It will only exist if there is something (List)
        <FeaturedMovie item={featuredData} />
      )}

      <section className="lists">
        {movieList.map((item, key) => (
          <MoviesRow
            key={key} // Every list has to have one key (prop)
            title={item.title}
            items={item.items}
          />
        ))}
      </section>

      <footer>
        Feito com{" "}
        <span role="img" aria-label="coração">
          ❤️
        </span>{" "}
        pelo Carlos Eduardo
        <br />
        Direito de imagem para Netflix
        <br />
        Dados pegos pelo site Themoviedb.org
      </footer>
    </div>
  );
};
