const create = (params, credentials, upload) => {
  return fetch('/api/bannerlinks/new/'+ params.userId, {
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

const listBannerLinksByUser = (params, credentials) => {
  return fetch('/api/dashboard/bannerlinks/by/'+ params.userId, {
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

const listBannerLinksByUserNoAuth = (params) => {
  return fetch('/api/bannerlinks/by/'+ params.userId, {
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
  return fetch('/api/bannerlinks/' + params.bannerId, {
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
  listBannerLinksByUser,
  listBannerLinksByUserNoAuth,
  create,
  remove
}
