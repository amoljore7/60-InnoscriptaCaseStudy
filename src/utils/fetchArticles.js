const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

const buildApiUrl = ({ keyword, category, date, source }) => {
  const commonParams = `q=${keyword}&from=${date}&apiKey=${API_KEY}`;
  
  let sourceParam = '';
  switch (source) {
    case 'BBC News':
      sourceParam = `&sources=bbc-news`;
      break;
    case 'New York Times':
      sourceParam = `&sources=the-new-york-times`;
      break;
    case 'The Guardian':
      sourceParam = `&sources=the-guardian`;
      break;
    default:
      sourceParam = '';
      break;
  }

  let categoryParam = category ? `&category=${category}` : '';

  return `https://newsapi.org/v2/top-headlines?${commonParams}${sourceParam}${categoryParam}`;
};

// Fetch Articles based on preferences
export const fetchArticlesFromNewsAPI = async ({ keyword, category, date, source, authors }) => {
  const apiUrl = buildApiUrl({ keyword, category, date, source, authors });
  const response = await fetch(apiUrl);
  
  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'An unknown error occurred';
    
    throw new Error(`Error: ${errorMessage}`);
  }
  
  return response.json();

};