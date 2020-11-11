const API_KEY = '19060641-7ffe1969b41865fad4803ab0d';
const BASE_URL = 'https://pixabay.com/api';

// export default function fetchImages(image) {
//     return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${image}&page=${page}&per_page=12&key=${API_KEY}`).
//         then(response => response.json());
// }


export default class ImageApi{
    constructor(){
        this.searchQuery = '';
        this.page = 1;
        }

    fetchImages() {
        return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`).
            then(response => response.json());
    }

    incrementPage() {
        this.page += 1; 
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }     
            
}