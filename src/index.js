const QUOTES_URL = 'http://localhost:3000/quotes';
const LIKES_URL = 'http://localhost:3000/likes';

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

    /**Experimental: add the span to the addLike() function call */
    span = li.querySelector('span');


    /**Event listener for deleting a quote */
    li.querySelector('.btn-danger').addEventListener('click', (event) => {
        deleteQuote(quotesObject.id);
        li.remove();
    });

    /**Event listener for adding likes */
    li.querySelector('.btn-success').addEventListener('click', (event) => {
        addLike(quotesObject.id, span);
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

/**Function that adds likes data to the likes endpoint */
const addLike = (id, span) => {
    const likeObject = {
        quoteId: id
    };

    fetch(LIKES_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(likeObject)
    }).then(response => response.json())
    .then((data) => {
        span.textContent = data.likes.length;
    })
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