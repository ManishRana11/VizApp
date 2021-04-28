export const apkStateReducer = (state, action) => {
  switch (action.type) {
    case 'API_FETCH_DATA_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'API_FETCH_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        dashboardConfig: action.payload.dashboard_config,
        dbConnectionString: action.payload.dbConnectionString,
        dbType: action.payload.dbType,
        dashboardTitle: action.payload.dashboard_config.dashboardTitle,
        dashboardType: action.payload.dashboard_config.dashboardType,
        dbCaching: action.payload.dashboard_config.dbCaching,
        dbName: action.payload.dashboard_config.dbName,
        deactivateFilter: action.payload.dashboard_config.deactivateFilter,
        deactivated: action.payload.dashboard_config.deactivated,
        deactiveDuration: action.payload.dashboard_config.deactiveDuration,
        deactiveTime: action.payload.dashboard_config.deactiveTime,
        feedbackEmails: action.payload.dashboard_config.feedbackEmails,
        filterPosition: action.payload.dashboard_config.filterPosition,
        noTabs: action.payload.dashboard_config.noTabs,
        pypuffFile: action.payload.dashboard_config.pypuffFile,
      };
    case 'API_FETCH_DATA_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};
