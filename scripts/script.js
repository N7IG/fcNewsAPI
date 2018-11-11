const API_KEY = "37bf6eba9005457ca4209b9169ea3828";
const domMain = document.querySelector("main");
const domChannels = document.querySelector(".channels");
const domChannelsList = document.querySelector(".channels-list");
const domChannelSelect = document.querySelector(".select-channel");
const domCurrentChannel = document.querySelector(".current-channel");

let domAllChannels;

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
        let requestBase = `${this.baseUrl}top-headlines?`;

        return this.makeRequest(requestBase, requestParams);
    }

    /*
     * Returns the subset of news publishers that top headlines (/v2/top-headlines) are available from
     * Accepts object with the following request parameters:
     * category, language, country
     */
    sources(requestParams) {
        let requestBase = `${this.baseUrl}sources?`;

        return this.makeRequest(requestBase, requestParams);
    }

    makeRequest(base, requestParams) {
        if (requestParams) {
            for (var param in requestParams) {
                base += `${param}=${requestParams[param]}&`;
            }
        }

        return fetch(`${base}apiKey=${this.API_KEY}`).then(response =>
            response.json()
        );
    }
}

// DOM HELPERS

function insertArticle(article) {
    const charsLeftExp = /\[\+[0-9]+ chars\]/;

    domMain.innerHTML += `
        <article>
            <div class="article-title">
                <h2>${article.title}</h2>
                <div class="source-name">${article.source.name}</div>
            </div>
            ${
                article.description
                    ? `<img
                        src="${article.urlToImage}"
                        alt="article image"
                        class="article-image"
                    />`
                    : ""
            }
            <p class="article-description">
                ${article.description || ""}
            </p>
            <p class="article-content">
                ${
                    article.content
                        ? article.content.replace(charsLeftExp, "")
                        : ""
                }
            </p>
            <div class="article-footer">
                <div class="article-date">
                    ${new Date(article.publishedAt).toLocaleString()}
                </div>
                <a href="${article.url}" target="_blank">
                    <div class="default-button">Go to full article</div>
                </a>
            </div>
        </article>`;
}

function insertArticles(response) {
    domMain.innerHTML = "";
    const articles = response.articles;
    articles.forEach(insertArticle);
}

function displaySources(response) {
    const sources = response.sources;
    splitUp(sources, 20).forEach(sources => insertSourcesColumn(sources));
    domAllChannels = document.querySelectorAll(".channel-column li");
}

function channelStatus(currentChannel) {
    domCurrentChannel.innerHTML = `Current channel: 
        <span class="channel">${currentChannel}</span>`;
}

function insertSourcesColumn(sources) {
    let column = "<ul class='channel-column'>";
    sources.forEach(source => {
        column += `<li data-id="${source.id}">${source.name}</li>`;
    });
    column += "</ul>";
    domChannelsList.innerHTML += column;
}

function toggleSourceBar() {
    if (domChannels.style.height === "initial") {
        domChannels.style.height = 0;
        domChannelSelect.innerHTML = `Select channel
            <i class="fas fa-chevron-circle-down"></i>`;
    } else {
        domChannels.style.height = "initial";
        domChannelSelect.innerHTML = `Cancel
            <i class="fas fa-chevron-circle-up"></i>`;
    }
}

function onChannelsClick(event) {
    if (event.target.tagName === "LI") {
        const sources = event.target.getAttribute("data-id");
        newsapi
            .topHeadlines({ sources })
            .then(response => insertArticles(response));
        toggleSourceBar();
        channelStatus(sources);
    }
}

/*
 * Transforms array into array of arrays of length n
 */
function splitUp(arr, n = 10) {
    let result = [];

    arr.forEach((element, idx) => {
        if (idx % n === 0) {
            result.push(arr.slice(idx, idx + n));
        }
    });

    return result;
}

// EVENT LISTERERS

domChannelSelect.addEventListener("click", toggleSourceBar);
domChannelsList.addEventListener("click", onChannelsClick);

// ENTRY POINT

const newsapi = new NewsApi(API_KEY);

newsapi.topHeadlines().then(response => insertArticles(response));
newsapi.sources().then(response => displaySources(response));

// debuggerd
// debugger
// debuggerdd
// РАЗОБРАТЬСЯ СО СТРАНИЦАМИ
// debuggerdd
// debugger
// debuggerd
