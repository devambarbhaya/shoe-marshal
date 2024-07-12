"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageSliderProps {
  images: string[];
}

export function ImageSlider({ images }: ImageSliderProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  function handlePreviousClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }
  function handleNextClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }
  function handleImageClick(index: number) {
    setMainImageIndex(index);
  }

  return (
    <div className="grid gap-6 md:gap-3 items-start">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={images[mainImageIndex]}
          alt="Product Image"
          width={600}
          height={600}
          className="object-cover w-[600px] h-[600px]"
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button onClick={handlePreviousClick} variant="secondary" size="icon">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button onClick={handleNextClick} variant="secondary" size="icon">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(index)}
            className={cn(
              index === mainImageIndex
                ? "border-2 border-primary"
                : "border border-gray-200",
              "relative overflow-hidden rounded-lg cursor-pointer"
            )}
          >
            <Image
              src={image}
              alt="Product Image"
              width={100}
              height={100}
              className="object-cover w-[100px] h-[100px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
