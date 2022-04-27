export async function post({ request }) {
  const response = await fetch("http://localhost:5000/signup", {
    method: "POST",
    body: request.body,
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  });
  const json = await response.json();

  if (json.status === "error") {
    return {
      status: response.status,
      body: json
    }
  }

  return {
    status: 302,
    redirect: "/login"
  }
}
