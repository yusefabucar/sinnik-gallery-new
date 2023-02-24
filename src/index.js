import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from "./photos";
import { photos2 } from "./photos2";
import "./styles.css";

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, photo2, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div>
      <div>
        <h1>Cynical Productions</h1>
        <h3>3D Renders</h3>
      </div>
      <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      <div></div>
    </div>
  );
}

const BasicRows = () => <Gallery photos={photos} />;
// const BasicRows2 = () => <Gallery photos={photos2} />;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
