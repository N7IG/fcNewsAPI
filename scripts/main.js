const API_KEY = "37bf6eba9005457ca4209b9169ea3828";
const newsapi = new NewsApi(API_KEY);
const domWorker = new DOMWorker();

newsapi.topHeadlines().then(response => domWorker.insertArticles(response));
newsapi.sources().then(response => domWorker.displaySources(response));
