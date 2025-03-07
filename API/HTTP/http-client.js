// Description: HTTP client for making API requests

/**
 * Get the response item key
 * @param response - The HTTP response object
 * @param itemIndex - The index of the item you want to retrieve key from
 * @param key - Json key you want to retrieve
 * @returns {string} The response item key value
 */
export function getResponseItemKey(response, itemIndex, key)
{
    return response.body['hydra:member'][itemIndex][key];
}
