// A recurring signature graphic — a soft hand-drawn-style wave band, echoing
// the decorative "vague"/"bande" dividers used on the reference institute sites.
// flip=true mirrors it vertically, useful for alternating between sections.
function WaveDivider({ color = "#1F4D3D", flip = false, className = "" }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className={`w-full h-12 md:h-16 ${flip ? "rotate-180" : ""}`}
      >
        <path
          d="M0,40 C150,90 350,0 600,35 C850,70 1050,10 1200,45 L1200,80 L0,80 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

export default WaveDivider;
