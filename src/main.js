import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { templateImg } from './js/render';

const formRef = document.querySelector('.form');
const contRef = document.querySelector('.container');
const galleryRef = document.querySelector('.gallery');

formRef.addEventListener('submit', onSubmit);

function onSubmit(ev) {
  ev.preventDefault();

  galleryRef.innerHTML = '';

  const query = ev.currentTarget.elements.query.value;

  if (query === '') {
    iziToast.warning({
      title: '',
      message: 'Please, fill in search field',
      position: 'center',
    });
  }

  searchImage(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: '',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'center',
        });
      } else {
        galleryRef.insertAdjacentHTML('beforeend', templateImg(data));
      }
    })
    .catch(err => console.log(err));
  formRef.reset();
}

function searchImage(query) {
  const BASE_URL = 'https://pixabay.com/api/?key=';
  const KEY = '42059071-0978dc0d7158b742eee7c30f5';

  const url = `${BASE_URL}${KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}

const lightboxOptions = {
  captions: true,
  captionSelector: 'self',
  captionPosition: 'bottom',
  captionDelay: 250,
};

let gallery = new SimpleLightbox('.gallery a');
gallery.on('show.simplelightbox', lightboxOptions);
