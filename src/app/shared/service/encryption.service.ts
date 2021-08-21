import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  key: string = 'z!!!!!!!1sdfadsf56adf456asdfasdf';
  appProperties = {
    VALUES: {
      KEY: 'MTIzNDU2Nzg5MEFCQ0RFRkdISUpLTE1O',
      IV: 'MTIzNDU2Nzg=',
    },
  };

  encryptSecretKey = 'hjalhfaldlandladladladldhalhdlajdlahdaahamnah,mnada,mdnahd';
  constructor() {}

 
 encryptionAES(data) {

    try {
      return crypto.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      console.error(e);
    }
  }

  decryptionAES(data) {

    try {
      const bytes = crypto.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(crypto.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.error(e);
    }
  }
}
