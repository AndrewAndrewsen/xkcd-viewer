export const api = async (endpoint, data = {}, publicCall = false ) => {
  const method = Object.keys(data).length === 0 ? "GET" : "POST";
  console.log(data)
  let response = null;
  const apiUrl = (publicCall ? process.env.NEXT_PUBLIC_SITE_URL+"api/" : process.env.NEXT_PUBLIC_API_URL);
  if (method == "GET") {
    response = await fetch(apiUrl + endpoint);
  } else {
    response = await fetch(apiUrl + endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  return response.json();
};
