import { appConfig } from "../config";

export class GetRequest {
    constructor() {
        this.API_KEY = appConfig.youtubeApiKey;
        this.baseUrl = appConfig.baseUrl;
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
