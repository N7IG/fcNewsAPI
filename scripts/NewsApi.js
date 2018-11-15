class NewsApi {
    constructor(api_key) {
        this.API_KEY = api_key;
        this.baseUrl = "https://newsapi.org/v2/";
    }

    /*
     * Provides live top and breaking headlines
     * Articles are sorted by the earliest date published first.
     * Accepts object with the following request parameters:
     * country, category, sources, q, pageSize, page
     */
    topHeadlines(requestParams = { country: "us", pageSize: 10 }) {
        return this.makeRequest("top-headlines", requestParams);
    }

    /*
     * Returns the subset of news publishers that top headlines (/v2/top-headlines) are available from
     * Accepts object with the following request parameters:
     * category, language, country
     */
    sources(requestParams) {
        return this.makeRequest("sources", requestParams);
    }

    makeRequest(endpoint, queryParams) {
        let queryString = "?";
        if (queryParams) {
            for (var param in queryParams) {
                queryString += `${param}=${queryParams[param]}&`;
            }
        }
        queryString += `apiKey=${this.API_KEY}`;

        return fetch(this.baseUrl + endpoint + queryString).then(response =>
            response.json()
        );
    }
}
