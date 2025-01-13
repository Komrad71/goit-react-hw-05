import ImageGallery from "../imageGallery/ImageGallery";
import SearchBar from "../searchBar/SearchBar";
import ErrorMessage from "../errorMessage/ErrorMessage";
import LoadMoreBtn from "../loadMoreBtn/LoadMoreBtn";
import getImages from "../unsplash/unsplash";
import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import css from "./App.module.css";
import ImageModal from "../imageModal/ImageModal";

const errorNotify = () => toast.error("No results found");

const App = () => {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [query, setQuery] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const galleryRef = useRef();
  const loadMoreRef = useRef();

  const handleOpenModal = (image) => {
    setIsOpen(true);
    setModalImage(image);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setModalImage(null);
  };

  const handleSearch = (userQuery) => {
    if (query === userQuery) return;
    setImages([]);
    setQuery(userQuery);
    setCurrentPage(1);
  };

  const handleClickLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (!query) return;

    async function fetchImages() {
      try {
        setError(false);
        setLoader(true);
        const data = await getImages(query, currentPage);

        if (!data.results || data.results.length < 1) {
          errorNotify();
          setHasMore(false);
          return;
        }

        setImages((prev) => [...prev, ...data.results]);
        setHasMore(data.total_pages > currentPage);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError(true);
      } finally {
        setLoader(false);
      }
    }

    fetchImages();
  }, [query, currentPage]);

  useEffect(() => {
    if (images.length > 0 && hasMore) {
      loadMoreRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (!hasMore) {
      galleryRef.current?.scrollIntoView({
        block: "end",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  }, [images, hasMore, currentPage]);

  const CustomLoader = () => (
    <div className={css.progressBarContainer}>
      <div className={css.progressBar}></div>
    </div>
  );

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <header className={css.header}>
        <SearchBar onSearch={handleSearch} />
      </header>
      <main className={css.main}>
        {error && <ErrorMessage />}
        {images && (
          <ImageGallery
            images={images}
            onOpenModal={handleOpenModal}
            ref={galleryRef}
          />
        )}
        {modalImage && (
          <ImageModal
            value={modalIsOpen}
            onCloseModal={handleCloseModal}
            image={modalImage}
          />
        )}
        {loader && (
          <div className={css.loaderContainer}>
            <CustomLoader />
          </div>
        )}
        {hasMore && (
          <LoadMoreBtn
            onClick={handleClickLoadMore}
            ref={loadMoreRef}
          />
        )}
      </main>
    </>
  );
};

export default App;