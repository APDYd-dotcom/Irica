import { useEffect } from "react";

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = rect.top <= windowHeight && rect.bottom >= 0;
  const horInView = rect.left <= windowWidth && rect.right >= 0;

  return vertInView && horInView;
}

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
      { threshold: 0 }
    );

    // Observe elements already in the DOM
    document.querySelectorAll(".fade-in:not(.visible)").forEach((el) => {
      if (isInViewport(el)) {
        el.classList.add("visible");
      } else {
        observer.observe(el);
      }
    });

    // Watch for new .fade-in elements added to the DOM
    const mutationObserver = new MutationObserver(() => {
      document.querySelectorAll(".fade-in:not(.visible)").forEach((el) => {
        if (isInViewport(el)) {
          el.classList.add("visible");
        } else {
          observer.observe(el);
        }
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Check on scroll for elements inside scroll containers
    let scrollTicking = false;
    const scrollHandler = () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          document.querySelectorAll(".fade-in:not(.visible)").forEach((el) => {
            if (isInViewport(el)) {
              el.classList.add("visible");
            }
          });
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
}
