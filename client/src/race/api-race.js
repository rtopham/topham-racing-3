const create = (params, credentials, race) => {
//console.log(race)
  return fetch('/api/races/new/'+ params.userId, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify(race)
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const update = (params, credentials, race) => {
  return fetch('/api/races/' + params.raceId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify(race)
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

const listByUser = (params, credentials) => {
//  console.log(params)
  return fetch('/api/races/by/'+ params.userId, {
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

const listByUserSearch = (params) => {
//  console.log('/api/races/feed/'+ params.userId+params.search)
  return fetch('/api/races/feed/'+ params.userId+params.search, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}

const remove = (params, credentials) => {
  return fetch('/api/races/' + params.raceId, {
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
  listByUser,
  listByUserSearch,
  create,
  update,
  remove
}
