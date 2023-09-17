const API_KEY = '6c476fcb2f586b0ea11a6d205647c549';
const API_URL = 'https://www.flickr.com/services/rest/';

export const getFlickrImages = async (searchTerm: string = '', perPage: number) => {
  const endpoint = `${API_URL}?method=flickr.photos.search&api_key=${API_KEY}&text=${searchTerm}&format=json&nojsoncallback=1&per_page=${perPage}`;

  if (!searchTerm.trim()) {
    return Promise.resolve([]);
  }

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.stat !== 'ok') {
      throw new Error(data.message || 'Failed to fetch data from Flickr');
      
    }

    return data.photos.photo.map((photo: any) => {
      return {
        url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`,
        title: photo.title
      };
    });
  } catch (error) {
    throw error;
  }
};