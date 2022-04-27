export async function get(event) {
  const jwt = event.request.headers.get('authorization');
  if (!jwt) {
    return {
      status: 403,
      body: "Forbidden"
    }
  }

  const response = await fetch(`${process.env.VITE_BACKEND_URL}/messages`, {
    method: "GET",
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json',
      'authorization': jwt
    }
  });

  const data = await response.json();
  console.log(data)

  if (data.status === "error") {
    return {
      status: response.status,
      body: data
    }
  }

  return {
    status: 200,
    body: data
  };
} 
