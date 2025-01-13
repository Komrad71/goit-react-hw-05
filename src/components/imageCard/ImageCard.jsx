import css from "./ImageCard.module.css";

const ImageCard = ({ image, onOpenModal }) => {
  const { urls, description, user } = image;

  return (
    <div className={css.imageCardContainer}>
      <img
        className={css.imageCardImg}
        src={urls.small}
        alt={description || "Image"}
        onClick={() => onOpenModal(image)}
      />

      <div className={css.userInfo}>
        <img
          className={css.userAvatar}
          src={user.profile_image.medium}
          alt={user.first_name || "User"}
        />
        <p className={css.userName}>
          {user.first_name} {user.last_name || ""}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;