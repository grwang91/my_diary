import * as baseurl from "../common/serverurl";

class serverapi {
  static deleteDiary(id) {
    return fetch(baseurl.amazonurl + `get/deleteDiary/${id}`, {
      method: "GET",
      headers: {},
    }).then((response) => {
      return response.json();
    });
  }

  static createDiary(data) {
    return fetch(baseurl.amazonurl + "post/diary", {
      method: "POST",
      headers: {
        Accept: "application/json, application/xml, text/plain, text/html",
      },
      body: data,
    }).then((response) => {
      return response.json();
    });
  }

  static getDiaries() {
    return fetch(baseurl.amazonurl + "get/diaries", {
      method: "GET",
      headers: {},
    }).then((response) => {
      return response.json();
    });
  }
}

export default serverapi;
