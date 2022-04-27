export async function get(event) {
  const jwt = event.request.headers.get('authorization');
  if (!jwt) {
    return {
      status: 403,
      body: "Forbidden"
    }
  }

  const response = await fetch('http://localhost:5000/messages', {
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
