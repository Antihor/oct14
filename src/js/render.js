export function templateImg(data) {
  const markup = data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a href="${largeImageURL}" class='gallery-link'
          ><li class='item'>
            <img  class='gallery-img' src="${webformatURL}  alt="${tags}" />
            <p><b>Likes:</b>${likes}</p>
            <p><b>Views:</b>${views}</p>
            <p><b>Comments:</b>${comments}</p>
            <p><b>Downloads:</b>${downloads}</p>
          </li></a
        >`;
      }
    )
    .join('');
  return markup;
  console.log(markup);
}
