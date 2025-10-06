"use client";

import React from "react";

export function VideoSection() {
  return (
    <section id="video" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-6">Revive la Bicicleteada por la Paz</h2>
        <p className="text-center text-gray-600 mb-8">
          Mira los mejores momentos de la Bicicleteada por la Paz 2025 y las ediciones anteriores.
        </p>
        
        {/* Video principal - Edición 2025 */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-4 text-primary">
            🎬 Bicicleteada por la Paz 2025
          </h3>
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/HavGji6085Y?rel=0&autoplay=1&mute=1&playsinline=1"
              title="Bicicleteada por la Paz 2025"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; accelerometer; gyroscope"
              allowFullScreen
            />
          </div>
        </div>

        {/* Video de edición anterior - 2024 */}
        <div>
          <h3 className="text-xl font-semibold text-center mb-4 text-gray-700">
            📹 Edición Anterior - 2024
          </h3>
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/RqWmfspkztM?rel=0&mute=1&playsinline=1"
              title="Bicicleteada por la Paz 2024"
              allow="clipboard-write; encrypted-media; picture-in-picture; accelerometer; gyroscope"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
