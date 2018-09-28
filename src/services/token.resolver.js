export function tokenResolver() {

    let tokenTmp = '';
    let headersTmp = '';

    if (localStorage.getItem('Token') !== '') {
        tokenTmp = localStorage.getItem('Token');
        headersTmp = {
            'Authorization': 'Bearer ' + tokenTmp,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'withCredentials': true
        };
        return headersTmp;
    }

}