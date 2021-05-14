/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import { CSVLink } from 'react-csv';
import PropTypes from 'prop-types';
import Axios from 'axios';

import { DashboardContext } from '../screens/dashboardContext';
import { ErrorModal as EM } from '../screens/ErrorModal';
import { CLIENT_USER_URL, CLIENT_TEXT360_URL } from '../constants';
import helper from '../screens/dashboard_helper';
import CognitensorAsyncStorageService from '../services/asyncstorage/CognitensorAsyncStorageService';

// Class to render component in component for cogniviz
// If it can be reworked please do as it is almost similar to CardStructure
// Props:
// query: String containing function name or query to be used to render this
// component.
// childObectj: Object given by parent using whose attributes query is to be
// changed or passed to function call in pypuff.
// style: Style properties for rendering component.
// componentProps: Props to pass to component for customization.
// filterValue: Filter value of required filters.
// filterValueNR: Filter value of non required filters.
class ComponentModal extends Component {
  state = {};

  // Send rendering request when mounting component
  componentDidMount = () => this.handleQueryProcess();

  // Method to handle query processing for rendering compoent
  // It will either run the query or call pypuff function
  handleQueryProcess = () => {
    // Get all the props to pass for sending request
    const {
      dbType,
      dbConnectionString,
      dbCaching,
      pypuffFile,
      development,
    } = this.context;
    // Obatain query and filter values from props
    const {
      componentprops: { pypuff, query, childObject },
      filtervaluenr: filterValueNR,
      filtervaluer: filterValue,
    } = this.props;

    this.token = CognitensorAsyncStorageService.getUserToken();

    // Create request object
    const options = {
      method: 'post',
      url: `${
        pypuff ? CLIENT_TEXT360_URL : CLIENT_USER_URL
      }/cogniviz/query/execute`,
      data: {
        query,
        dbType,
        dbConnectionString,
        dbCaching,
        pypuffFile,
        developmentFile: development,
        gammaFile: false,
        filterValue,
        filterValueNR,
        childObject,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    };

    // Send request
    this.sendRequest(options);
  };

  // Method to send request using options provided
  // options: Object containing request sending information.
  sendRequest = (options) => {
    const {
      componentprops: { pivot },
    } = this.props;
    this.setState({ loading: true });

    Axios(options)
      .then((data) => {
        const finalData = pivot
          ? helper.pivotTable(data.data.message)
          : data.data.message;
        // Store response in render data
        this.setState({ renderData: finalData });
      })
      .catch((error) => {
        const message =
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message;
        this.setState({ renderData: undefined, error: message });
      })
      .finally(() => this.setState({ loading: false }));
  };

  // Method to render csv button in case data is available, sum in simple card
  // is not null and per in circular progress bar is not null
  // Processes renderData and converts to data for downloadable csv by
  // adding data, filters both required and non-required
  // If no data then csv button is not shown
  renderCsvButton = () => {
    const { renderData } = this.state;
    const {
      componentprops: { title, name, downloadable, native },
      tabconfig: { requiredFilters, nonReqdFilters },
      filtervaluer,
      filtervaluenr,
    } = this.props;

    const csvData = helper.renderCsv(
      renderData,
      requiredFilters,
      nonReqdFilters,
      filtervaluer,
      filtervaluenr,
      downloadable,
    );

    return (
      <>
        {name === 'SimpleCard' &&
        renderData &&
        renderData.length > 0 &&
        renderData[0].sum === null ? (
          <></>
        ) : name === 'SingleCircularProgress' &&
          renderData &&
          renderData.length > 0 &&
          renderData[0].per === null ? (
          <></>
        ) : downloadable && renderData && renderData.length > 0 && native ? (
          <Card.Content style={{ padding: '0em' }}>
            <Card.Description>
              {/* button to trigger extraction of data as csv and will only */}
              {/* be seen when data is available */}
              {downloadable && csvData && csvData.length > 0 && (
                <CSVLink
                  filename={`${title || 'file'}.csv`}
                  data={csvData}
                  rel="button"
                  className="ui basic blue button csv-button">
                  <Text style={{ color: '#2195d0' }}>
                    <Icon name="download" />
                  </Text>
                  <Text className="csv">Download CSV</Text>
                </CSVLink>
              )}
            </Card.Description>
          </Card.Content>
        ) : (
          <></>
        )}
      </>
    );
  };

  // Method to handle mouse enter event and store the event start time.
  handleMouseEnter = () => {
    this.startHoverTime = new Date();
  };

  // Method to handle mouse leave event and log it. We check the duration of evet and
  // if acceptable we log the event.
  handleMouseLeave = () => {
    try {
      const { dashboardName, development, token } = this.context;
      const {
        componentprops: { index, title, cIndex },
        selectedtab: selectedTab,
      } = this.props;
      const timeNow = new Date();

      // Check if development
      if (development) {
        return;
      }

      // Check event duration
      if (timeNow - this.startHoverTime > 3000) {
        // Log the event.
        helper.saveComponentLog(
          dashboardName,
          cIndex,
          selectedTab,
          'hover',
          title,
          this.startHoverTime,
          timeNow,
          index,
          token,
        );
      }
    } catch (err) {
      console.log(err);
    }

    this.startHoverTime = null;
  };

  // Method to handle click event and log it.
  handleUserClickLog = () => {
    const { development, dashboardName, token } = this.context;
    const {
      componentprops: { title, index, cIndex },
      selectedtab,
    } = this.props;

    // Check if development
    if (development) {
      return;
    }

    // Log the event.
    helper.saveComponentLog(
      dashboardName,
      cIndex,
      selectedtab,
      'click',
      title,
      new Date(),
      null,
      index,
      token,
    );
  };

  static contextType = DashboardContext;

  render = () => {
    const {
      style,
      componentprops,
      componentprops: { title, tooltip, native },
    } = this.props;
    const { renderData, loading, error } = this.state;
    const { development } = this.context;
    const NewComponent = helper.renderComponent(componentprops.name);
    const styleTemp = { ...style };

    // specifically for app purpose
    // changing the style to display correctly in app for component in component
    if (native) {
      styleTemp.position = 'relative';
      styleTemp.transform = 'translate(10px)';
      styleTemp.MozTransform = 'translate(10px)';
      styleTemp.OTransform = 'translate(10px)';
      styleTemp.WebkitTransform = 'translate(10px)';
      styleTemp.msTransform = 'translate(10px)';
      styleTemp.marginBottom = '1rem';
    }

    return (
      <Card
        {...this.props}
        className="card-structure"
        style={styleTemp}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleUserClickLog}
        as="View">
        {title && (
          <Card.Content className="card-content-normal">
            <Card.Header className="card-header-normal">
              {title}
              <View>
                {tooltip && tooltip !== '' && (
                  <Popup
                    trigger={
                      <Icon
                        name="question circle outline"
                        style={{ color: 'white' }}
                      />
                    }
                    content={tooltip}
                  />
                )}
              </View>
              {development && error && <EM errors={error} />}
            </Card.Header>
          </Card.Content>
        )}
        <NewComponent {...componentprops} data={renderData} loading={loading} />
        {this.renderCsvButton()}
      </Card>
    );
  };
}

ComponentModal.propTypes = {
  componentprops: PropTypes.shape({
    title: PropTypes.string,
    tooltip: PropTypes.string,
    name: PropTypes.string,
    downloadable: PropTypes.bool,
    pypuff: PropTypes.bool,
    pivot: PropTypes.bool,
    query: PropTypes.string,
    native: PropTypes.bool.isRequired,
    childObject: PropTypes.shape({}),
    index: PropTypes.number,
    cIndex: PropTypes.number,
  }).isRequired,
  style: PropTypes.shape({}),
  filtervaluenr: PropTypes.arrayOf(PropTypes.string).isRequired,
  filtervaluer: PropTypes.arrayOf(PropTypes.string).isRequired,
  tabconfig: PropTypes.shape({
    requiredFilters: PropTypes.array,
    nonReqdFilters: PropTypes.array,
  }).isRequired,
  selectedtab: PropTypes.number,
};

ComponentModal.defaultProps = {
  style: {},
  selectedtab: 0,
};

export default ComponentModal;
