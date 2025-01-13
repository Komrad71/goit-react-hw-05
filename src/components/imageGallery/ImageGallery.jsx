import ImageCard from "../imageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { forwardRef } from "react";

const ImageGallery = forwardRef(({ images, onOpenModal }, ref) => {
  return (
    <ul className={css.galleryContainer} ref={ref}>
      {images.map(({ id, ...imageProps }) => (
        <li key={id} className={css.galleryItem}>
          <ImageCard image={imageProps} onOpenModal={onOpenModal} />
        </li>
      ))}
    </ul>
  );
});

ImageGallery.displayName = "ImageGallery";

export default ImageGallery;