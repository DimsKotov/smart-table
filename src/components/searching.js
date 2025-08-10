import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    const comparison = createComparison(
        [
            rules.skipEmptyTargetValues,
            rules.searchMultipleFields(searchField, ["date", "customer", "seller"], false)
        ]
    );
    // @todo: #5.1 — настроить компаратор

    return (data, state, action) => {
        if (!state.filters || !state.filters.length) {
            return data;
        }
        // @todo: #5.2 — применить компаратор
        let filteredData = data.filter((item) =>
            comparison(item, state.filters.find(f => f.field === searchField))
        );
        
        return filteredData;
    };
}