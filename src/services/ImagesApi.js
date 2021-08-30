import axios from 'axios';

const fetchImagesWithQuery = (searchQuery, page = 1) => {
  const key = '19509532-9c10a3c2f413abf8ad2252df8';
  return axios
    .get(`https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response => response.data.hits);
};

export default fetchImagesWithQuery;