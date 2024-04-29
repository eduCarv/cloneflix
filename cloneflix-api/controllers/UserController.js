const User = require("../models/UserModel");

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => (id === data.id));
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
