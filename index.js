import dotenv from 'dotenv';
dotenv.config();

const headers = {
    'accept-encoding': 'gzip',
    'cache-control': 'no-cache',
    connection: 'Keep-Alive',
    'content-type': 'application/json',
    product: 'llu.android',
    version: '4.7',
  }

const api_endpoint = 'https://api-eu.libreview.io'
const email = "jakob.research@gmail.com"
const password = process.env.PASSWORD

const setToken = async (email, password) => {

    const loginData = {email, password}
    const response = await fetch(api_endpoint + '/llu/auth/login', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(loginData)
    })
    const data = await response.json()
    const jwt_token = data['data']['authTicket']['token']
    headers.authorization = 'Bearer ' + jwt_token
}

const getPatientId = async () => {
    const response = await fetch(api_endpoint + '/llu/connections', {
        method: 'GET',
        headers: headers
    })
    const data = await response.json()
    const id = data['data'][0]['patientId']
    return id
}

const getPatientData = async (patientId) => {
    const response = await fetch(api_endpoint + "/llu/connections/" + patientId + "/graph", {
        method: 'GET',
        headers: headers
    })
    const data = await response.json()
    // const dataPoints = data['data']['connection']['glucoseMeasurement']
    console.log(data)
}

const main = async () => {
    await setToken(email, password)
    const patient_id = await getPatientId()
    await getPatientData(patient_id)
}

main()


