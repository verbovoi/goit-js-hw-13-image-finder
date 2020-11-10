const API_KEY = '19060641-7ffe1969b41865fad4803ab0d';
const BASE_URL = 'https://pixabay.com/api';
let page = 1;

export default function fetchImages(image) {
    return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${image}&page=${page}&per_page=12&key=${API_KEY}`).
        then(response => response.json());
}