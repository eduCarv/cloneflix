import React from "react";
import CardSlider from "./CardSlider";

export default function Slider({ movies }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };

  return (
    <div>
      <CardSlider titile="Bombando" data={getMoviesFromRange(0, 10)} />
      <CardSlider titile="Lançamentos" data={getMoviesFromRange(10, 20)} />
      <CardSlider titile="Feitos pra você" data={getMoviesFromRange(20, 30)} />
      <CardSlider titile="Premiados" data={getMoviesFromRange(30, 40)} />
      <CardSlider titile="Ação" data={getMoviesFromRange(40, 50)} />
      <CardSlider titile="Pra se emocionar" data={getMoviesFromRange(50, 60)} />
    </div>
  );
}
