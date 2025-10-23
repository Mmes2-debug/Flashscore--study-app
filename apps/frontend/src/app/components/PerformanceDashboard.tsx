// Replace the image optimization block with the following:

if (optimization.includes('images')) {
  // Ensure running in browser
  if (typeof document !== 'undefined' && document.images) {
    // Convert HTMLCollection to an array so we can use array methods in TypeScript
    const images = Array.from(document.images) as HTMLImageElement[];

    images.forEach(img => {
      try {
        // Some older browsers may not have the 'loading' property, so guard it
        if (!('loading' in img) || !(img as any).loading) {
          img.loading = 'lazy';
        }

        // If images use data-src for lazy loading, swap it
        if ((img as any).dataset && (img as any).dataset.src) {
          img.src = (img as any).dataset.src;
          delete (img as any).dataset.src;
        }
      } catch (e) {
        // Defensive: do not break the whole build/runtime if any image fails
        // (logging only in dev)
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.warn('Image optimization helper failed for an image', e);
        }
      }
    });
  }
}