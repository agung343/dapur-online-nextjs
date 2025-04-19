'use client'
import { useState, useRef, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

export default function Slideshow({ items }) {
    const [slide, setSlide] = useState(0);
    const intervalRef = useRef(null)

    function startAutoSlide() {
        intervalRef.current = setInterval(() => {
            setSlide(prev => (prev + 1) % items.length)
        }, 5000)
    }

    function resetTime() {
        clearInterval(intervalRef.current)
        startAutoSlide()
    }

    function nextSlide() {
        setSlide(prev => (prev + 1) % items.length)
        resetTime()
    }

    function prevSlide() {
        setSlide(prev => (prev - 1 + items.length) % items.length)
        resetTime()
    }

    useEffect(() => {
        startAutoSlide()
        return () => clearInterval(intervalRef.current)
    }, [items.length])

  return (
    <div id="slide-show" className="flex items-center justify-center gap-4">
      <FaArrowLeft size={48} onClick={prevSlide} className="p-2 rounded-full" aria-label="previous slide" />
      <div className="text-center flex flex-col items-center gap-2">
        <Image src={items[slide].image} alt={items[slide].name} width={480} height={320} className="rounded-xl" />
        <h1 className="text-2xl font-bold text-orange-red">{items[slide].name}</h1>
        <h2 className="text-xl font-semibold text-wrap w-3/5">{items[slide].summary}</h2>
      </div>
      <FaArrowRight onClick={nextSlide} size={48} className="p-2 rounded-full" aria-label="next slide" />
    </div>
  );
}
