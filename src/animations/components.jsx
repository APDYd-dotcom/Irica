import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "./variants";

export function FadeInOnScroll({
  as = "div",
  children,
  className = "",
  delay = 0,
  y = 24,
  amount = 0.2,
  once = true,
  ...rest
}) {
  const Component = motion[as] || motion.div;
  const variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
    },
  };
  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function StaggerGroup({
  as = "div",
  children,
  className = "",
  stagger = 0.08,
  delayChildren = 0.05,
  amount = 0.2,
  once = true,
  ...rest
}) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  as = "div",
  children,
  className = "",
  y = 18,
  ...rest
}) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export { fadeUp, viewportOnce };
