import CognivizActionTypes from './cogniviz.types';

const INITIAL_STATE = {
  dashboardList: null,
  dashboardName: '',
  loading: false,
  dashboardConfig: null,
  serverTime: '',
  hComp: undefined,
  openTab: undefined,
  selectedTab: 0,
  lastUpdate: '',
  filterValue: [],
  filterValueNR: [],
  csvData: [],
  grid: true,
  updates: [],
  notifications: [],
  allUpdates: [],
  allNotifications: [],
  fetching: false,
  version: '',
  team: [],
  saving: false,
  fetchedUser: null,
  listDashboards: null,
  dep: null,
};

const cognivizReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CognivizActionTypes.SET_DASHBOARD_CONFIG:
      return {
        ...state,
        dashboardConfig: action.payload,
      };

    case CognivizActionTypes.DASHBOARD_LIST_SUCCESS:
      return {
        ...state,
        dashboardList: action.payload,
      };

    case CognivizActionTypes.SET_DASHBOARD_NAME:
      return {
        ...state,
        dashboardName: action.payload,
      };

    case CognivizActionTypes.USER_DASHBOARD_CONFIG_START:
      return {
        ...state,
        loading: true,
        dashboardConfig: null,
      };

    case CognivizActionTypes.USER_DASHBOARD_CONFIG_SUCCESS:
      return {
        ...state,
        loading: false,
        dashboardConfig: action.payload.dashboardConfig,
        serverTime: action.payload.serverTime,
        hComp: action.payload.hComp,
        openTab: action.payload.openTab,
        selectedTab: action.payload.selectedTab,
      };

    case CognivizActionTypes.USER_DASHBOARD_CONFIG_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case CognivizActionTypes.LAST_UPDATE_SUCCESS:
      return {
        ...state,
        lastUpdate: action.payload,
      };

    case CognivizActionTypes.SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload,
      };

    case CognivizActionTypes.SET_FILTER_VALUES:
      return {
        ...state,
        filterValue: action.payload.filterValue,
        filterValueNR: action.payload.filterValueNR,
      };

    case CognivizActionTypes.SET_GRID_LIST:
      return {
        ...state,
        grid: action.payload,
      };

    case CognivizActionTypes.START_FETCHING:
      return {
        ...state,
        fetching: true,
      };

    case CognivizActionTypes.FETCHING_FAILURE:
      return {
        ...state,
        fetching: false,
      };

    case CognivizActionTypes.UPDATES_SUCCESS:
      return {
        ...state,
        updates: action.payload,
        fetching: false,
      };

    case CognivizActionTypes.NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
        fetching: false,
      };

    case CognivizActionTypes.ALL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        allNotifications: action.payload,
        fetching: false,
      };

    case CognivizActionTypes.ALL_UPDATES_SUCCESS:
      return {
        ...state,
        allUpdates: action.payload,
        version: action.payload.find((a) => a.version).version || '',
        fetching: false,
      };

    case CognivizActionTypes.TEAM_SUCCESS:
      return {
        ...state,
        team: action.payload,
        fetching: false,
      };

    case CognivizActionTypes.START_SAVING:
      return {
        ...state,
        saving: true,
      };

    case CognivizActionTypes.STOP_SAVING:
      return {
        ...state,
        saving: false,
      };

    case CognivizActionTypes.FETCHED_USER:
      return {
        ...state,
        fetchedUser: action.payload,
        fetching: false,
      };

    case CognivizActionTypes.FETCHED_DASHBOARD_LIST:
      return {
        ...state,
        listDashboards: action.payload,
        fetching: false,
      };

    case CognivizActionTypes.SET_DEPARTMENT:
      return {
        ...state,
        dep: action.payload,
      };

    default:
      return state;
  }
};

export default cognivizReducer;
