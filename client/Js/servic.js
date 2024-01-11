const baceUrl = "http://localhost:3000/foods";

export const getAllCategory = async () => {
  try {
    const res = await fetch(baceUrl);
    const data = await res.json();


    return data;
  } catch (error) {}
};

export const getSingleCategory = async (id) => {
  try {
    const res = await fetch(`${baceUrl}/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {}
};
