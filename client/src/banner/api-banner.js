const create = (params, credentials, upload) => {
  return fetch('/api/banners/new/'+ params.userId, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: upload
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const listBannersByUser = (params, credentials) => {
  return fetch('/api/dashboard/banners/by/'+ params.userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}

const listBannersByUserNoAuth = (params) => {
  return fetch('/api/banners/by/'+ params.userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}

const remove = (params, credentials) => {
  return fetch('/api/banners/' + params.bannerId, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}


export {
  listBannersByUser,
  listBannersByUserNoAuth,
  create,
  remove
}
