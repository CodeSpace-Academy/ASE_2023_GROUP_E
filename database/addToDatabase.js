

/**
 * Asynchronously adds an item to a specified API endpoint using a POST request.
 *
 * @param {string} apiPath - The URL or path of the API endpoint where the item will be added. eg('/api/filename')
 * @param {Object} item - The item to be added to the API. Should be a JavaScript object.eg({key: value})
 * @returns {Promise<Object>} A promise that resolves to the response data from the API.
 * @throws {Error} If the POST request fails or the response status is not OK, an error is thrown with a message.
 */
export async function addItem(apiPath, item) {
    const response = await fetch(apiPath, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    }
    return data;
  }
  