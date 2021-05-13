import Axios from 'axios';

import _ from '../../_helpers';
import * as comps from './components';
import urls from '../../urls';

const compareValues = (value1, value2, operator) => {
  if (operator === '>') {
    return value1 > value2;
  }

  return false;
};

const matchCriteria = (criteria, datapoint) => {
  let flag = true;

  criteria.forEach((d) => {
    if (!flag) return;

    const value = datapoint[d.columnName];
    if (!value) {
      flag = false;
      return;
    }

    if (compareValues(value, d.compareTo, d.operator)) {
      flag = true;
    } else {
      flag = false;
    }
  });

  return flag;
};

const methodCollection = {
  parseInt: (value) => parseInt(value, 10),

  capitalize: (str) => str.toLocaleUpperCase(),

  lowercase: (str) => str.toLocaleLowerCase(),

  removeUnderscoreCapitals: (str) =>
    !str ? str : str.replace(/_/g, ' ').toLocaleUpperCase(),

  getFinQuarter: (date) => {
    const month = date.getMonth();
    const quarter = Math.floor(month / 3);

    return quarter === 0 ? 3 : quarter - 1;
  },

  getFinYear: (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const quarter = Math.floor(month / 3);

    return quarter === 0 ? year - 1 : year;
  },

  extractUniqueYear: (name, data) => {
    const lists = {};

    data.forEach((d) => {
      const dateStamp = d[name];
      let year = null;

      if (dateStamp) {
        year = new Date(dateStamp).getFullYear().toString();
      }

      if (year && !lists[year]) {
        lists[year] = true;
      }
    });

    const b = Object.keys(lists)
      .sort()
      .map((k) => ({ text: k, value: k, key: k }));

    return b;
  },

  getDateString: (date) => new Date(date).toLocaleDateString(),

  renderComponent: (componentName) => comps[componentName] || comps.NoComponent,

  numberWithCommas: (value) => _.numberWithCommas(value),

  labelMaker: (value) => _.labelMaker(value),

  extractYear: (data) => new Date(data).getFullYear().toString(),

  sum: (operation, data, filterValues) => {
    const { columnName, criteria, comparePreprocessing, filters } = operation;

    if (!data || !columnName || !filterValues || !filters || !filters[0])
      return 0;

    let sumValue = 0;

    data.forEach((d) => {
      const value = parseFloat(d[columnName]);
      if (!value || !matchCriteria(criteria, d)) return;

      const filterValue = methodCollection[comparePreprocessing](
        d[filters[0].columnName],
      );

      if (filterValue === filterValues[0]) {
        sumValue += value;
      }
    });

    return _.numberWithCommas(sumValue);
  },

  groupTo2GetTop10First: (operation, data, filterValues) => {
    const {
      columnName,
      criteria,
      comparePreprocessing,
      groupColumn,
      filters,
      tickConversion,
    } = operation;

    if (
      !data ||
      !columnName ||
      filterValues.length < 2 ||
      !filterValues[0] ||
      !filterValues[1] ||
      !filters
    ) {
      return { groupOne: [], groupTwo: [] };
    }

    const groupOne = {};
    const groupTwo = {};

    data.forEach((d) => {
      const groupValue = d[groupColumn];
      const value = parseFloat(d[columnName]);

      if (!value || !groupValue || !matchCriteria(criteria, d)) return;

      const filterValueOne = methodCollection[comparePreprocessing](
        d[filters[0].columnName],
      );
      const filterValueTwo = methodCollection[comparePreprocessing](
        d[filters[1].columnName],
      );

      if (filterValueOne === filterValues[0]) {
        if (!groupOne[groupValue]) {
          groupOne[groupValue] = value;
        } else {
          groupOne[groupValue] += value;
        }
      } else if (filterValueTwo === filterValues[1]) {
        if (!groupTwo[groupValue]) {
          groupTwo[groupValue] = value;
        } else {
          groupTwo[groupValue] += value;
        }
      }
    });

    const renderArrayOne = [];
    const renderArrayTwo = [];

    Object.keys(groupOne)
      .sort((a, b) => groupOne[a] - groupOne[b])
      .slice(0, 10)
      .forEach((key) => {
        const x = methodCollection[tickConversion](key);
        renderArrayOne.push({ x, y: groupOne[key], legend: filterValues[0] });

        if (groupTwo[key]) {
          renderArrayTwo.push({ x, y: groupTwo[key], legend: filterValues[1] });
        } else {
          renderArrayTwo.push({ x, y: 0, legend: filterValues[1] });
        }
      });

    return { groupOne: renderArrayOne, groupTwo: renderArrayTwo };
  },

  createTableSalesKaram: (operation, data, filterValues) => {
    const { query, headers, filters, comparePreprocessing } = operation;

    if (!data || filterValues.length < 1 || !filterValues[0] || !filters) {
      return {
        headers,
        value: 0,
        query,
        clientName: '',
        year: 0,
      };
    }

    let total = 0;
    let clientName = '';

    data.forEach((d) => {
      const value = d.sales_amount;
      const { name } = d;
      if (!value && value > 0) return;

      const filterValueOne = methodCollection[comparePreprocessing](
        d[filters[0].columnName],
      );

      if (filterValueOne !== filterValues[0]) return;

      total += value;
      clientName = name;
    });

    return {
      headers,
      value: total,
      query,
      clientName: methodCollection.removeUnderscoreCapitals(clientName),
      year: filterValues[0],
    };
  },

  getTime: (date) => new Date(date).getTime(),

  getDate: (date) => new Date(date),

  // Function to pivot table at the second column in the given data
  // data is the array of data to be pivot
  pivotTable: (data) => {
    // Obtain first three columns. First is x, second to pivot and third to be
    // for y axis.
    const [root, name, value] = Object.keys(data[0]);
    // New data which will be generated after pivot.
    const newData = [];
    // Unique headers obtained from pivoting will be stored here
    const headersSet = new Set();

    // Obtain those unique headers
    data.forEach((d) => headersSet.add(d[name]));

    // Get array from set
    const headers = Array.from(headersSet);

    // Loop over each data to aggregate all data on the root column
    data.forEach((d) => {
      // Obtain the same row if it exists using root column value
      const old = newData.find((fi) => fi[root] === d[root].toString());

      if (old) {
        // If value exists add the new value obtained for its name column's
        // value.
        old[d[name]] = d[value];
      } else {
        // If it doesn't contain add new row. Assign it the root value.
        const newObject = { [root]: (d[root] || '').toString() };
        // Populate it with 0 for now and add values as we pares the dataset
        // eslint-disable-next-line no-return-assign
        headers.forEach((key) => (newObject[key] = 0));

        // Add the value for current name value
        newObject[d[name]] = d[value];

        // Push this new object.
        newData.push(newObject);
      }
    });

    return newData;
  },

  // Function to save logs of various events for compoents and cinc in given dashboard.
  // Parameters;
  // dashboardName: Name of dashboard to which contains the component.
  // index: Index of the component.
  // event: Event which is to be logged.
  // title: Title of component or cinc whichever triggered.
  // startTime: Start time for event.
  // endTime: End Time for event.
  // cincId: Index of cinc.
  saveComponentLog: (
    dashboardName,
    index,
    tabIndex,
    event,
    title,
    startTime,
    endTime,
    cincId,
    token,
  ) => {
    const options = {
      method: 'post',
      // Check if running query or python file
      url: `${urls.CLIENT_USER_URL}/cogniviz/save/log`,
      data: {
        dashboardName,
        componentId: index,
        tabIndex,
        event,
        title,
        startTime,
        endTime,
        cincId,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || window.localStorage.authToken}`,
      },
    };

    // Send request
    Axios(options)
      .then(() => console.log('done'))
      .catch((err) => console.log(err));
  },

  saveFilterLog: (
    dashboardName,
    index,
    tabIndex,
    event,
    title,
    startTime,
    endTime,
    cincId,
    token,
  ) => {
    const options = {
      method: 'post',
      // Check if running query or python file
      url: `${urls.CLIENT_USER_URL}/cogniviz/save/log`,
      data: {
        dashboardName,
        filterId: index,
        tabIndex,
        event,
        title,
        startTime,
        endTime,
        cincId,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || window.localStorage.authToken}`,
      },
    };

    // Send request
    Axios(options)
      .then(() => console.log('done'))
      .catch((err) => console.log(err));
  },

  renderCsv: (
    renderData,
    requiredFilters,
    nonReqdFilters,
    filterValue,
    filterValueNR,
    downloadable,
  ) => {
    let csvData = [];
    const reqdFilters = [];
    const nreqdFilters = [];

    if (requiredFilters) {
      requiredFilters.forEach((r, i) => {
        if (filterValue[i]) {
          reqdFilters.push(`${r.name}: ${filterValue[i]}`);
        }
      });
    }

    if (nonReqdFilters) {
      nonReqdFilters.forEach((n, i) => {
        if (filterValueNR[i]) {
          nreqdFilters.push(`${n.name}: ${filterValueNR[i]}`);
        }
      });
    }

    // Added length check of render data to reduce number of exceptions.
    if (renderData && downloadable && renderData.length > 0) {
      try {
        // Format the CardStructure for it to be downloaded
        // csv headers
        const headers = Object.keys(renderData[0]);

        // converting object array to 2d array
        csvData = [['Filters']].concat(
          [[reqdFilters]],
          [[nreqdFilters]],
          [['']],
          [['Data']],
          [headers],
          renderData.map((d) => headers.map((key) => d[key])),
        );
        return csvData;
      } catch (exception) {
        console.log(exception);
        console.log('error in generating to csv format');
      }
    }
    return csvData;
  },
};

export default methodCollection;
