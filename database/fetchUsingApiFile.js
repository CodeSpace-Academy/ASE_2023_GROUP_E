/**
 *
 * @param {object} item is an object that hold is used in the body
 * {@link addItem} is used to connect the api folder,  
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
  