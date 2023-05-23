import axios from 'axios';

const API_KEY = '36585978-b7b33b45819b9bfecd53008c3';

export const fetchImages = async (query, page = 1, perPage = 12) => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal`
    );
    return { images: response.data.hits, totalHits: response.data.totalHits };
  } catch (error) {
    throw new Error('Error fetching images from Pixabay API');
  }
};

export default fetchImages;
