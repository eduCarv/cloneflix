const User = require("../models/UserModel");

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Filme/Série já adicionado a lista" });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "Filme/Série adicionado com sucesso" });
  } catch (error) {
    return res.json({ msg: "Erro ao adicionar à lista" });
  }
};

module.exports.getLikedMovies = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (user) {
      res.json({ msg: "success", movies: user.likedMovies });
    } else return res.json({ msg: "Email de usuário não encontrado" });
  } catch (err) {
    return res.json({ msg: "Erro ao requisitar minha lista" });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);

      if (!movieIndex) res.status(400).send({ msg: "Filme não encontrado" });
      likedMovies.splice(movieIndex, 1);

      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies,
        },
        { new: true }
      );
      return res.json({ msg: "Filme Removido", movies: likedMovies });
    }
  } catch (err) {
    return res.json({ msg: "Erro ao remover da minha lista" });
  }
};
