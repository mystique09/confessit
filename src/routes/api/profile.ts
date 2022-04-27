export async function get({ request }) {
  const session = request.headers.get("authorization");

  if (!session) {
    return {
      status: 403,
      body: {
        status: "error",
        message: "Forbidden",
        data: null
      }
    }
  }

  const response = await fetch("http://localhost:5000/users/profile", {
    method: "GET",
    headers: {
      "content-type": 'application/json',
      'accept': 'application/json',
      'authorization': session
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
