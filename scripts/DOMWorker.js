class DOMWorker {
    constructor() {
        this.domMain = document.querySelector("main");
        this.domChannels = document.querySelector(".channels");
        this.domChannelsList = document.querySelector(".channels-list");
        this.domChannelSelect = document.querySelector(".select-channel");
        this.domCurrentChannel = document.querySelector(".current-channel");
        this.templateMaker = new TemplateMaker();
        this.init();
    }

    init() {
        this.domChannelSelect.addEventListener("click", event => this.toggleSourceBar(event));
        this.domChannelsList.addEventListener("click", event => this.onChannelsClick(event));
    }

    onChannelsClick(event) {
        if (event.target.tagName === "LI") {
            const sources = event.target.getAttribute("data-id");
            newsapi
                .topHeadlines({ sources })
                .then(response => domWorker.insertArticles(response));
            this.toggleSourceBar();
            this.channelStatus(sources);
        }
    }

    insertArticle(article) {
        this.domMain.innerHTML += this.templateMaker.getArticleTemplate(article);
    }
    
    insertArticles(response) {
        this.domMain.innerHTML = "";
        const articles = response.articles;
        articles.forEach(article => this.insertArticle(article));
    }
    
    displaySources(response) {
        const sources = response.sources;
        splitUp(sources, 20).forEach(sources => this.insertSourcesColumn(sources));
    }
    
    channelStatus(currentChannel) {
        this.domCurrentChannel.innerHTML = `Current channel: 
            <span class="channel">${currentChannel}</span>`;
    }
    
    insertSourcesColumn(sources) {
        let column = "<ul class='channel-column'>";
        sources.forEach(source => {
            column += `<li data-id="${source.id}">${source.name}</li>`;
        });
        column += "</ul>";
        this.domChannelsList.innerHTML += column;
    }
    
    toggleSourceBar() {
        if (this.domChannels.style.height === "initial") {
            this.domChannels.style.height = 0;
            this.domChannelSelect.innerHTML = `Select channel
                <i class="fas fa-chevron-circle-down"></i>`;
        } else {
            this.domChannels.style.height = "initial";
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
