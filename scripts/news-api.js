import { RequestFactory } from "./request-factory";
import { GET } from "./cosntants";

export class NewsApi {
    constructor() {
        this.requestFactory = new RequestFactory();
        this.getRequest = this.requestFactory.create(GET);
    }

    /*
     * Provides live top and breaking headlines
     * Articles are sorted by the earliest date published first.
     * Accepts object with the following request parameters:
     * country, category, sources, q, pageSize, page
     */
    topHeadlines(queryParams = { country: "us", pageSize: 10 }) {
        return this.getRequest.makeRequest("top-headlines", queryParams);
    }

    /*
     * Returns the subset of news publishers that top headlines (/v2/top-headlines) are available from
     * Accepts object with the following request parameters:
     * category, language, country
     */
    sources(queryParams) {
        return this.getRequest.makeRequest("sources", queryParams);
    }
}
