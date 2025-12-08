import { motion } from "motion/react";

export const SimpleCard = ({ card }) => {
    return (
        <motion.div
            className="relative z-10 flex h-64 w-44 flex-col items-start justify-start overflow-hidden rounded-2xl bg-gray-100 shadow-lg md:h-80 md:w-56 lg:h-[40rem] lg:w-96"
            initial={{ scale: 0.7 }}
            animate={{ scale: 0.7 }}
            whileHover={{ scale: 0.85 }}
            transition={{ duration: 0.3 }}
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
            <div className="relative z-40 p-4 md:p-6 lg:p-8">
                <p className="text-left font-sans text-xs font-medium text-white md:text-sm lg:text-base">
                    {card.category}
                </p>
                <p className="mt-1 max-w-xs text-left font-sans text-base font-semibold [text-wrap:balance] text-white md:mt-2 md:text-xl lg:text-3xl">
                    {card.title}
                </p>
            </div>
            <img
                src={card.src}
                alt={card.title}
                className="absolute inset-0 z-10 h-full w-full object-cover"
            />
        </motion.div>
    );
};
