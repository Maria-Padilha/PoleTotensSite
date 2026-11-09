// v-reveal: o elemento aparece (sobe + fade) quando entra na tela. Sem
// IntersectionObserver ou com "reduzir movimento" ligado, já nasce visível.
const observers = new WeakMap()

export const vReveal = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value?.delay) el.style.transitionDelay = `${binding.value.delay}ms`

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!('IntersectionObserver' in window) || reduceMotion) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )
    observer.observe(el)
    observers.set(el, observer)
  },
  unmounted(el) {
    observers.get(el)?.disconnect()
  },
}
