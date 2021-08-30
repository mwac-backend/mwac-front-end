export class API_URL {
  static BASE_URL = "https://mwac.herokuapp.com/api/v1";

  static login = API_URL.BASE_URL + '/oauth/login';
  static userInfo = API_URL.BASE_URL + '/user/info'

  static submission_control = API_URL.BASE_URL + '/submission/control'



  static submissionOrder = API_URL.BASE_URL + '/submission/order'
  static orderDocument = API_URL.BASE_URL + '/submission/order/document'
  // static orderDocument = API_URL.BASE_URL + '/order/document'

  static apiAgency = API_URL.BASE_URL + '/agency'

  static getsubmissionOrderStatus = API_URL.BASE_URL + '/submissionOrderStatus'




}
