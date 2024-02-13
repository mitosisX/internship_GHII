export async function FetchData() {
  try {
    const response = await fetch("https://api.github.com/repositories");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    // console.error(error);
  }
}
