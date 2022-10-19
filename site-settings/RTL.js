import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';

// Create rtl cache
const cacheRtl = createCache({
  key: 'css',
  prepend: true,
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}