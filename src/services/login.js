import axios from 'axios'

const login = credentials => {
   console.log('inside login service')
   const request = axios.post('/api/login/', credentials)
   return request.then(response => response.data)
                 .catch(err => console.log(err))
}

export default { login }
