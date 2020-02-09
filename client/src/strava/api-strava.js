import clientConfig from '../clientconfig.js'

const getNewStravaTokens = (params) => {
  return fetch(`https://www.strava.com/api/v3/oauth/token?client_id=${clientConfig.stravaClientId}&client_secret=${clientConfig.stravaClientSecret}&grant_type=refresh_token&refresh_token=${params.stravaRefreshToken}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}

const getStravaByUser = (params) => {
  return fetch(`https://www.strava.com/api/v3/athletes/${params.stravaId}/stats`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+params.stravaToken
    },
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}


const getStravaRaceData= (params) =>{

       let theDate = new  Date(params.raceDate);
       let theEpoch = theDate.getTime()/1000.0;
//       console.log(theDate)
    return fetch(`https://www.strava.com/api/v3/athlete/activities?after=${theEpoch}&per_page=5`,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+params.stravaToken
      },


    }).then(response => {
      return response.json()
    }).catch((err) => console.log(err))
  }



export {
  getStravaByUser,
  getStravaRaceData,
  getNewStravaTokens
}
