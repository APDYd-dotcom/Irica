import { useEffect } from "react";

export function useFadeInOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".fade-in"));

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}
