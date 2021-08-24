export class API_URL {
  static BASE_URL = "http://localhost:3006/api/v1";

  static login = API_URL.BASE_URL + '/oauth/login';
  static submission_control = API_URL.BASE_URL + '/submission/control'
  static userInfo = API_URL.BASE_URL + '/user/info'

  static submissionOrder = API_URL.BASE_URL + '/submission/order'
  static orderDocument = API_URL.BASE_URL + '/submission/order/document'
}
