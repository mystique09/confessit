import { json as json$1 } from '@sveltejs/kit';

export async function GET({ request }) {
  const session = request.headers.get("authorization");

  if (!session) {
    return json$1({
      status: "error",
      message: "Forbidden",
      data: null
    }, {
      status: 403
    });
  }

  const response = await fetch(`${process.env.VITE_BACKEND_URL}/users/profile`, {
    method: "GET",
    headers: {
      "content-type": 'application/json',
      'accept': 'application/json',
      'authorization': session
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

  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
  // Suggestion (check for correctness before using):
  return json$1(data);
  // return {
  //   status: 200,
  //   body: data
  // }
}
