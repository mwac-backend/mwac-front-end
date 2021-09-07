export class API_URL {
  // static BASE_URL = "http://68.183.236.106/api/v1";
  static BASE_URL = "https://mwac.herokuapp.com/api/v1";
  // static BASE_URL = "http://localhost:3006/api/v1";

  static login = API_URL.BASE_URL + '/oauth/login';
  static submission_control = API_URL.BASE_URL + '/submission/control';
  static submission_control_all = API_URL.BASE_URL + '/submission/control/all';
  static submission_control_document = API_URL.BASE_URL + '/submission/control/document';

  static userInfo = API_URL.BASE_URL + '/user/info'

  static submissionOrder = API_URL.BASE_URL + '/submission/order'
  static orderDocument = API_URL.BASE_URL + '/submission/order/document'
  // static orderDocument = API_URL.BASE_URL + '/order/document'

  static apiAgency = API_URL.BASE_URL + '/agency'
  static listUserByAgency = API_URL.BASE_URL + '/listUserByAgency'

  static getsubmissionOrderStatus = API_URL.BASE_URL + '/submissionOrderStatus'
  static getSubmissionControlStatus = API_URL.BASE_URL + '/submissionControlStatus'
  
  static getMappingJoy = API_URL.BASE_URL + '/submission/list-mapping-by-agency'


  static getsubmissionControlById = API_URL.BASE_URL + '/submission/control/by-id'


}
