const API_KEY = '6c476fcb2f586b0ea11a6d205647c549';
const API_URL = 'https://www.flickr.com/services/rest/';

export const getFlickrImages = async (searchTerm: string = '', perPage: number) => {
  const endpoint = `${API_URL}?method=flickr.photos.search&api_key=${API_KEY}&text=${searchTerm}&format=json&nojsoncallback=1&per_page=${perPage}`;

  const response = await fetch(endpoint);
  const data = await response.json();

  if (!searchTerm.trim()) {
    return [];
  }
  
  return data.photos.photo.map((photo: any) => {
    return {
      url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`
    };
  });
};