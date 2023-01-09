import Fuse from 'fuse.js'

export default function searchPhotos({ profiles, table, setTableSearchResults, searchQuery }) {

    const fuse = new Fuse(table, {
        keys: ['name', 'description', 'tags', 'user_id'],
        includeScore: true,
        threshold: 0.2,
        isCaseSensitive: false,
        findAllMatches: true,
        ignoreLocation: true,
        distance: 100,
        minMatchCharLength: 1,
        shouldSort: true,
        useExtendedSearch: true,
        ignoreLocation: true,
        findAllMatches: true,
    });

    const fuseResults = fuse.search(searchQuery);
    const tableResults = fuseResults.map((result) => result.item);
    setTableSearchResults(tableResults);
}