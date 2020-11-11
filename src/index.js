//Импорты
import './styles.css';
import ImageApi from './apiService';
import imageCardTpl from './templates/image-card.hbs'


//Элементы ДОМ
const refs = {
    searchFormEl: document.querySelector('.search-form'),
    galleryListEl: document.querySelector('.gallery'),
    // searchForm: document.querySelector('.js-search-form'),
    galleryContainerEl: document.querySelector('.gallery-container'),
    sentinel: document.querySelector('#sentinel'),
}

const imageApi = new ImageApi();

refs.searchFormEl.addEventListener('submit', onSearchImage);


function onSearchImage(e) { 
    e.preventDefault();

    imageApi.query = e.currentTarget.elements.query.value;

    if (imageApi.query === '') {
        return alert('Enter search key');
    }

    imageApi.resetPage();
    clearArticlesContainer();
    imageApi.fetchImages().then(onRenderGallery).catch(onCatchError);
    
}

function onRenderGallery(gallery) {
    const markup = imageCardTpl(gallery);
    refs.galleryListEl.innerHTML = markup;
    imageApi.incrementPage();   
}

function appendImagesMarkup(images) {
    refs.galleryListEl.insertAdjacentHTML('beforeend', imageCardTpl(images));
        imageApi.incrementPage();   

}

function clearArticlesContainer() {
  refs.galleryListEl.innerHTML = '';
}

function onCatchError(error) {
    console.log(error);
}


//Функция бесконечного скролла
const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && imageApi.query !== '') {
      // console.log('Пора грузить еще статьи' + Date.now());
      imageApi.fetchImages().
    then(appendImagesMarkup)
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '200px',
});
observer.observe(refs.sentinel);