const getConfig = () => {
   console.log('inside getConfig function')
   const token = window.localStorage.getItem('token')

   const cfg = {
     headers: { Authorization: token },
   }

   return cfg
}

export default { getConfig }
