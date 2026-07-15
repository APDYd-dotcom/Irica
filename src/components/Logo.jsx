import React from "react";

export default function Logo({ className = "h-12", showText = true, light = false }) {
  // Respecting the logo colors:
  // Primary Green: #007A33
  // Primary Black: #111111 (or #000000)
  const greenColor = light ? "#ffffff" : "#007A33";
  const blackColor = light ? "#ffffff" : "#111111";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 100 70"
        className="h-full w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Upper eyelid / eyebrow curve (Green in logo) */}
        <path
          d="M 12 35 C 28 15, 62 15, 78 35 C 65 24, 35 24, 12 35 Z"
          fill={greenColor}
        />

        {/* Lower eyelid / hand shape (Black in logo) */}
        <path
          d="M 12 35 C 25 48, 62 55, 88 36 C 70 48, 38 42, 28 37 C 22 34.5, 16 34.5, 12 35 Z"
          fill={blackColor}
        />

        {/* Center Iris (Green Circle) */}
        <circle cx="50" cy="33" r="11" fill={greenColor} />

        {/* Inside Iris: White Bar Chart & Arrow */}
        {/* Bar 1 */}
        <rect x="44.5" y="32" width="1.6" height="6" rx="0.5" fill="white" />
        {/* Bar 2 */}
        <rect x="47.5" y="29" width="1.6" height="9" rx="0.5" fill="white" />
        {/* Bar 3 */}
        <rect x="50.5" y="26" width="1.6" height="12" rx="0.5" fill="white" />

        {/* Diagonal Arrow pointing up-right */}
        <path
          d="M 43 38.5 L 53.5 27.5 M 53.5 27.5 L 50.5 27 M 53.5 27.5 L 53 30.5"
          stroke="white"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      
      {showText && (
        <div className="flex flex-col justify-center">
          <span 
            className="font-serif font-black text-2xl tracking-wide uppercase leading-none"
            style={{ color: blackColor, fontFamily: '"Source Serif 4", Georgia, serif' }}
          >
            IRICA
          </span>
          <div 
            className="h-0.5 w-full mt-0.5 rounded-full" 
            style={{ backgroundColor: greenColor }}
          />
        </div>
      )}
    </div>
  );
}
