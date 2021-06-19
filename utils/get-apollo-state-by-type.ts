export function getApolloStateByType<T = any>(type: string): T {
  if (typeof window === 'undefined') {
    return null;
  }

  const apolloStateEl = document.getElementById('__APOLLO_STATE__');
  if (apolloStateEl) {
    const apolloState = JSON.parse(apolloStateEl.innerHTML);
    const foundKey = Object.keys(apolloState).find((key) => {
      return apolloState[key].__typename === type;
    });

    return apolloState[foundKey];
  }
  return null;
}
