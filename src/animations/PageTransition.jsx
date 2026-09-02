import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { pageVariants } from "./variants";

export function PageTransition({ children, className = "" }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname + location.search}
        className={className}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ willChange: "opacity, transform" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
