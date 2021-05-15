import Axios from 'axios';
import MobileDetect from 'mobile-detect';

import { CLIENT_USER_URL } from '../constants';
import CognitensorAsyncStorageService from '../services/asyncstorage/CognitensorAsyncStorageService';

const sortObject = (object, ascending) => {
  const sortable = [];
  Object.keys(object).forEach((key) => sortable.push([key, object[key]]));
  return sortable.sort((a, b) => {
    if (ascending !== undefined && ascending === false) {
      return b[1] - a[1];
    }
    return a[1] - b[1];
  });
};

const sortObjectArray = (object) => {
  const sortable = [];
  Object.keys(object).forEach((key) => sortable.push([key, object[key]]));
  return sortable.sort((a, b) => {
    let q1 = 0;
    a[1].forEach((d) => {
      q1 += d;
    });
    let q2 = 0;
    b[1].forEach((d) => {
      q2 += d;
    });
    return q1 - q2;
  });
};

const groupDataBy = (
  clientList,
  groupValue,
  productId,
  clientName,
  currentQuarter,
) => {
  const groupOne = [];

  clientList.forEach((d) => {
    const idGroup = d[groupValue];
    const value = d.sales_amount;

    if (!value || value < 0) {
      return;
    }

    const pValue = d.item_code;
    const qm = new Date(d.order_date).getMonth();
    const { name } = d;

    if (
      (productId && pValue !== productId && productId !== '0') ||
      (clientName && name !== clientName) ||
      (currentQuarter &&
        Math.floor(qm / 3) !== currentQuarter &&
        (Math.floor(qm / 3) !== 0 || currentQuarter !== 4))
    ) {
      return;
    }

    if (groupOne[idGroup]) {
      groupOne[idGroup] += value;
    } else {
      groupOne[idGroup] = value;
    }
  });

  return groupOne;
};

const getRenderArrayGroupedBY = (
  clientListCurr,
  clientListPrev,
  currentYear,
  compareYear,
  groupBy,
  productId,
  clientName,
  currentQuarter,
  compareQuarter,
) => {
  const groupCurr = sortObject(
    groupDataBy(clientListCurr, groupBy, productId, clientName, currentQuarter),
  );
  const groupPrev = groupDataBy(
    clientListPrev,
    groupBy,
    productId,
    clientName,
    compareQuarter,
  );
  const yearCurr = currentYear;
  const yearPrev = compareYear;

  const renderArrayCurr = [];
  const renderArrayPrev = [];

  const maxLength = groupCurr.length >= 10 ? groupCurr.length - 10 : 0;

  for (let i = groupCurr.length - 1; i >= maxLength; i -= 1) {
    const key = groupCurr[i][0];
    const value = groupCurr[i][1];
    let valuePrev = 0;

    renderArrayCurr.push({ x: value, y: key, year: yearCurr });
    if (groupPrev[key]) {
      valuePrev = groupPrev[key];
    }
    renderArrayPrev.push({ x: valuePrev, y: key, year: yearPrev });
  }

  return { renderArrayCurr, renderArrayPrev };
};

const getMonthGroup = (
  data,
  groupBy,
  productId,
  clientName,
  currentQuarter,
) => {
  const array = new Array(12).fill(0);
  data.forEach((d) => {
    const value = d.sales_amount;

    if (!value || value < 0) {
      return;
    }

    const mValue = parseInt(d.order_date.substring(5, 7), 10) - 1;
    const pValue = d.item_code;
    const qm = new Date(d.order_date).getMonth();
    const { name } = d;

    if (
      (productId && pValue !== productId && productId !== '0') ||
      (clientName && clientName !== name) ||
      (currentQuarter &&
        Math.floor(qm / 3) !== currentQuarter &&
        (Math.floor(qm / 3) !== 0 || currentQuarter !== 4))
    ) {
      return;
    }

    const quantity = parseInt(d[groupBy], 10);
    array[mValue] += quantity;
  });

  return array;
};

const getRenderArrayGroupedByMonth = (
  clientListCurr,
  clientListPrev,
  currentYear,
  compareYear,
  groupBy,
  productId,
  clientName,
  currentQuarter,
  compareQuarter,
) => {
  const monthCurr = getMonthGroup(
    clientListCurr,
    groupBy,
    productId,
    currentQuarter,
  );
  const monthPrev = getMonthGroup(
    clientListPrev,
    groupBy,
    productId,
    compareQuarter,
  );

  const renderArrayCurr = monthCurr.map((d, index) => ({
    x: index,
    y: d,
    year: currentYear,
  }));

  const renderArrayPrev = monthPrev.map((d, index) => ({
    x: index,
    y: d,
    year: compareYear,
  }));

  return { renderArrayCurr, renderArrayPrev };
};

const getTotalValues = (clientList, productId, clientName, currentQuarter) => {
  let totalSales = 0;
  let totalQuantitySold = 0;
  let totalReturns = 0;
  let totalQuantityReturned = 0;

  clientList.forEach((d) => {
    const pValue = d.item_code;
    const qm = new Date(d.order_date).getMonth();
    const { name } = d;

    if (
      (productId && pValue !== productId && productId !== '0') ||
      (clientName && clientName !== name) ||
      (currentQuarter &&
        Math.floor(qm / 3) !== currentQuarter &&
        (Math.floor(qm / 3) !== 0 || currentQuarter !== 4))
    ) {
      return;
    }

    if (d.sales_amount > 0) {
      totalSales += d.sales_amount;
      totalQuantitySold += d.quantity;
    } else {
      totalReturns += d.sales_amount;
      totalQuantityReturned += d.quantity;
    }
  });

  return {
    totalSales,
    totalQuantitySold,
    totalReturns,
    totalQuantityReturned,
  };
};

const getLists = (data, productId, clientName, currentQuarter) => {
  const products = {};
  const clients = {};

  data.forEach((d) => {
    const value = d.sales_amount;
    if (!value) {
      return;
    }

    const pValue = d.item_code;

    if (!pValue) {
      return;
    }

    const qm = new Date(d.order_date).getMonth();
    const { name } = d;

    if (
      currentQuarter &&
      Math.floor(qm / 3) !== currentQuarter &&
      (Math.floor(qm / 3) !== 0 || currentQuarter !== 4)
    ) {
      return;
    }

    if (!products[pValue] && !(clientName && clientName !== name)) {
      products[pValue] = true;
    }

    if (!clients[name] && !(productId && productId !== pValue)) {
      clients[name] = true;
    }
  });

  const productList = [{ key: 0, value: '0', text: 'All products' }].concat(
    Object.keys(products).map((key) => ({
      key,
      value: key,
      text: key.substring(0, 20),
    })),
  );

  const listClients = [{ key: 0, value: 0, text: 'All clients' }].concat(
    Object.keys(clients).map((key) => ({
      key,
      value: key,
      text: key.substring(0, 20),
    })),
  );

  return { productList, listClients };
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const numberWithCommas = (val) => {
  try {
    const x = parseFloat(val.toFixed(2));
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  } catch (err) {
    console.log(err);
    return '0';
  }
};

const numberWithCommasNoDec = (val) => {
  try {
    const x = parseFloat(val.toFixed(0));
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  } catch (err) {
    console.log(err);
    return '0';
  }
};

const labelMaker = (labelValue) => {
  let sign = '-';
  if (labelValue >= 0) {
    sign = '';
  }
  // Nine Zeroes for Billions
  if (Math.abs(Number(labelValue)) >= 1.0e9) {
    return `${sign}${Math.abs(Number(labelValue)) / 1.0e9}B`;
  }
  if (Math.abs(Number(labelValue)) >= 1.0e6) {
    return `${sign}${Math.abs(Number(labelValue)) / 1.0e6}M`;
  }
  if (Math.abs(Number(labelValue)) >= 1.0e3) {
    return `${sign}${Math.abs(Number(labelValue)) / 1.0e3}K`;
  }
  return `${sign}${numberWithCommas(Math.abs(Number(labelValue)))}`;
};

const getYears = (results) => {
  const years = [];

  results.forEach((d) => {
    const oDate = new Date(d.order_date);
    const value = d.sales_amount;
    if (Number.isNaN(oDate) || !value) {
      return;
    }

    const month = oDate.getMonth() + 1;
    const year = month >= 4 ? oDate.getFullYear() : oDate.getFullYear() - 1;

    if (years[year]) {
      years[year].push(d);
    } else {
      years[year] = [d];
    }
  });

  return years;
};

const createYearList = (years) =>
  Object.keys(years)
    .sort()
    .map((key) => ({ key, value: key, text: key }));

const getYearsList = (years) => {
  const arr = Object.keys(years).map((key) => ({
    key: key.toString(),
    value: key.toString(),
    text: key.toString(),
  }));

  return { list: arr, currentYear: arr[0].key };
};

const getDate = (date, format) => {
  if (!format) {
    return new Date(date);
  }

  if (format === 'en-in') {
    const [dd, mm, yy] = date.replace(/-/g, '/').split('/');
    return new Date(`${mm}/${dd}/${yy}`);
  }

  return NaN;
};

/*  eslint-disable */
const getBrowserVersion = () => {
  // const nVer = navigator.appVersion;
  const nAgt = navigator.userAgent;
  let browserName = navigator.appName;
  let fullVersion = `${parseFloat(navigator.appVersion)}`;
  let majorVersion = parseInt(navigator.appVersion, 10);
  let nameOffset;
  let verOffset;
  let ix;

  verOffset = nAgt.indexOf('Opera');
  // In Opera, the true version is after "Opera" or after "Version"
  if (verOffset !== -1) {
    browserName = 'Opera';
    fullVersion = nAgt.substring(verOffset + 6);
    verOffset = nAgt.indexOf('Version');
    if (verOffset !== -1) { fullVersion = nAgt.substring(verOffset + 8); }
  }
  // In MSIE, the true version is after "MSIE" in userAgent
  else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
    browserName = 'Microsoft Internet Explorer';
    fullVersion = nAgt.substring(verOffset + 5);
  }
  // In Chrome, the true version is after "Chrome"
  else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
    browserName = 'Chrome';
    fullVersion = nAgt.substring(verOffset + 7);
  }
  // In Safari, the true version is after "Safari" or after "Version"
  else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
    browserName = 'Safari';
    fullVersion = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf('Version')) != -1) { fullVersion = nAgt.substring(verOffset + 8); }
  }
  // In Firefox, the true version is after "Firefox"
  else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
    browserName = 'Firefox';
    fullVersion = nAgt.substring(verOffset + 8);
  }
  // In most other browsers, "name/version" is at the end of userAgent
  else if ((nameOffset = nAgt.lastIndexOf(' ') + 1)
            < (verOffset = nAgt.lastIndexOf('/'))) {
    browserName = nAgt.substring(nameOffset, verOffset);
    fullVersion = nAgt.substring(verOffset + 1);
    if (browserName.toLowerCase() == browserName.toUpperCase()) {
      browserName = navigator.appName;
    }
  }
  // trim the fullVersion string at semicolon/space if present
  if ((ix = fullVersion.indexOf(';')) != -1) { fullVersion = fullVersion.substring(0, ix); }
  if ((ix = fullVersion.indexOf(' ')) != -1) { fullVersion = fullVersion.substring(0, ix); }

  majorVersion = parseInt(`${fullVersion}`, 10);
  if (isNaN(majorVersion)) {
    fullVersion = `${parseFloat(navigator.appVersion)}`;
    majorVersion = parseInt(navigator.appVersion, 10);
  }

  var osName="Unknown OS";
  if (navigator.appVersion.indexOf("Win")!=-1) osName="Windows";
  if (navigator.appVersion.indexOf("Mac")!=-1) osName="MacOS";
  if (navigator.appVersion.indexOf("X11")!=-1) osName="UNIX";
  if (navigator.appVersion.indexOf("Linux")!=-1) osName="Linux";

  return {
    browserName, fullVersion, majorVersion, osName,
  };
};

/* eslint-enable */
// Method to send user system details to backend
// @param { object } objectToSend: Object containing all the information to
// be send on the server side to be saved
const sendUserData = (objectToSend, token) => {
  this.token = CognitensorAsyncStorageService.getUserToken();

  const options = {
    url: `${CLIENT_USER_URL}/user/sysinfo`,
    method: 'post',
    headers: {
      'Cotent-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    },
    data: objectToSend,
  };

  Axios(options)
    .then(() => {
      console.log('response received');
    })
    .catch((err) => console.log(err));
};

// Method to be used to retreive and then store
// user information on the backend
// @param userId: id of the user which has logged in or logged out
const trackLoginInformation = (userId, token, login) => {
  const options = {
    url: 'https://api.ipify.org/?format=json',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  Axios(options)
    .then((data) => {
      const { ip } = data ? data.data : data;
      const md = new MobileDetect(window.navigator.userAgent);

      const sysInfoMoile = {
        mobile: md.mobile(),
        phone: md.phone(),
        os: md.os(),
        tablet: md.tablet(),
        userAgent: md.userAgent(),
        versionUA: md.version(md.userAgent()),
      };

      const userData = {
        ip,
        sysInfoDesktop: JSON.stringify(getBrowserVersion()),
        sysInfoMobile: JSON.stringify(sysInfoMoile),
        user_id: userId,
        login,
      };

      sendUserData(userData, token);
    })
    .catch((err) => console.log(err));
};

// Method to get the start and end date from year and quarter filter
// for sending to back end
// Takes year and quarter as parameters
const filterQY = (year, quarter) => {
  let start = '';
  let end = '';

  if (year && quarter !== 'a') {
    let smonth = quarter * 3 + 4;
    let emonth = quarter * 3 + 6;
    let edate = 31;

    let newYr = year;
    if (quarter === 3) {
      // eslint-disable-next-line no-param-reassign
      newYr += 1;
      smonth = 1;
      emonth = 3;
    }
    if (quarter === 0 || quarter === 1) {
      edate = 30;
    }

    start = smonth > 9 ? `${newYr}-${smonth}-01` : `${newYr}-0${smonth}-01`;
    end =
      emonth > 9
        ? `${newYr}-${emonth}-${edate}`
        : `${newYr}-0${emonth}-${edate}`;
  }

  if (
    year &&
    year !== 'a' &&
    ((!quarter && quarter !== 0) || quarter === 'a')
  ) {
    start = `${year}-04-01`;
    end = `${parseInt(year, 10) + 1}-03-31`;
  }

  if (year === 'a') {
    start = '';
    end = '';
  }

  return { start, end };
};

// Method to get data from local storage for the given key
const getFromLS = (key) => {
  let ls = {};

  try {
    ls = JSON.parse(global.localStorage.getItem(key)) || {};
  } catch (e) {
    console.log(e);
  }

  return ls[key];
};

// Method to be used to store data in local storage for the given key
const saveToLS = (key, value) => {
  if (global.localStorage) {
    global.localStorage.setItem(
      key,
      JSON.stringify({
        [key]: value,
      }),
    );
  }
};

export const getAppendString = (workspace, dashboard) => {
  if (workspace && dashboard) {
    return `${workspace}/${dashboard}`;
  }

  if (workspace) {
    return `${workspace}/`;
  }

  return '';
};

export default {
  sortObject,
  sortObjectArray,
  MONTHS,
  getLists,
  getTotalValues,
  labelMaker,
  numberWithCommas,
  numberWithCommasNoDec,
  getYears,
  createYearList,
  getYearsList,
  getRenderArrayGroupedBY,
  groupDataBy,
  getRenderArrayGroupedByMonth,
  getDate,
  trackLoginInformation,
  filterQY,
  getFromLS,
  saveToLS,
  getAppendString,
};
