import { useEffect } from "react";

export function useFadeInOnScroll() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".fade-in").forEach((el) => el.classList.add("visible"));
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

    // Observe elements already in the DOM
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

    // Watch for new .fade-in elements added to the DOM (e.g. after async data loads)
    const mutationObserver = new MutationObserver(() => {
      document.querySelectorAll(".fade-in:not(.visible)").forEach((el) => {
        observer.observe(el);
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
