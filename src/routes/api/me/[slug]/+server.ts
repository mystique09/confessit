import { json as json$1 } from '@sveltejs/kit';

export async function GET(event) {
  const param = event.params.slug;

  const response = await fetch(`${process.env.VITE_BACKEND_URL}/public/users/${param}`, {
    method: "GET",
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  });

  const data = await response.json();

  if (data.status === "error") {
    // throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
    // Suggestion (check for correctness before using):
    return json$1(data, {
      status: response.status
    });
    // return {
    //   status: response.status,
    //   body: data
    // }
  }

  // throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
  // Suggestion (check for correctness before using):
  return json$1(data);
  // return {
  //   status: 200,
  //   body: data
  // }
}

export async function POST(event) {
  const payload = event.request.body;

  const response = await fetch(`${process.env.VITE_BACKEND_URL}/confess`, {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: payload
  });

  const data = await response.json();

  if (data.status === "error") {
    // throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
    // Suggestion (check for correctness before using):
    return json$1(data, {
      status: response.status
    });
    // return {
    //   status: response.status,
    //   body: data
    // }
  }

  // throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
  // Suggestion (check for correctness before using):
  return json$1(data);
  // return {
  //   status: 200,
  //   body: data
  // }
}
