export const get = async (url: URL | RequestInfo) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BREADBOARD_URL! + url, {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${process.env.BREADBOARD_TOKEN}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    const error = new Error('An error has occured while fetching data.');
    error.cause = responseJson.errors;
    throw error;
  }

  return responseJson.data;
};

export default { GET: get };
