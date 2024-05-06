import env from "../hooks/backendEnv";

/*
/////////////////////////////
export const getMenuService = async (data) => {
  const path = new URL(`${env}/news`);
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  if (data?.topic) {
    path.searchParams.append("topic", data.topic);
    searchParams.set("topic", data.topic);
    window.history.pushState(
      {},
      "",
      `${url.pathname}?${searchParams.toString()}`
    );
  }
  if (data?.keyword) {
    path.searchParams.append("keyword", data.keyword);
    searchParams.set("keyword", data.keyword);
    window.history.pushState(
      {},
      "",
      `${url.pathname}?${searchParams.toString()}`
    );
  }
  const response = data.token
    ? await fetch(path, {
        headers: {
          Authorization: data.token,
        },
      })
    : await fetch(path);
  if (!response.ok) {
    throw new Error(json.message);
  }
  const json = await response.json();
  return json.data;
};
/////////////////////////////////
/////////////////////////////////////////
export const getUserFoodsService = async (id) => {
  const response = await fetch(`${env}/users/${id}/news`);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

///////////////////////////////
export const getUserNewsService = async (id) => {
  const response = await fetch(`${env}/users/${id}/news`);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};
export const getSingleNewsService = async (id, token) => {
  const response = await fetch(`${env}/news/${id}`, {
    headers: { Authorization: token },
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data.news;
};
//
export const deleteFoodService = async (id, token) => {
  const response = await fetch(`${env}/news/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
};
//
*/
export const registerUserService = async ({
  first_name,
  last_name,
  email,
  password,
}) => {
  const response = await fetch(`${env}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ first_name, last_name, email, password }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
};

export const loginUserService = async ({ email, password }) => {
  const response = await fetch(`${env}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data.token;
};

export const getMyUserDataService = async ({ token }) => {
  const response = await fetch(`${env}/users`, {
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.user;
};

export const updateEmailService = async (token, userId, oldEmail, newEmail) => {
  if (oldEmail !== newEmail) {
    const response = await fetch(`${env}/users/${userId}/email`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ oldEmail, newEmail }),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message);
    }
    return json;
  }
  // Si el nuevo correo es igual al antiguo, simplemente retorna sin hacer nada.
};

export const editUserNameService = async (
  token,
  userId,
  { first_name, last_name }
) => {
  const response = await fetch(`${env}/users/${userId}/name`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ first_name, last_name }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const editUserAddressService = async (
  token,
  userId,
  delivery_address,
  telephone
) => {
  console.log(
    "token",
    token,
    "delivery_address",
    delivery_address,
    "telephone",
    telephone,
    "userId",
    userId
  );
  const response = await fetch(`${env}/users/${userId}/address`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ delivery_address, telephone }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};

export const changePasswordService = async (
  token,
  userId,
  currentPassword,
  newPassword
) => {
  const body = {
    newPass: newPassword,
  };

  if (currentPassword) {
    // Solo incluir oldPass si se proporciona la contraseña actual
    body.oldPass = currentPassword;
  }

  const response = await fetch(`${env}/users/${userId}/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};
