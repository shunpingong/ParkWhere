// import * as React from 'react';

// export default function API(){
//     const tokenGet = () => {
//         fetch('https://www.ura.gov.sg/uraDataService/insertNewToken.action' , {
//             headers: {'AccessKey': 'af28342c-a335-4252-b3b7-51cfb8d158ba'}
//           } )
//             .then(res => res.json)
//             .then((json) => console.log(json))
//             .catch(error => console.log(error))
//       };
//     return(
//         <div>
//             API<br/>
//             <button onClick={tokenGet}>fetchAPI</button>
//         </div>
//     );
// }

import * as React from 'react';

export default function API(){
    const url = "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability";
    const accessKey = "af28342c-a335-4252-b3b7-51cfb8d158ba";
    const token = "cSBab183cf3+amS8q33aUmNf-uk5+d3ZccS8S2rQ8-va55uPbP25fb1D7bb38u-Xg5-xpDD2asGDp8QMhC4@aAB281T1T+5CMY3b";

    const tokenGet = async () => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'AccessKey': accessKey,
                'Token': token
            }
        });
        const data = await response.json();
        console.log(data);
    }

    return(
        <div>
            API<br/>
            <button onClick={tokenGet}>fetchAPI</button>
        </div>
    );
}

