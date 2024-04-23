import React from "react";
import CardSlider from "./CardSlider";

export default React.memo(function Slider({ movies }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };

  return (
    <div>
      <CardSlider title="Bombando" data={getMoviesFromRange(0, 10)} />
      <CardSlider title="Lançamentos" data={getMoviesFromRange(10, 20)} />
      <CardSlider title="Feitos pra você" data={getMoviesFromRange(20, 30)} />
      <CardSlider title="Premiados" data={getMoviesFromRange(30, 40)} />
      <CardSlider title="Ação" data={getMoviesFromRange(40, 50)} />
      <CardSlider title="Pra se emocionar" data={getMoviesFromRange(50, 60)} />
    </div>
  );
});
