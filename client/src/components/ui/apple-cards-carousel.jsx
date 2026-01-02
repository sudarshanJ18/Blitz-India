"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "../../lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  animate
} from "motion/react";
import { useOutsideClick } from "../../hooks/use-outside-click";

export const CarouselContext = createContext({
  onCardClose: () => { },
  currentIndex: 0,
});

// Hook for scroll overflow mask effect
const useScrollOverflowMask = (scrollXProgress) => {
  const left = `0%`;
  const right = `100%`;
  const leftInset = `15%`;
  const rightInset = `85%`;
  const transparent = `rgba(0, 0, 0, 0)`;
  const opaque = `rgba(0, 0, 0, 1)`;

  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  );

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
      );
    } else if (value >= 0.99) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
      );
    } else {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      );
    }
  });

  return maskImage;
};

export const Carousel = ({ items, initialScroll = 0 }) => {
  const carouselRef = React.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Scroll tracking for mask effect
  const { scrollXProgress } = useScroll({ container: carouselRef });
  const maskImage = useScrollOverflowMask(scrollXProgress);

  // Check mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = isMobile ? 250 : 300;
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = isMobile ? 250 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const cardWidth = isMobile ? 230 : 384;
      const gap = isMobile ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full px-4 md:px-0">
        <div className="relative">
          {/* Left Arrow */}
          {/* Left Arrow removed */}

          {/* Carousel Content */}
          <motion.div
            className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-4 md:py-6 lg:py-5 [scrollbar-width:none]"
            ref={carouselRef}
            onScroll={checkScrollability}
          >
            <div
              className={cn(
                "flex flex-row justify-center items-center gap-2 px-4",
                "mx-auto w-full max-w-7xl"
              )}
            >
              {items.map((item, index) => (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.2 * index,
                      ease: "easeOut",
                      once: true,
                    },
                  }}
                  key={"card" + index}
                  className="rounded-2xl md:rounded-3xl"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Arrow */}
          {/* Right Arrow removed */}
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index, layout = false, className }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-1 sm:mx-2 my-2 sm:my-4 h-fit max-w-5xl rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl bg-white p-2 sm:p-3 md:p-6 lg:p-10 font-sans md:mx-auto md:my-10"
            >
              <button
                className="sticky top-1 right-1 sm:top-2 sm:right-2 ml-auto flex h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-black z-10"
                onClick={handleClose}
              >
                <IconX className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-neutral-100" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-xs sm:text-sm md:text-base font-medium text-black mt-1 sm:mt-0"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="mt-1 sm:mt-2 text-base sm:text-lg md:text-2xl lg:text-5xl font-semibold text-neutral-700 md:mt-4 leading-tight"
              >
                {card.title}
              </motion.p>
              <div className="py-2 sm:py-3 md:py-6 lg:py-10" onClick={(e) => {
                // If a link is clicked inside the modal content, close the modal immediately
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                  handleClose();
                }
              }}>{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative z-10 flex flex-col items-start justify-start overflow-hidden rounded-xl md:rounded-2xl bg-gray-100 shadow-lg transition-all duration-300 ease-in-out",
          "h-48 sm:h-64 md:h-80 lg:h-96",
          isHovered ? "w-48 sm:w-60 md:w-80 lg:w-96" : "w-20 sm:w-28 md:w-40 lg:w-48",
          className
        )}
        whileTap={{ scale: 0.98 }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-4 sm:p-5 md:p-6 lg:p-8 whitespace-nowrap overflow-hidden">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-left font-sans text-sm sm:text-base md:text-sm lg:text-base font-bold text-white shadow-sm"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className={cn(
              "mt-1 sm:mt-2 md:mt-2 max-w-xs text-left font-sans font-semibold [text-wrap:balance] text-white leading-tight transition-all duration-300 drop-shadow-md",
              isHovered
                ? "text-2xl sm:text-3xl md:text-lg lg:text-2xl xl:text-3xl"
                : "text-xl sm:text-2xl md:text-base lg:text-lg xl:text-xl"
            )}
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="absolute inset-0 z-10 object-cover"
        />
      </motion.button>
    </>
  );
};

export const BlurImage = ({ src, className, alt, ...rest }) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};