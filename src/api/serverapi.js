import { localurl } from "../common/serverurl";
import { amazonurl } from "../common/serverurl";

const baseurl = localurl;

class serverapi {
  static trySignup(loginID, password) {
    return fetch(baseurl + "post/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        loginID,
        password,
      }),
    }).then((response) => {
      return response.json();
    });
  }

  static tryLogin(loginID, password) {
    return fetch(baseurl + "post/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        loginID,
        password,
      }),
    });
  }

  static deleteDiary(authorization, id) {
    return fetch(baseurl + `get/deleteDiary/${id}`, {
      method: "GET",
      headers: {
        authorization,
      },
    }).then((response) => {
      return response.json();
    });
  }

  static createDiary(authorization, data) {
    return fetch(baseurl + "post/diary", {
      method: "POST",
      headers: {
        authorization,
        Accept: "application/json, application/xml, text/plain, text/html",
      },
      body: data,
    }).then((response) => {
      return response.json();
    });
  }

  static getDiaries(authorization) {
    return fetch(baseurl + "get/diaries", {
      method: "GET",
      headers: {
        authorization,
      },
    }).then((response) => {
      return response.json();
    });
  }
}

export default serverapi;
