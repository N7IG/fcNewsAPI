import { Article } from "./article";

export class DOMWorker {
    constructor() {
        this.domMain = document.querySelector("main");
        this.domChannels = document.querySelector(".channels");
        this.domChannelsList = document.querySelector(".channels-list");
        this.domChannelSelect = document.querySelector(".select-channel");
        this.domCurrentChannel = document.querySelector(".current-channel");
        this.article = new Article();
    }

    insertArticle(article) {
        this.domMain.innerHTML += this.article.getArticleTemplate(article);
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
