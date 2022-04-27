export async function get(event) {
  const param = event.params.slug;

  const response = await fetch(`http://localhost:5000/public/users/${param}`, {
    method: "GET",
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

export async function post(event) {
  const payload = event.request.body;

  const response = await fetch("http://localhost:5000/confess", {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: payload
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
