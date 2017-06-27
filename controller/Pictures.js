const bcrypt = require("bcrypt");
const knex = require("../knex");

class PictureController {
  getAllPictures() {
    return knex("pictures")
      .orderBy("picture_id", "asc")
      .then(multiPicturesData => multiPicturesData);
  }

  getPicturesByUserId(user_id) {
    return knex("favorites").where("user_id", user_id).then(userFavorites => {
      return userFavorites.map(favoritedPicture => {
        let picId = favoritedPicture.picture_id;
        return knex("pictures")
          .where("picId", picture_id)
          .then(picture => picture);
      });
    });
  }

  // getFavoritePicture(user_id, picture_id) {
  //   return knex("favorites").where("user_id", user_id).then(userFavorites => {
  //     if (userFavorites.picture_id === picture_id) {
  //       return knex("pictures")
  //         .where("picture_id", picture_id)
  //         .then(picture => picture);
  //     } else {
  //       return false;
  //     }
  //   });
  // }

  checkIfUserHasFavorite(user_id) {
    return knex("favorites")
      .where("user_id", user_id)
      .then(userFavorites => userFavorites);
  }

  getPicturesByPictureId(picture_id) {
    return knex("pictures")
      .where("picture_id", picture_id)
      .then(picture => picture);
  }
}

module.exports = PictureController;
