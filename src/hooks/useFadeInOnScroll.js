import { useEffect } from "react";

export function useFadeInOnScroll() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".fade-in").forEach((element) => element.classList.add("visible"));
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

    const observeMissing = () => {
      document.querySelectorAll(".fade-in:not(.visible)").forEach((el) => {
        observer.observe(el);
      });
    };

    observeMissing();

    const mutationObserver = new MutationObserver(observeMissing);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
