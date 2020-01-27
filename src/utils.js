const API_URL = 'https://deckofcardsapi.com/api/';

/**
 * Network request function
 * parse response status, and return the actual data
 * @param {string} method HTTP method name
 * @param {string} endpoint API Resource
 * @return {any} Value returned from API.
 */
async function request(method, endpoint) {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (response.status !== 200) {
    throw new Error(
      `Request Error :: api :: request :: ${method} ${endpoint} :: ${response.status}`
    );
  }
  return await response.json();
}

/**
 * shuffle a new deck
 * @return {any} deck object with the shuffle status a the new deck ID.
 */
export async function newDeck() {
  return await request('GET', 'deck/new/shuffle/');
}

/**
 * Draw 52 cards from a specific deck
 * @param {string} deck_id deck ID
 * @return {any} object of 52 cards.
 */
export async function loadCards(deck_id) {
  return await request('GET', `deck/${deck_id}/draw/?count=52`);
}
