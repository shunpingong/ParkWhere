import * as React from 'react';

export default function API(){
    const tokenGet = () => {
        fetch('https://www.ura.gov.sg/uraDataService/insertNewToken.action' , {
            headers: {'AccessKey': 'af28342c-a335-4252-b3b7-51cfb8d158ba'}
          } )
            .then(res => res.json)
            .then((json) => console.log(json))
            .catch(error => console.log(error))
      };
    return(
        <div>
            API<br/>
            <button onClick={tokenGet}>fetchAPI</button>
        </div>
    );
}

