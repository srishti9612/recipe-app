const setToken = newToken => {
  const token = `bearer ${newToken}`
  window.localStorage.setItem('token', token)
}

export default { setToken }
