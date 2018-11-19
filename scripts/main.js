import "@babel/polyfill";
import "whatwg-fetch";
import "promise-polyfill";

import { NewsApi } from "./news-api";
import { DOMWorker } from "./dom-worker";

const newsapi = new NewsApi();
const domWorker = new DOMWorker();

const domChannelSelect = document.querySelector(".select-channel");
const domChannelsList = document.querySelector(".channels-list");

function onChannelsClick(event) {
    if (event.target.tagName === "LI") {
        const sourceName = event.target.getAttribute("data-name");
        const sourceId = event.target.getAttribute("data-id");
        insertTopHeadlines({ sources: sourceId });
        domWorker.toggleSourceBar();
        domWorker.channelStatus(sourceName);
    }
}

async function insertTopHeadlines(params) {
    try {
        const response = await newsapi.topHeadlines(params);
        domWorker.insertArticles(response.articles);
    } catch {
        domWorker.showArticesError(
            "Looks like you have problems with your internet connection. No news right now :("
        );
    }
}

async function insertSources() {
    try {
        const response = await newsapi.sources();
        domWorker.displaySources(response);
    } catch {
        domWorker.showSourcesError(
            "Looks like you have problems with your internet connection. No channels to choose from :("
        );
    }
}

domChannelSelect.addEventListener("click", event =>
    domWorker.toggleSourceBar(event)
);
domChannelsList.addEventListener("click", event => onChannelsClick(event));

insertTopHeadlines();
insertSources();
