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
