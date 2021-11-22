import config from "../config";

const { API_URL } = config;

const localStorageTokenKey = "app-token";
const localStorageData = "app-userInfo";

const state = {
  token: localStorage.getItem(localStorageTokenKey),
  data: localStorage.getItem(localStorageData),
};

export const post = (path, data) => {
  const isFormData = data instanceof FormData;
  return fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
    body: isFormData ? data : objectToFormData(data),
  })
    .then(handleError)
    .then((r) => r.json());
};

function objectToFormData(obj) {
  const formData = new FormData();
  for (const fieldName in obj) {
    formData.append(fieldName, obj[fieldName]);
  }
  return formData;
}

async function handleError(response) {
  if (!response.ok) {
    throw Error(response.status);
  }
  return response;
}
