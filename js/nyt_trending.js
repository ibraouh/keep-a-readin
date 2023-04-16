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
      print(data.results);
    })
    .catch((err) => {
      console.error(err);
    });
}

function print(data) {
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
    let img_src = "https://marketplace.canva.com/EAFA7N_NLQs/1/0/1003w/canva-cute-colorful-watercolor-simple-illustrated-young-adult-romance-book-cover-ooKN90UU-H0.jpg"; //book.volumeInfo.imageLinks.thumbnail

    article += `<article href="https://google.com">
				<div class="div1">
					<img class="book-img-small" src=../assets/best_books/best${i+1}.png width="100px">
				</div>
			
				<div class="div2">
					<h3 class="book-title">${title}</h3>
					<p  class="book-subtitle"><em>by</em> ${author}</p>
					<h4 class="book-author"><em>Published by</em> ${publisher}</h4>
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