const API_KEY = "37bf6eba9005457ca4209b9169ea3828";
const newsapi = new NewsApi(API_KEY);
const domWorker = new DOMWorker();

newsapi
    .topHeadlines()
    .then(response => domWorker.insertArticles(response.articles))
    .catch(
        domWorker.showArticesError(
            "Looks like you have problems with your internet connection. No news right now :("
        )
    );

newsapi
    .sources()
    .then(response => domWorker.displaySources(response))
    .catch(
        domWorker.showSourcesError(
            "Looks like you have problems with your internet connection. No channels to choose from :("
        )
    );
