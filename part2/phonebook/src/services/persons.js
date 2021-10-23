import axios from "axios"

const endpoint = "http://localhost:3001/persons"

const getAll = () => {
  const request = axios.get(endpoint)
  return request.then((response) => response.data)
}

const sendPerson = (newPerson) => {
  const request = axios.post(endpoint, newPerson)
  return request.then((response) => response.data)
}

const personsUtils = { getAll, sendPerson }

export default personsUtils
