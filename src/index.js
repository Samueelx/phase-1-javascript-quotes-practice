const QUOTES_URL = 'http://localhost:3000/quotes';

const renderQuotes = (quotesObject) => {
    const ul = document.querySelector('#quote-list');
    const li = document.createElement('li');
    li.classList.add('quote-card');

    li.innerHTML = `
    <blockquote class="blockquote">
        <p class="mb-0">${quotesObject.quote}</p>
        <footer class="blockquote-footer">${quotesObject.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${quotesObject.likes.length}</span></button>
        <button class='btn-danger'>Delete</button>
    </blockquote>
    `;
    ul.appendChild(li);
}

const getQuotes = (url) => {
    fetch(`${url}?_embed=likes`).then(res => res.json())
    .then((quotes) => {
        quotes.forEach((quote) => {
            renderQuotes(quote);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    getQuotes(QUOTES_URL);
});