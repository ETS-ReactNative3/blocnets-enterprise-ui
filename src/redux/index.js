import { combineReducers } from 'redux';
import MainActions from './actions/main.actions';
import { items, itemsHaveError, itemsAreLoading } from './reducers/main.reducers';
import Axios from 'axios';

const serviceKey = {
  "type": "hyperledger-fabric",
  "channelId": "dev4f374fb9-1164-4c22-876e-8fe13ab5def6channel1",
  "serviceUrl": "https://hyperledger-fabric.cfapps.us10.hana.ondemand.com/api/v1",
  "documentationUrl": "https://api.sap.com/shell/discover/contentpackage/SCPBlockchainTechnologies/api/hyperledger_fabric",
  "oAuth": {
    "clientId": "sb-8577def2-36d0-48c9-8e83-d836e677b190!b947|na-3a01f1e2-bc33-4e12-86a2-ffffaea79918!b33",
    "clientSecret": "lUloVt0Yqx/H2sIyGfc6rdTbUyM=",
    "url": "https://development.authentication.us10.hana.ondemand.com",
    "identityZone": "development"
  }
};

export function getData() {
  return (dispatch) => {
    return Axios.get(serviceKey.oAuth.url + '/oauth/token?grant_type=client_credentials', {
      headers: {
        'Authorization': 'Basic ' + btoa(serviceKey.oAuth.clientId + ":" + serviceKey.oAuth.clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    })
      .then((response) => {
        let token = response.data.access_token;
        let chaincodeId = '4f374fb9-1164-4c22-876e-8fe13ab5def6-com-sap-blocnets-supplychain';
        Axios.get(serviceKey.serviceUrl + '/chaincodes/' + chaincodeId + '/latest/' + '34534b44b345b44b', {
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'withCredentials': true
          }
        })
          .then((response) => {
            //dispatch(searchByKeyword((response.data)));
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
  }
}

export default combineReducers({
  items,
  itemsHaveError,
  itemsAreLoading
});
