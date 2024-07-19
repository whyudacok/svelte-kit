// src/routes/komik/[id]/+page.js
export async function load({ params }) {
  const { id } = params;
  const apiUrl = `https://api.koranime.fun/manga/${id}`;
  
  // Fetch manga data from the API
  const response = await fetch(apiUrl);
  const data = await response.json();

  return {
    props: {
      manga: data,
    },
    meta: {
      title: data.title || 'Komik Details',
      description: data.synopsis || 'No description available',
      url: `https://your-site-url.com/komik/${id}`
    }
  };
}
