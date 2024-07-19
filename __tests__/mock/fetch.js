

 export async function dummyFetchTest() {

  const data = await fetch('https://jsonplaceholder.typicode.com/posts');

  return data.status
}

