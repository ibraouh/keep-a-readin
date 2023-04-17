const url =
  "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=a78FSI2EWLtf7kNn6tpIijO7S5vQXY87";

function nyt_trending() {
  const options = { method: "GET", headers: { Accept: "application/json" } };
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          errorMessage: err,
        });
      });
    })
    .then((data) => {
      console.log("Success!");
      print_article(data.results);
    })
    .catch((err) => {
      console.error(err);
    });
}

function print_article(data) {
  article = "";
  len = Object.keys(data).length;

  for (i = 0; i < 5; i++) {
    const book = data[i];
    let title = book.title.toLowerCase().replace(/['"]+/g, '');
	  title = title.charAt(0).toUpperCase()+ title.slice(1)
    let publisher = book.publisher; //book.volumeInfo.subtitle
    let author = book.author;
    let isbn10 = book.isbns[0].isbn10 //"100"; //book.volumeInfo.pageCount
    let description = book.description;

    article += `<article>
				<div class="div1">
					<img class="book-img-small" src=assets/best_books/best${i+1}.png width="100px">
				</div>
			
				<div class="div2">
					<h2 class="book-title">${title}</h3>
					<h4  class="book-subtitle"><em>by</em> ${author}</h4>
					<p class="book-author"><em>Published by</em> ${publisher}</p>
					<p  class="book-length">isbns10: ${isbn10}</p>
				</div>  
			
				<div class="div3">
					<p  class="book-description">${description}</p>
				</div>
				</article>`;
  }

  document.getElementById("trending-books").innerHTML = article;
}

nyt_trending();