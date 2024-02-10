const codeGenerator = ({language,url,payload,type}) => {

    switch (language) {
        case "python":
            return `import requests

            url = ${url}
            
            payload = ${payload}
            headers = {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmY3ZjM4MDgtMzlmNC00YTRjLThhMTYtNjlhOWY1MDNiNDllIiwib3JnX2lkIjoxLCJleHAiOjE3MDgxMDAzNjksImlhdCI6MTcwNzQ5NTU2OX0.e3Zysf1jmQuZ37mK_Xx49YMc-5IqruP4fHWeN1H42oU',
              'Origin': 'localHost'
            }
            
            response = requests.request("${type}", url, headers=headers, data=payload)
            
            print(response.text)`
                
        case "javascript":
                return `var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmY3ZjM4MDgtMzlmNC00YTRjLThhMTYtNjlhOWY1MDNiNDllIiwib3JnX2lkIjoxLCJleHAiOjE3MDcxNTc4OTQsImlhdCI6MTcwNjU1MzA5NH0.J6pSZSkSRFGP0HtL2EL9L2uF28CalR6XqFl5HFfksvA");
                myHeaders.append("Origin", local");
                
                var requestOptions = {
                  method: '${type}',
                  headers: myHeaders,
                  redirect: 'follow'
                };
                
                fetch("${url}", requestOptions)
                  .then(response => response.text())
                  .then(result => console.log(result))
                  .catch(error => console.log('error', error));`
        default:

        return `curl --location '${url}' \n
        --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmY3ZjM4MDgtMzlmNC00YTRjLThhMTYtNjlhOWY1MDNiNDllIiwib3JnX2lkIjoxLCJleHAiOjE3MDcxNTc4OTQsImlhdCI6MTcwNjU1MzA5NH0.J6pSZSkSRFGP0HtL2EL9L2uF28CalR6XqFl5HFfksvA' \n
        --header 'Origin: "local"' \n
        --header 'Content-Type: application/json' \n
        --data '${payload}' `
    }

}

export default codeGenerator