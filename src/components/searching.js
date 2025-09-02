export function initSearching(searchField) {
  return {
    applySearching: (query, state, action) => {
      if (!state[searchField]) return query;
      
      return Object.assign({}, query, {
        search: state[searchField],
      });
    },
  };
}