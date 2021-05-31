export const executeReducer = (state, action) => {
  switch (action.type) {
    case 'EXECUTE_FETCH INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'EXECUTE_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        execute: action.payload,
      };
    case 'EXECUTE_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
  }
};
