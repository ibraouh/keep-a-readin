async function lookup(query) {
	// replace space with + on query
	const api_url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
	const response = await fetch(api_url);
	const data = await response.json();

	article = ""
	len = Object.keys(data.items).length;

	for (i=1; i<=len-1; i++) {
		const book = data.items[i];
		let title = book.volumeInfo.title
		let subtitle = book.volumeInfo.subtitle
		let author = book.volumeInfo.authors
		let length_of_book = book.volumeInfo.pageCount
		let description = book.volumeInfo.description
		let img_src = book.volumeInfo.imageLinks.thumbnail
	
		article += 	`<article>
		<div class="div1">
			<img class="book-img-small" src=${img_src} width="100px">
		</div>
	
		<div class="div2">
			<h3 class="book-title">${title}</h3>
			<h4 class="book-subtitle">${subtitle}</h4>
			<p  class="book-author">${author}</p>
			<p  class="book-length">${length_of_book} pages (${2*length_of_book} minutes)</p>
		</div>
	
		<div class="div3">
			<p  class="book-description">${description}</p>
		</div>
		</article>`;
	}

	document.getElementById("query-results").innerHTML = article;
	document.getElementById("query").innerHTML = query
}