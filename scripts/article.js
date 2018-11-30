import "../styles/article.css";

export class Article {
    getArticleTemplate(article) {
        // TODO: try to use \s again
        const charsLeftExp = /\[\+[0-9]+ chars\]/;

        const title = article.title || "";
        const sourceName = article.source.name || "";
        const description = article.description || "";
        const urlToImage = article.urlToImage;
        const content = article.content
            ? article.content.replace(charsLeftExp, "")
            : "";
        const date = new Date(article.publishedAt).toLocaleString();
        const url = article.url;

        let imageTemplate = "";
        if (article.description) {
            imageTemplate = `<img
                                src="${urlToImage}"
                                alt="article image"
                                class="article-image"
                            />`;
        }

        return `<article>
                    <div class="article-title">
                        <h2>${title}</h2>
                        <div class="source-name">${sourceName}</div>
                    </div>
                    ${imageTemplate}
                    <p class="article-description">${description}</p>
                    <p class="article-content">${content}</p>
                    <div class="article-footer">
                        <div class="article-date">${date}</div>
                        <a href="${url}" target="_blank">
                            <div class="default-button">Go to full article</div>
                        </a>
                    </div>
                </article>`;
    }
}
