'use client';

import { useState } from 'react';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Replace these with your actual image paths
  const images = [
    {
      src: '/image1.png',
      title: 'Matka Chart 1',
      description: 'Historical winning numbers chart'
    },
    {
      src: '/image2.png',
      title: 'Matka Chart 2',
      description: 'Monthly results display'
    },
    {
      src: '/image3.png',
      title: 'Matka Chart 3',
      description: 'Jodi pattern analysis'
    },
    {
      src: '/image4.png',
      title: 'Matka Chart 4',
      description: 'Weekly statistics overview'
    },
    {
      src: '/image5.png',
      title: 'Matka Chart 5',
      description: 'Classic matka board display'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7b0c2b] via-[#a01638] to-[#7b0c2b] py-6 border-b-4 border-yellow-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="px-4 py-2 rounded-lg bg-yellow-500/20 border border-yellow-500/40 hover:bg-yellow-500/30 transition-all text-yellow-200 font-semibold flex items-center gap-2"
            >
              ← Back to Home
            </a>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              🖼️ GALLERY
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-8">
        {/* Intro Text */}
        <div className="text-center mb-8">
          <p className="text-gray-300 text-lg">
            Explore our collection of Matka charts and historical records
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-gray-700 hover:border-yellow-500 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              {/* Image Container */}
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="flex flex-col items-center justify-center h-full text-gray-500">
                        <svg class="w-20 h-20 mb-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                        </svg>
                        <p class="font-semibold">Image ${index + 1}</p>
                      </div>
                    `;
                  }}
                />
              </div>

              {/* Image Info Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-yellow-400 font-bold text-lg mb-1">{image.title}</h3>
                <p className="text-gray-300 text-sm">{image.description}</p>
                <div className="mt-3 flex items-center gap-2 text-yellow-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  <span className="text-sm font-semibold">Click to enlarge</span>
                </div>
              </div>

              {/* Border Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>

        {/* Empty State Message */}
        <div className="mt-12 text-center bg-gray-800/30 rounded-xl p-8 border-2 border-gray-700">
          <p className="text-gray-400 text-sm">
            💡 <strong>Note:</strong> Place your images in <code className="bg-gray-900 px-2 py-1 rounded text-yellow-400">/public/gallery/</code> folder with names: chart-1.jpg, chart-2.jpg, chart-3.jpg, chart-4.jpg, chart-5.jpg
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-yellow-400 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          
          <div className="max-w-6xl w-full">
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].title}
              className="w-full h-auto rounded-lg shadow-2xl"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="800" height="600" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="24"%3EImage not found%3C/text%3E%3C/svg%3E';
              }}
            />
            <div className="bg-gray-800/90 rounded-lg p-4 mt-4 text-center">
              <h3 className="text-yellow-400 font-bold text-xl mb-2">{images[selectedImage].title}</h3>
              <p className="text-gray-300">{images[selectedImage].description}</p>
            </div>
          </div>

          {/* Navigation Arrows */}
          {selectedImage > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-yellow-600/20 hover:bg-yellow-600/40 border-2 border-yellow-500 text-white p-3 rounded-full transition-all"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage - 1);
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {selectedImage < images.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-600/20 hover:bg-yellow-600/40 border-2 border-yellow-500 text-white p-3 rounded-full transition-all"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage + 1);
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </main>
  );
}