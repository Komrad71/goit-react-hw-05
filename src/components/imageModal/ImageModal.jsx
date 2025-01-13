import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ image, onCloseModal, value }) => {
  const { urls, description } = image;

  return (
    <Modal
      isOpen={value}
      onRequestClose={onCloseModal}
      contentLabel="Image Modal"
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
    >
      <img
        className={css.modalImg}
        src={urls.regular}
        alt={description || "Image"}
        onClick={onCloseModal}
      />
    </Modal>
  );
};

export default ImageModal;