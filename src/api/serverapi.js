import { localurl } from "../common/serverurl";

const baseurl = localurl;

class serverapi {
  static deleteDiary(id) {
    return fetch(baseurl + `get/deleteDiary/${id}`, {
      method: "GET",
      headers: {},
    }).then((response) => {
      return response.json();
    });
  }

  static createDiary(data) {
    return fetch(baseurl + "post/diary", {
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
    return fetch(baseurl + "get/diaries", {
      method: "GET",
      headers: {},
    }).then((response) => {
      return response.json();
    });
  }
}

export default serverapi;
