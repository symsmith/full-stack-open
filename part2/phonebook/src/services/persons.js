import axios from "axios"

const endpoint = "/api/persons"

const getAll = () => {
  const request = axios.get(endpoint)
  return request.then((response) => response.data)
}

const sendPerson = (newPerson) => {
  const request = axios.post(endpoint, newPerson)
  return request.then((response) => response.data)
}

const changeNumber = (newPerson) => {
  const request = axios.put(`${endpoint}/${newPerson.id}`, newPerson)
  return request.then((response) => response.data)
}

const deletePerson = (id) => {
  return axios.delete(`${endpoint}/${id}`)
}

const personsUtils = { getAll, sendPerson, changeNumber, deletePerson }

export default personsUtils
