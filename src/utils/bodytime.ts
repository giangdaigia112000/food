

var CryptoJS = require('crypto-js');
export const dobatduocminh = () => {
  const b1 = process.env.NEXT_PUBLIC_HIHI;
  const bb = process.env.NEXT_PUBLIC_DLDM;
  const bbb = process.env.customKey;
  return b1 + '' + bb + bbb + '';
};

export const authorizationDownload = () => {
  const getDate = new Date();
  const h = getDate.getUTCHours();
  const m = getDate.getUTCMinutes();
  const s = getDate.getUTCSeconds();
  const time = h * 3600 + m * 60 + s;
  const k1 = CryptoJS.HmacSHA1(time.toString(), dobatduocminh()).toString(CryptoJS.enc.Base64);

};
