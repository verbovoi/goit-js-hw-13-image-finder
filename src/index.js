//Импорты
import './styles.css';
import fetchImages from './apiService';
import imageCardTpl from './templates/image-card.hbs'


//Элементы ДОМ
const refs = {
    searchFormEl: document.querySelector('.search-form'),
    galleryListEl: document.querySelector('.gallery')
}

refs.searchFormEl.addEventListener('submit', onSearchImage);

function onSearchImage(event) { 
    event.preventDefault();
    const form = event.currentTarget;
    const searchImage = form.elements.query.value;
    console.log(searchImage);


    fetchImages(searchImage).
    then(onRenderGallery).
    catch(onCatchError).
    finally(() => form.reset());


}

function onRenderGallery(gallery) {
    const markup = imageCardTpl(gallery);
    console.log(markup);
    refs.galleryListEl.innerHTML = markup;
    
}

function onCatchError(error) {
    console.log(error);
}