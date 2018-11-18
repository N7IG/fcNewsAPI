// config,js
const appConfig = {
    youtubeApiKey: "37bf6eba9005457ca4209b9169ea3828"
};

// news-api.js
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

//template-maker.js
class TemplateMaker {
    getArticleTemplate(article) {
        const charsLeftExp = /\[\+[0-9]+ chars\]/s;

        return `<article>
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
}

//dom-worker.js
class DOMWorker {
    constructor() {
        this.domMain = document.querySelector("main");
        this.domChannels = document.querySelector(".channels");
        this.domChannelsList = document.querySelector(".channels-list");
        this.domChannelSelect = document.querySelector(".select-channel");
        this.domCurrentChannel = document.querySelector(".current-channel");
        this.templateMaker = new TemplateMaker();
    }

    insertArticle(article) {
        this.domMain.innerHTML += this.templateMaker.getArticleTemplate(
            article
        );
    }

    insertArticles(articles) {
        this.domMain.innerHTML = "";

        articles.forEach(article => this.insertArticle(article));
    }

    showArticesError(errorMessage) {
        this.domMain.innerHTML = errorMessage;
    }

    displaySources(response) {
        const sources = response.sources;
        this.domChannelsList.innerHTML = "";
        splitUp(sources, 20).forEach(sources =>
            this.insertSourcesColumn(sources)
        );
    }

    showSourcesError(errorMessage) {
        this.domChannelsList.innerHTML = `<div class='channel-column'>${errorMessage}</div>`;
    }

    channelStatus(currentChannel) {
        this.domCurrentChannel.innerHTML = `Current channel: 
            <span class="channel">${currentChannel}</span>`;
    }

    insertSourcesColumn(sources) {
        let column = "<ul class='channel-column'>";
        sources.forEach(source => {
            column += `<li data-id="${source.id}" 
                           data-name="${source.name}">
                               ${source.name}
                        </li>`;
        });
        column += "</ul>";
        this.domChannelsList.innerHTML += column;
    }

    toggleSourceBar() {
        if (this.domChannels.style.height === "auto") {
            this.domChannels.style.height = 0;
            this.domChannelSelect.innerHTML = `Select channel
                <i class="fas fa-chevron-circle-down"></i>`;
        } else {
            this.domChannels.style.height = "auto";
            this.domChannelSelect.innerHTML = `Cancel
                <i class="fas fa-chevron-circle-up"></i>`;
        }
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

//main.js
const apiKey = appConfig.youtubeApiKey;
const newsapi = new NewsApi(apiKey);
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
