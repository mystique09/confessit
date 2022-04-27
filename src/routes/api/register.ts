export async function post({ request }) {
  const response = await fetch(`${process.env.VITE_BACKEND_URL}/signup`, {
    method: "POST",
    body: request.body,
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  });
  const data = await response.json();

  if (data.status === "error") {
    return {
      status: response.status,
      body: data
    }
  }

  return {
    status: 200,
    body: data
  }
}
