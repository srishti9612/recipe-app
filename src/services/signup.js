import axios from 'axios'

const signup = newUser => {
  //const request = axios.post('/api/users/', newUser)
  const request = axios.post('/api/user/', newUser)
  return request.then(response => response.data)
}

export default { signup }
