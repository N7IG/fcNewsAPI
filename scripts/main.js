import "../styles/general.css";
import "../styles/header.css";

import "@babel/polyfill";
import "whatwg-fetch";
import "promise-polyfill";

import { DOMWorker } from "./dom-worker";

const domWorker = new DOMWorker();

const domChannelSelect = document.querySelector(".select-channel");
const domChannelsList = document.querySelector(".channels-list");
const domShowNews = document.querySelector(".show-news");

async function onChannelsClick(event) {
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

async function showNews() {
    await import(/* webpackPreload: true */ "./news-api");
    // const newsapi = new NewsApi();
    // insertTopHeadlines();
    // insertSources();
}

domShowNews.addEventListener("click", event => showNews(event));
domChannelsList.addEventListener("click", event => onChannelsClick(event));
domChannelSelect.addEventListener("click", event =>
    domWorker.toggleSourceBar(event)
);
