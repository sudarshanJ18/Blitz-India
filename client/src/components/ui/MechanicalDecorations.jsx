import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";


const PremiumGear = ({ className = "w-full h-full" }) => (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="0.25" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
            </linearGradient>
            <filter id="gearGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        <circle cx="100" cy="100" r="75" fill="url(#gearGradient)" opacity="0.3" />

        
        {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const nextAngle = ((i + 1) * 30 - 90) * (Math.PI / 180);
            return (
                <path
                    key={i}
                    d={`M ${100 + 60 * Math.cos(angle)} ${100 + 60 * Math.sin(angle)} L ${100 + 75 * Math.cos(angle)} ${100 + 75 * Math.sin(angle)} L ${100 + 75 * Math.cos(nextAngle)} ${100 + 75 * Math.sin(nextAngle)} L ${100 + 60 * Math.cos(nextAngle)} ${100 + 60 * Math.sin(nextAngle)} Z`}
                    fill="url(#gearGradient)"
                    stroke="currentColor"
                    strokeWidth="2"
                    opacity="0.8"
                    filter="url(#gearGlow)"
                />
            );
        })}

        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.9" filter="url(#gearGlow)" />
        <circle cx="100" cy="100" r="35" fill="url(#gearGradient)" opacity="0.6" />
        <circle cx="100" cy="100" r="35" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.8" />

        {[0, 60, 120, 180, 240, 300].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            return <line key={angle} x1={100 + 15 * Math.cos(rad)} y1={100 + 15 * Math.sin(rad)} x2={100 + 50 * Math.cos(rad)} y2={100 + 50 * Math.sin(rad)} stroke="currentColor" strokeWidth="3" opacity="0.7" filter="url(#gearGlow)" />;
        })}

        <circle cx="100" cy="100" r="15" fill="currentColor" opacity="0.4" />
        <circle cx="100" cy="100" r="15" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.9" />
    </svg>
);


const ModernCircuit = ({ className = "w-full h-full" }) => (
    <svg className={className} viewBox="0 0 200 200" fill="none">
        <defs>
            <filter id="circuitGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
        </defs>
        <path d="M 50 100 L 90 100 L 90 70 L 130 70 L 130 100 L 170 100" stroke="currentColor" strokeWidth="4" opacity="0.7" strokeLinecap="round" filter="url(#circuitGlow)" />
        <path d="M 100 50 L 100 85 L 140 85 L 140 130 L 100 130 L 100 170" stroke="currentColor" strokeWidth="4" opacity="0.7" strokeLinecap="round" filter="url(#circuitGlow)" />
        {[[90, 100], [130, 70], [100, 85], [140, 130]].map(([cx, cy], i) => (
            <g key={i}>
                <circle cx={cx} cy={cy} r="8" fill="currentColor" opacity="0.4" filter="url(#circuitGlow)" />
                <circle cx={cx} cy={cy} r="8" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.9" />
            </g>
        ))}
        <rect x="95" y="95" width="15" height="15" rx="2" fill="currentColor" opacity="0.5" stroke="currentColor" strokeWidth="2" />
    </svg>
);


const GeometricHex = ({ className = "w-full h-full" }) => (
    <svg className={className} viewBox="0 0 200 200" fill="none">
        <defs>
            <linearGradient id="hexGrad"><stop offset="0%" stopColor="currentColor" stopOpacity="0.5" /><stop offset="100%" stopColor="currentColor" stopOpacity="0.2" /></linearGradient>
            <filter id="hexGlow"><feGaussianBlur stdDeviation="2.5" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <path d="M100 50 L140 72.5 L140 117.5 L100 140 L60 117.5 L60 72.5 Z" fill="url(#hexGrad)" opacity="0.3" filter="url(#hexGlow)" />
        <path d="M100 50 L140 72.5 L140 117.5 L100 140 L60 117.5 L60 72.5 Z" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.8" filter="url(#hexGlow)" />
        <path d="M100 70 L125 82.5 L125 107.5 L100 120 L75 107.5 L75 82.5 Z" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.6" />
        <circle cx="100" cy="95" r="12" fill="currentColor" opacity="0.4" />
        <circle cx="100" cy="95" r="12" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.8" />
    </svg>
);


const TechnicalGrid = ({ className = "w-full h-full" }) => (
    <svg className={className} viewBox="0 0 200 200" fill="none">
        <defs>
            <pattern id="gridPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            </pattern>
            <filter id="gridGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <rect x="30" y="30" width="140" height="140" fill="url(#gridPattern)" opacity="0.6" />
        <rect x="30" y="30" width="140" height="140" stroke="currentColor" strokeWidth="3.5" fill="none" opacity="0.8" filter="url(#gridGlow)" />
        <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.4" filter="url(#gridGlow)" />
        <line x1="70" y1="100" x2="130" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.8" />
        <line x1="100" y1="70" x2="100" y2="130" stroke="currentColor" strokeWidth="2" opacity="0.8" />
    </svg>
);


const PremiumShape = ({
    Icon,
    className,
    delay = 0,
    size = { mobile: 120, desktop: 240 },
    color = "text-gray-400/35",
    rotateAnimation = false,
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set((clientX / innerWidth - 0.5) * 30);
            mouseY.set((clientY / innerHeight - 0.5) * 30);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const x = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 0.5 });
    const y = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 0.5 });

    const rotateX = useTransform(y, [-30, 30], [5, -5]);
    const rotateY = useTransform(x, [-30, 30], [-5, 5]);

    
    const actualSize = typeof size === 'object' ? size : { mobile: size * 0.5, desktop: size };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: rotateAnimation ? -45 : -10, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
            transition={{ duration: 2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`absolute ${className}`}
            style={{
                x, y,
                rotateX: rotateAnimation ? 0 : rotateX,
                rotateY: rotateAnimation ? 0 : rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
        >
            <motion.div
                animate={
                    rotateAnimation
                        ? { rotate: 360 }
                        : { y: [-12, 12, -12], rotate: [-3, 3, -3] }
                }
                transition={
                    rotateAnimation
                        ? { duration: 35, repeat: Infinity, ease: "linear" }
                        : { duration: 7, repeat: Infinity, ease: "easeInOut" }
                }
                whileHover={{ scale: 1.08, filter: "brightness(1.2)", transition: { duration: 0.3 } }}
                className={`${color} transition-all duration-500 w-[${actualSize.mobile}px] h-[${actualSize.mobile}px] md:w-[${actualSize.desktop}px] md:h-[${actualSize.desktop}px]`}
                style={{ filter: "drop-shadow(0 15px 35px rgba(0, 0, 0, 0.2))" }}
            >
                <Icon />
            </motion.div>
        </motion.div>
    );
};


const PREMIUM_SHAPES = [
    {
        Icon: PremiumGear,
        size: { mobile: 120, desktop: 240 },
        color: "text-orange-500/35",
        className: "left-[2%] md:left-[6%] top-[10%] md:top-[18%]",
        rotateAnimation: true,
        delay: 0.1,
    },
    {
        Icon: ModernCircuit,
        size: { mobile: 100, desktop: 200 },
        color: "text-gray-600/32",
        className: "right-[2%] md:right-[8%] top-[5%] md:top-[12%]",
        rotateAnimation: false,
        delay: 0.25,
    },
    {
        Icon: GeometricHex,
        size: { mobile: 95, desktop: 190 },
        color: "text-orange-400/33",
        className: "right-[4%] md:right-[10%] bottom-[12%] md:bottom-[18%]",
        rotateAnimation: false,
        delay: 0.4,
    },
    {
        Icon: TechnicalGrid,
        size: { mobile: 90, desktop: 180 },
        color: "text-gray-500/30",
        className: "left-[5%] md:left-[16%] bottom-[8%] md:bottom-[16%]",
        rotateAnimation: false,
        delay: 0.35,
    },
];

export const MechanicalDecorations = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[8%] md:left-[12%] top-[15%] md:top-[20%] w-[300px] h-[300px] md:w-[650px] md:h-[650px] bg-gradient-radial from-orange-500/15 via-orange-500/8 to-transparent rounded-full blur-3xl"
            />

            
            {PREMIUM_SHAPES.map((shape, index) => (
                <PremiumShape key={index} {...shape} />
            ))}
        </div>
    );
};

export default MechanicalDecorations;
