function APIRequest() {
  return fetch('https://www.breakingbadapi.com/api/characters').then((res) => {
    if (!res.ok) {
      throw new Error(`There was an error: ${res.status}`);
    }
    return res.json();
  });
}

module.exports = APIRequest;
