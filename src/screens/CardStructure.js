/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import { CSVLink } from 'react-csv';
import Axios from 'axios';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Text, View } from 'react-native';

import { CLIENT_USER_URL, CLIENT_TEXT360_URL } from '../constants';
import helper from '../screens/dashboard_helper';
import { DashboardContext } from '../screens/dashboardContext';
import { ComponentModal } from '../screens/ComponentModal';
import { ErrorModal as EM } from '../screens/ErrorModal';
import CognitensorAsyncStorageService from '../services/asyncstorage/CognitensorAsyncStorageService';

// React Grid Layout component with Responsive wrapper to create a responsive
// grid.
const RGL = WidthProvider(Responsive);

// Component to render the wrapper for components in cogni viz and the
// component in the way provided in the passed configuration.
// Props:
// children: Components that are added by rgl or other parent components which
// will be renderd if only certain flags are given.
// style: Style object containing modified style by RGL. The modified style will
// always be height and width. This properties will later be used by component
// to make themselves responsive.
// componentProps: Object containing configuration to render component and other
// parts in this component, also source properties to obtain along with some
// times configuration to render another component.
// changing: Boolean flag to indicate components can send their request.
class CardStructure extends Component {
  // Context to obtain remaining parameters from
  static contextType = DashboardContext;

  // Flag to decide if rendered component should stay hidden or not
  state = { hide: false };

  // Flag to indicate call when mounting component
  componentDidMount = () => {
    this.isMountedNow = true;
    this.handleQueryProcess(1);
  };

  // Flag will be set to false so that no setState is called on unmounted component
  componentWillUnmount = () => {
    this.isMountedNow = false;
  };

  // Component will be checke if there is an updation process started
  componentDidUpdate = () => this.handleQueryProcess();

  // Method to handle query or function name provided by parent to render
  // component
  // flag: Binary to indicate run queries even if not loading. To be used for
  // component did mount.
  handleQueryProcess = (flag) => {
    const {
      dbType,
      dbConnectionString,
      dbCaching,
      pypuffFile,
      development,
    } = this.context;
    const {
      componentprops: { pypuff, newQuery },
      changing,
      filtervaluer: filterValueR,
      filtervaluenr: filterValueNR,
    } = this.props;

    this.token = CognitensorAsyncStorageService.getUserToken();

    // Options to send request for data
    const options = {
      method: 'post',
      // Check if running query or python file
      // eslint-disable-next-line prettier/prettier
      url: `${ pypuff ? CLIENT_TEXT360_URL : CLIENT_USER_URL }/cogniviz/query/execute`,
      data: {
        query: newQuery,
        dbType,
        dbConnectionString,
        dbCaching,
        pypuffFile,
        developmentFile: development,
        gammaFile: false,
        filterValue: filterValueR,
        filterValueNR,
        childObject: {},
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    };

    // If requesting or mounting send request.
    if (changing === 2 || flag === 1) {
      this.sendRequest(options);
    }
  };

  // Method to send request using options provided
  // options: Object containing request sending information.
  sendRequest = (options) => {
    if (!this.isMountedNow) {
      return;
    }

    const {
      componentprops: { pivot },
    } = this.props;

    this.setState({ loading: true });

    // Send request
    Axios(options)
      .then((data) => {
        if (!this.isMountedNow) {
          return;
        }

        const finalData = pivot
          ? helper.pivotTable(data.data.message)
          : data.data.message;
        // Save data to state
        this.setState({ renderData: finalData, error: false });
      })
      .catch((error) => {
        if (!this.isMountedNow) {
          return;
        }

        const message =
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message;

        this.setState({ renderData: undefined, error: message });
      })
      .finally(() => this.isMountedNow && this.setState({ loading: false }));
  };

  // Method to send data to prepare data to be sent for component in
  // component
  // d: component configuration
  // noRFilters: Number fo required filters
  // noNRFilters: Number of non required filters.
  // filterValue: Filter value of required filters.
  // filterValueNR: Filter value of non required filters.
  renderDashboardChild = (d, native, index, cIndex) => {
    // Obtain dashboard name and query from component configuration.
    const { query } = d;
    const {
      tabconfig: { requiredFilters = [], nonReqdFilters = [] },
      filtervaluer,
      filtervaluenr,
      tabconfig,
      selectedtab,
    } = this.props;
    const noRFilters = requiredFilters.length;
    const noNRFilters = nonReqdFilters.length;

    // Child data to be used in rendering.
    const { childObject } = this.state;
    let newQuery = query || '';

    // If user is requesting changes replace the key string from query string
    // with corresponding filter values.
    for (let i = 0; i < noRFilters; i += 1) {
      // Regex used to match respective key string for each filter
      const regExp = new RegExp(`\\$\\{${i}\\}`, 'g');
      newQuery = (newQuery || '').replace(regExp, filtervaluer[i]);
    }
    for (let i = 0; i < noNRFilters; i += 1) {
      // Regex used to match respective key string for each filter
      const regExp = new RegExp(`\\#\\{${i}\\}`, 'g');
      newQuery = (newQuery || '').replace(regExp, filtervaluenr[i]);
    }
    if (childObject && Object.keys(childObject).length > 0) {
      Object.keys(childObject).forEach((key) => {
        const regExp = new RegExp(`\\%\\{${key}\\}`, 'g');
        newQuery = (newQuery || '').replace(regExp, childObject[key] || '');
      });
    }

    const componentProps = {
      ...d,
      native,
      childObject,
      query: newQuery,
      index,
      cIndex,
    };

    // Component acting as a wrapper for child component
    return (
      <ComponentModal
        key={index}
        componentprops={componentProps}
        data-grid={{
          w: 6,
          h: 3,
          x: (index % 2) * 6,
          y: parseInt(index / 2, 10) * 3,
        }}
        tabconfig={tabconfig}
        selectedtab={selectedtab}
        filtervaluer={filtervaluer}
        filtervaluenr={filtervaluenr}
      />
    );
  };

  // Method to prepare props and structure for rendering child function's modal
  // if the flag for rendering is state. We will create a new query if we have
  // changing active. Pass other props which are not in propListCC so that
  // component can be functional.
  renderModalFunc = () => {
    // Obtain flags
    const { modalCinC, childObject } = this.state;

    // Check flags
    if (!modalCinC) {
      return null;
    }

    const {
      componentprops: {
        components,
        basicModal,
        index: cIndex,
        native,
        layoutcc,
        publish,
        cincSize,
        cincTitle,
      },
    } = this.props;

    let newCCTitle = cincTitle;
    if (childObject && Object.keys(childObject).length > 0) {
      Object.keys(childObject).forEach((key) => {
        const regExp = new RegExp(`\\%\\{${key}\\}`, 'g');
        newCCTitle = (newCCTitle || '').replace(regExp, childObject[key] || '');
      });
    }

    return components && components.length > 0 ? (
      <Modal
        open={modalCinC}
        onClose={() => this.setState({ modalCinC: false })}
        closeIcon
        size={cincSize || 'fullscreen'}
        basic={basicModal || false}>
        <Modal.Header>{newCCTitle || ''}</Modal.Header>
        <Modal.Content>
          <View className="modal-cogniviz">
            <RGL
              className="layout"
              cols={{
                lg: 12,
                md: 10,
                sm: 8,
                xs: 4,
                xxs: 2,
              }}
              layouts={layoutcc || {}}
              draggableHandle=".draggable-icon"
              measureBeforeMount
              isDraggable={!native && !publish}
              isResizable={!native && !publish}
              style={
                native ? { height: '100%', marginTop: '1rem' } : undefined
              }>
              {components.map((d, index) =>
                this.renderDashboardChild(d, native, index, cIndex),
              )}
            </RGL>
          </View>
        </Modal.Content>
      </Modal>
    ) : null;
  };

  // Method to render csv Button in case data is available, sum in simple card
  // is not null and per in circular progress bar is not null
  // Processes renderData and converts to data for downloadable csv by
  // adding data, filter values for both required and non-required
  // If no data then csv Button is not shown
  renderCsvButton = () => {
    const { renderData } = this.state;
    const {
      componentprops: {
        title,
        downloadable,
        emailConnector,
        emailFunction,
        name,
        native,
      },
      filtervaluer: filterValueR,
      filtervaluenr: filterValueNR,
      tabconfig,
    } = this.props;
    const { requiredFilters, nonReqdFilters } = tabconfig || {};

    const csvData = helper.renderCsv(
      renderData,
      requiredFilters,
      nonReqdFilters,
      filterValueR,
      filterValueNR,
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
        ) : (downloadable || emailConnector) &&
          renderData &&
          renderData.length > 0 &&
          !native ? (
          <>
            <Dropdown.Item>
              {/* Button to trigger extraction of data as csv and will only */}
              {/* be seen when data is available */}
              {downloadable && csvData && csvData.length > 0 && (
                <CSVLink
                  filename={`${title || 'file'}.csv`}
                  data={csvData}
                  rel="button"
                  className="csv-button">
                  <Text>
                    <Icon name="download" />
                  </Text>
                  <Text className="csv">Download CSV</Text>
                </CSVLink>
              )}
            </Dropdown.Item>
            {/* Button to trigger email sending */}
            {emailConnector && emailFunction && (
              <Dropdown.Item
                icon="mail"
                content="Send Email"
                onClick={() => this.triggerEmail(renderData, emailFunction)}
              />
            )}
            {/* removed dropdown to select which component to switch with */}
          </>
        ) : null}
      </>
    );
  };

  // Method to handle click inside child components. In this event the clicked
  // elements data is returned by children component. This is used for changing
  // the query as well.
  // childObject: Selected data returned by the component.
  clickHandler = (childObject) =>
    this.isMountedNow && this.setState({ childObject, modalCinC: true });

  // Method to trigger email script
  // called when send email Button clicked
  // Takes tableData as parameter
  triggerEmail = (tableData, emailFunction) => {
    const { token } = this.context;
    const options = {
      url: `${CLIENT_TEXT360_URL}/email/connector`,
      method: 'post',
      data: {
        tableData,
        emailFunction,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    };

    Axios(options)
      .then(() => {
        console.log('email trigger successful');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Method to hide or show components on icon click
  dropClick = (e) => {
    if (!this.isMountedNow) {
      return;
    }
    const { handleClick } = this.props;

    const { hide } = this.state;
    if (hide) {
      handleClick(e);
    }
    this.setState({ hide: !hide });
  };

  // Method to handle mouse enter event and store the time when the event was triggered.
  handleMouseEnter = () => {
    this.startHoverTime = new Date();
  };

  // Method to handle mouse leave event and check the duration of hover event. If the event duration
  // is acceptable send logging request.
  handleMouseLeave = () => {
    try {
      const { modalCinC } = this.state;
      const { dashboardName, development, token } = this.context;
      const {
        componentprops: { index, title },
        selectedtab: selectedTab,
      } = this.props;
      const timeNow = new Date();

      // if development mode or cinc is open we shall not save anything.
      if (development || modalCinC) {
        this.startHoverTime = null;
        return;
      }

      // Check event duration
      if (timeNow - this.startHoverTime > 3000) {
        // Start logging the event
        helper.saveComponentLog(
          dashboardName,
          index,
          selectedTab,
          'hover',
          title,
          this.startHoverTime,
          timeNow,
          null,
          token,
        );
      }
    } catch (err) {
      console.log(err);
    }

    this.startHoverTime = null;
  };

  // Method to log click event
  handleUserClickLog = () => {
    const { modalCinC } = this.state;
    const { development, dashboardName, token } = this.context;
    const {
      componentprops: { title, index },
      selectedtab: selectedTab,
    } = this.props;

    // Check if development or cinc is open
    if (development || modalCinC) {
      return;
    }

    // Log the event.
    helper.saveComponentLog(
      dashboardName,
      index,
      selectedTab,
      'click',
      title,
      new Date(),
      null,
      null,
      token,
    );
  };

  fullScreen = () => {
    const { renderData, loading, modalFS } = this.state;
    const {
      style: { width, height },
      componentprops,
      componentprops: { title, name },
    } = this.props;
    const NewComponent = helper.renderComponent(name);

    if (!modalFS) {
      return null;
    }

    return (
      <Modal
        open={modalFS}
        onClose={() => this.setState({ modalFS: false })}
        closeIcon
        size="fullscreen"
        style={{ height: '70%' }}>
        <Modal.Header style={{ background: '#F3EFFE' }}>
          {title || ''}
        </Modal.Header>
        <Modal.Content style={{ height: '100%' }}>
          <NewComponent
            width={width}
            height={height}
            loading={loading}
            data={renderData}
            clicked={this.clickHandler}
            {...componentprops}
          />
          {this.renderModalFunc()}
          {loading ? this.setState({ loading: false }) : null}
        </Modal.Content>
      </Modal>
    );
  };

  render = () => {
    const { development, native } = this.context;
    // Data to be downloaded as csv.
    const { renderData, loading, hide, error } = this.state;
    const {
      children,
      style: { width, height },
      componentprops,
      style,
      selected,
      componentprops: { title, tooltip, name, publish },
    } = this.props;
    const styleTemp = { ...style };

    // undefined so no color on card when not clickable
    const cardColor = !!(
      componentprops.components && componentprops.components.length > 0
    );
    const NewComponent = helper.renderComponent(name);

    // specifically for app purpose
    // changing the style to display correctly in app
    if (native) {
      styleTemp.position = 'relative';
      styleTemp.transform = 'translate(10px)';
      styleTemp.MozTransform = 'translate(10px)';
      styleTemp.OTransform = 'translate(10px)';
      styleTemp.WebkitTransform = 'translate(10px)';
      styleTemp.msTransform = 'translate(10px)';
      styleTemp.marginBottom = '1rem';
      if (name === 'SimpleCard') {
        styleTemp.height = 'auto';
      }
    }

    styleTemp.boxShadow = 'none';
    styleTemp.webkitboxShadow = 'none';
    styleTemp.touchAction = 'auto';

    // If component is selected for highlighting then change its z index.
    styleTemp.zIndex = selected ? 6 : 1;
    // changing the css on hide
    if (hide) {
      styleTemp.height = '50px';
    }

    // options to be supplied to the card tag
    // color depends on whether component is clickable or not
    // style contains all style properties
    // style object is modified for native prop(for app)
    const cardOptions = {
      ...this.props,
      style: styleTemp,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onClick: this.handleUserClickLog,
    };

    return (
      <Card {...cardOptions} as="View">
        {(development || name !== 'BlogCard') && (
          <Card.Content
            style={{ background: '#F3EFFE' || '#FFEFF5' }}
            className={cardColor ? 'card-content-new' : 'card-content-normal'}>
            <Card.Header
              className={cardColor ? 'card-header-new' : 'card-header-normal'}
              style={{ fontWeight: 500 }}>
              {title || 'No title'}
              <View>
                {tooltip &&
                  tooltip !== '' &&
                  (name === 'SimpleCard' || name === 'MultipleValueCard') && (
                    <Popup
                      trigger={<Icon name="info circle" />}
                      content={tooltip}
                    />
                  )}
                {development && <Icon name="move" className="draggable-icon" />}
                {development && error && <EM errors={error} />}
                {native && (
                  <Icon
                    name={!hide ? 'hide' : 'unhide'}
                    onClick={this.dropClick}
                  />
                )}
                {name !== 'SimpleCard' && !native && (
                  <>
                    {name !== 'MultipleValueCard' && name !== 'SimpleTable' ? (
                      <Icon
                        name="expand"
                        onClick={() =>
                          this.setState({ modalFS: true, loading: true })
                        }
                      />
                    ) : null}
                    <Dropdown additionPosition="top" icon="ellipsis vertical">
                      <Dropdown.Menu style={{ zIndex: 100, left: '-10vw' }}>
                        {this.renderCsvButton()}
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
              </View>
            </Card.Header>
          </Card.Content>
        )}
        <NewComponent
          width={width}
          height={height}
          loading={loading}
          data={renderData}
          clicked={this.clickHandler}
          {...componentprops}
        />
        {!native && !publish && children}
        {this.fullScreen()}
        {this.renderModalFunc()}
      </Card>
    );
  };
}

CardStructure.propTypes = {
  changing: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.any]),
  style: PropTypes.shape({ width: 0, height: 0 }),
  selected: PropTypes.bool,
  componentprops: PropTypes.shape({
    components: PropTypes.array,
    layoutcc: PropTypes.shape({}),
    pypuff: PropTypes.bool,
    title: PropTypes.string,
    tooltip: PropTypes.string,
    name: PropTypes.string,
    emailFunction: PropTypes.string,
    native: PropTypes.bool,
    publish: PropTypes.bool,
    downloadable: PropTypes.bool,
    switchComponents: PropTypes.bool,
    selectedCompo: PropTypes.string,
    emailConnector: PropTypes.bool,
    pivot: PropTypes.bool,
    basicModal: PropTypes.bool,
    cincSize: PropTypes.string,
    cincTitle: PropTypes.string,
    index: PropTypes.number,
    newQuery: PropTypes.string,
  }).isRequired,
  filtervaluenr: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  ).isRequired,
  filtervaluer: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  ).isRequired,
  tabconfig: PropTypes.shape({
    requiredFilters: PropTypes.array,
    nonReqdFilters: PropTypes.array,
  }),
  selectedtab: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
};

CardStructure.defaultProps = {
  changing: 0,
  style: {},
  children: null,
  selected: false,
  selectedtab: 0,
  tabconfig: { requiredFilters: [], nonReqdFilters: [] },
};

export default CardStructure;
