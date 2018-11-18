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
    topHeadlines(queryParams = { country: "us", pageSize: 10 }) {
        return this.makeRequest("top-headlines", queryParams);
    }

    /*
     * Returns the subset of news publishers that top headlines (/v2/top-headlines) are available from
     * Accepts object with the following request parameters:
     * category, language, country
     */
    sources(queryParams) {
        const response = this.makeRequest("sources", queryParams);
        return response;
    }

    async makeRequest(endpoint, queryParams) {
        let queryString = "";
        if (queryParams) {
            queryString = Object.entries(queryParams)
                .map(pair => pair.join("="))
                .join("&");
        }

        const response = await fetch(
            `${this.baseUrl + endpoint}?${queryString}&apiKey=${this.API_KEY}`
        );
        const json = await response.json();

        return json;
    }
}