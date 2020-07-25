
class serverapi {

    static createDiary(data) {
        return fetch('/post/diary', {
            method: 'POST',
            headers:{
                'Accept': 'application/json, application/xml, text/plain, text/html'
            },
            body: data
        })
        .then((response)=>{
            return response.json();
        });
        
    }

    static getDiaries() {
        return fetch('/get/diaries', {
            method: 'GET',
            headers:{

            }
        })
        .then(response=>{
            return response.json();
        })
    }
}

export default serverapi;