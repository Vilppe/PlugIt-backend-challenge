# Plugit Challenge Back-end
#### by Vili Manninen

This is my take on the PlugIt back-end challenge

To start run these commands in the project root folder:
```
npm install uuid-v4
```
```
node --inspect development/httpResponse.js
```
in the Plugit-backend-challenge folder

and navigate to this address with your web browser:
```
http://localhost:1337/response
```
<br /><br /><br /><br /><br /><br /><br /><br />

#### Original README of the challenge:

# Plugit Challenge Back-end

Make reporting API for transaction data

Report contains total energy (wh), total duration (seconds), top 5 charge points which has most transactions and top 5 clients who has most energy charged
### Example response structure
```
{
  totalEnergy: 102341,
  totalDuration: 122135,
  top5Chargepoints: [
    { _id: 'efc9c7f1-a0ca-45ce-a709-58576b674f3a', amount: 100 },
    { _id: 'efc9c7f1-a0ca-45ce-a709-58576b674f3a', amount: 80 },
    { _id: 'efc9c7f1-a0ca-45ce-a709-58576b674f3a', amount: 71 },
    { _id: 'efc9c7f1-a0ca-45ce-a709-58576b674f3a', amount: 20 },
    { _id: 'efc9c7f1-a0ca-45ce-a709-58576b674f3a', amount: 11 }
  ],
  top5Clients: [
    { _id: 'efc9c7f1-a0ca-45ce-a709-58576b674f31', energy: 102131 },
    { _id: 'efc9c7f1-a0ca-45ce-a709-58576b674f32', energy: 102031 },
    { _id: 'efc9c7f1-a0ca-45ce-a709-58576b674f33', energy: 10131 },
    { _id: 'efc9c7f1-a0ca-45ce-a709-58576b674f34', energy: 10031 },
    { _id: 'efc9c7f1-a0ca-45ce-a709-58576b674f35', energy: 1021 }
  ]
}
```
### Endpoint url
```
GET
/report
```

## Transaction data is in ./development/transations.json file

## Make your service in this project and send it to your contact person
