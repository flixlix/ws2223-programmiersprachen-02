/* const { google } = require('googleapis');

// Each API may support multiple versions. With this sample, we're getting
// v3 of the blogger API, and using an API key to authenticate.
const blogger = google.blogger({
    version: 'v3',
    auth: ''
});
 */
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("ec524163ae67f6a37fdedb442e6d811fbfb2c60c1b35ae6fb7e4f806525d59ee");

const params = {
    q: "Disney",
    tbm: "isch",
    ijn: "0"
};

const callback = function (data) {
    console.log(data["images_results"][0].original);
};

// Show result as JSON
search.json(params, callback);

