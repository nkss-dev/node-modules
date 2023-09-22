export const fetcher = async (url: URL | RequestInfo) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BREADBOARD_URL! + url);
  const responseJson = await response.json();

  if (!response.ok) {
    const error = new Error('An error has occured while fetching data.');
    error.cause = responseJson.errors;
    throw error;
  }

  return responseJson.data;
};
