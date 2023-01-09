const serverAddress = 'http://localhost:3000';

const getBikes = async () => {
  const response = await fetch(`${serverAddress}/bikes`);
  const bikes = await response.json();

  return bikes;
}

const deleteBike = async (id) => {
  const response = await fetch(`${serverAddress}/bikes/${id}`, {
    method: 'DELETE'
  });
  const bikes = await response.json();

  return bikes;
}

const createBike = async (bikeProps) => {
  const response = await fetch(`${serverAddress}/bikes`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(bikeProps)
  });
  const bikes = await response.json();

  return bikes;
}

const updateBike = async (id, bikeProps) => {
  const response = await fetch(`${serverAddress}/bikes/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(bikeProps)
  });
  const bikes = await response.json();

  return bikes;
}

const ApiService = {
  getBikes,
  deleteBike,
  createBike,
  updateBike,
};

export default ApiService;
