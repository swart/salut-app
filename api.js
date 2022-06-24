export async function authenticate() {
  const body = {
    grant_type: 'password',
    client_id: 'salutmobile',
    username: 'Craigneill+tst3@gmail.com',
    password: 'Test123!!',
    client_secret: 'Qj2CcT86pgnaU2jS',
  };

  return fetch(
    'https://salut-iam-tst.gezondmetsalut.nl/api/connect/token',
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then((response) => {
    return response.json();
  }).catch((e) => {
    console.log(e);
  });
}

export async function getData(token) {
  return fetch(
    'https://salut-health-tst.gezondmetsalut.nl/api/KeyValue',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  ).then((response) => {
    return response.json();
  }).catch((e) => {
    console.log(e);
  });
}
