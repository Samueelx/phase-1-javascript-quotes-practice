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

    li.querySelector('.btn-danger').addEventListener('click', (event) => {
        event.preventDefault();
        deleteQuote(quotesObject.id);
        li.remove();
    });
}

const submitQuote = (quote, author) => {
    const quoteObject = {
        quote: quote,
        author: author
    };

    fetch(QUOTES_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(quoteObject)
    }).then(res => res.json())
    .then((data) => {
        renderQuotes(data);
    });
}

const getInput = () => {
    const newQuote = document.querySelector('#new-quote');
    const newAuthor = document.querySelector('#author');

    submitQuote(newQuote.value, newAuthor.value);
}

const getQuotes = (url) => {
    fetch(`${url}?_embed=likes`).then(res => res.json())
    .then((quotes) => {
        quotes.forEach((quote) => {
            renderQuotes(quote);
        });
    });
}

const deleteQuote = (id) => {
    fetch(`${QUOTES_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.querySelector('.btn-primary');
    getQuotes(QUOTES_URL);

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        getInput();
    });
});