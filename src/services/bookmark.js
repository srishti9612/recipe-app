import axios from 'axios'
import conf from './Config.js'

const  addbookmark = (bookmarkId) => {
    console.log('inside bookmark service')
    console.log(bookmarkId)
    
    const config = conf.getConfig()
    // same as old api //
    const request = axios.post('/api/bookmark/', bookmarkId, config)

    return request.then(response => response.data)
	          .catch(err => console.log(err))
}

export default { addbookmark }
