// Registers Netlify Blobs as the storage backend (imported only by the Netlify function wrappers).
globalThis.__SF_BLOBS = async () => {
  const { getStore } = await import('@netlify/blobs');
  return getStore({ name: 'suvfilter', consistency: 'strong' });
};
