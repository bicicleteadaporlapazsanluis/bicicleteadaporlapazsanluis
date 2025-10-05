"use client";

import React from "react";

export function VideoSection() {
  return (
    <section id="video" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-6">Ediciones Anteriores</h2>
        <p className="text-center text-gray-600 mb-8">
          Recordamos los hermosos momentos de la Bicicleteada por la Paz 2024.
        </p>
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/RqWmfspkztM?rel=0&autoplay=1&mute=1&playsinline=1&loop=1&playlist=RqWmfspkztM"
            title="Bicicleteada por la Paz 2024"
            allow="autoplay; loop; clipboard-write; encrypted-media; picture-in-picture; accelerometer; gyroscope"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
