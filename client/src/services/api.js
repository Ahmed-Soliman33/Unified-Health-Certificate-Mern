// API service functions

export const createUser = async (userData) => {
  try {
    const formData = new FormData();
    const { photo, ...rest } = userData;
    formData.append("userData", JSON.stringify(rest));

    const blob = await (await fetch(photo)).blob();
    const file = new File([blob], "photo.png", { type: blob.type });

    formData.append("photo", file);

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || `Error: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const fetchUser = async (userId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
