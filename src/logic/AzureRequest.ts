 let Orchestrator = "http://localhost:7071/api/orchestrators/Main"

export async function select(selectCommd: String) {
    // Default options are marked with *
    const response = await fetch(Orchestrator, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors,
      headers: {
        "call": "select",
        "parameters": JSON.stringify({"selectCommd": selectCommd})
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function postForm(data: Object) {
  // Default options are marked with *
  const response = await fetch(Orchestrator, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'call': 'form',
      "parameters": JSON.stringify({})
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

