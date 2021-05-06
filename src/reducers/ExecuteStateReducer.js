export const executeStateReducer = (state, action) => {
  switch (action.type) {
    case 'API_FETCH_EXECUTE_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'API_FETCH_EXECUTE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'API_FETCH_EXECUTE_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};
