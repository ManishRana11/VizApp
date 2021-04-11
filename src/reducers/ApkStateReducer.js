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
