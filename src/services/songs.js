const options = {
  method: 'GET',
  url: 'https://spotify23.p.rapidapi.com/search/',
  params: {
    q: 'tracks',
    type: 'multi',
    offset: '0',
    limit: '10',
    numberOfTopResults: '5'
  },
  headers: {
    'x-rapidapi-key': '6e1e17dee8msh9668a4cd17e61c5p19db49jsn156edf76953f',
    'x-rapidapi-host': 'spotify23.p.rapidapi.com'
  }
};



export default op