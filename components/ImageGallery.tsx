// ImageGallery.tsx
import React, { useRef } from 'react';
import ImageGallery from 'react-image-gallery';

import 'react-image-gallery/styles/css/image-gallery.css';

interface GalleryImage {
   original: string;
   thumbnail: string;
}

interface ImageGalleryProps {
   images: { url: string }[];
}

const ImageGalleryComponent: React.FC<ImageGalleryProps> = ({ images }) => {
   const galleryRef = useRef<ImageGallery>(null);

   const galleryImages: GalleryImage[] = images.map(image => ({
      original: image.url,
      thumbnail: image.url,
   }));

   const handleImageClick = () => {
      if (galleryRef.current) {
         galleryRef.current.fullScreen();
      }
   };

   const renderLeftNav = (
      onClick: React.MouseEventHandler<HTMLElement>,
   ) => (
      <button
         type="button"
         className="absolute top-1/2 left-0 text-3xl md:text-5xl text-theme-color hover:bg-theme-color/80 hover:text-white z-10 flex items-center rounded-lg duration-300 p-1 mx-1"
         onClick={onClick}
      >
         <i className="lni lni-chevron-left"></i>
      </button>
   );

   const renderRightNav = (
      onClick: React.MouseEventHandler<HTMLElement>,
   ) => (
      <button
         type="button"
         className="absolute top-1/2 right-0 text-3xl md:text-5xl text-theme-color hover:bg-theme-color/80 hover:text-white z-10 flex items-center rounded-lg duration-300 p-1 mx-1"
         onClick={onClick}
      >
         <i className="lni lni-chevron-right"></i>
      </button>
   );

   return (
      <ImageGallery
         ref={galleryRef}
         items={galleryImages}
         renderLeftNav={renderLeftNav}
         renderRightNav={renderRightNav}
         onClick={handleImageClick}
         showPlayButton={false}
         infinite={false}
      />
   );
};

export default ImageGalleryComponent;
