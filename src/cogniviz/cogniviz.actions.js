import axios from 'axios';
import { toast } from 'react-toastify';
import CognivizActionTypes from './cogniviz.types';
import CLIENT_USER_URL from '../constants';

export const setDashboardConfig = (config) => (dispatch) =>
  dispatch({
    type: CognivizActionTypes.SET_DASHBOARD_CONFIG,
    payload: config,
  });

export const getDashboardList = (mounted) => async (dispatch) => {
  const option = {
    url: `${CLIENT_USER_URL}/cogniviz/dashboard/titles`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.authToken}`,
    },
  };

  if (!mounted) {
    return;
  }

  axios(option)
    .then(
      (d) =>
        mounted &&
        dispatch({
          type: CognivizActionTypes.DASHBOARD_LIST_SUCCESS,
          payload: d.data.message,
        }),
    )
    .catch((error) => console.log(error));
};

export const setDashboardName = (name) => async (dispatch) => {
  dispatch({
    type: CognivizActionTypes.SET_DASHBOARD_NAME,
    payload: name,
  });
};

// Method to request dashboard configuration
// dashboardName: Identifier of dashboard to be requested
export const getUserDashboardConfig = (dashboardName, search, token) => async (
  dispatch,
) => {
  // Options to send request
  const options = {
    url: `${CLIENT_USER_URL}/cogniviz/get/dashboardconfig/${dashboardName}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.authToken || token}`,
    },
  };

  dispatch({ type: CognivizActionTypes.USER_DASHBOARD_CONFIG_START });

  // Sending request
  axios(options)
    .then((data) => {
      const newdata = data.data.message;
      const {
        dashboard_config: dc,
        dbType,
        dbConnectionString,
        serverTime,
      } = newdata;
      let hComp;
      let openTab;
      let selectedTab;

      try {
        const query = new URLSearchParams(search || '');

        openTab = parseInt(query.get('openTab'), 10);
        hComp = parseInt(query.get('highComp'), 10);

        if (!Number.isNaN(openTab)) {
          selectedTab = parseInt(openTab, 10);
        }
      } catch {
        console.log('some error occurred');
      }

      // Store obtained data in state. To be used later and stop loading indicator
      dispatch({
        type: CognivizActionTypes.USER_DASHBOARD_CONFIG_SUCCESS,
        payload: {
          dashboardConfig: {
            ...dc,
            dbType,
            dbConnectionString,
          },
          serverTime,
          // Check if numbers are valid and are converted properly.
          hComp: Number.isNaN(hComp) ? undefined : hComp,
          openTab: Number.isNaN(openTab) ? undefined : openTab,
          selectedTab,
        },
      });
    })
    .catch((error) => {
      // Processing error
      dispatch({
        type: CognivizActionTypes.USER_DASHBOARD_CONFIG_FAILURE,
      });
      console.log(error);
    });
};

export const getLastUpdate = (dashboardName, token) => async (dispatch) => {
  const options = {
    url: `${CLIENT_USER_URL}/cogniviz/last/update/${dashboardName}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.authToken || token}`,
    },
  };

  // Sending request
  axios(options)
    .then((data) =>
      dispatch({
        type: CognivizActionTypes.LAST_UPDATE_SUCCESS,
        payload: data.data.message.last_update,
      }),
    )
    .catch((error) => console.log(error));
};

export const setSelectedTab = (value) => async (dispatch) => {
  dispatch({
    type: CognivizActionTypes.SET_SELECTED_TAB,
    payload: value,
  });
};

export const generateFilterValues = (filterValue, filterValueNR) => async (
  dispatch,
) => {
  dispatch({
    type: CognivizActionTypes.SET_FILTER_VALUES,
    payload: {
      filterValue,
      filterValueNR,
    },
  });
};

export const setGridList = (val) => async (dispatch) => {
  dispatch({
    type: CognivizActionTypes.SET_GRID_LIST,
    payload: val,
  });
};

export const getUpdates = (dashboardName, token) => async (dispatch) => {
  const option = {
    url: `${CLIENT_USER_URL}/cogniviz/fetch/dashboard/updates/${dashboardName}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.authToken || token}`,
    },
  };

  dispatch({ type: CognivizActionTypes.START_FETCHING });

  axios(option)
    .then((d) =>
      dispatch({
        type: CognivizActionTypes.UPDATES_SUCCESS,
        payload: d.data.message,
      }),
    )
    .catch(() =>
      dispatch({
        type: CognivizActionTypes.FETCHING_FAILURE,
      }),
    );
};

export const getNotifications = (dashboardName, token) => async (dispatch) => {
  const option = {
    url: `${CLIENT_USER_URL}/cogniviz/fetch/dashboard/notifications/${dashboardName}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.authToken || token}`,
    },
  };

  dispatch({ type: CognivizActionTypes.START_FETCHING });

  axios(option)
    .then((d) =>
      dispatch({
        type: CognivizActionTypes.NOTIFICATIONS_SUCCESS,
        payload: d.data.message,
      }),
    )
    .catch(() =>
      dispatch({
        type: CognivizActionTypes.FETCHING_FAILURE,
      }),
    );
};

export const getAllUpdates = () => async (dispatch) => {
  const option = {
    url: `${CLIENT_USER_URL}/cogniviz/fetch/updates`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.authToken}`,
    },
  };

  dispatch({ type: CognivizActionTypes.START_FETCHING });

  axios(option)
    .then((d) =>
      dispatch({
        type: CognivizActionTypes.ALL_UPDATES_SUCCESS,
        payload: d.data.message,
      }),
    )
    .catch(() =>
      dispatch({
        type: CognivizActionTypes.FETCHING_FAILURE,
      }),
    );
};

export const getAllNotifications = (email) => async (dispatch) => {
  const options = {
    url: `${CLIENT_USER_URL}/notify/table/notifications/get?sent_to=${email}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.authToken}`,
    },
  };

  dispatch({ type: CognivizActionTypes.START_FETCHING });

  axios(options)
    .then((d) =>
      dispatch({
        type: CognivizActionTypes.ALL_NOTIFICATIONS_SUCCESS,
        payload: d.data.message,
      }),
    )
    .catch(() =>
      dispatch({
        type: CognivizActionTypes.FETCHING_FAILURE,
      }),
    );
};

export const fetchTeam = () => async (dispatch) => {
  const options = {
    url: `${CLIENT_USER_URL}/org/admin/org/users`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.authToken}`,
    },
  };

  dispatch({ type: CognivizActionTypes.START_FETCHING });

  axios(options)
    .then((d) =>
      dispatch({
        type: CognivizActionTypes.TEAM_SUCCESS,
        payload: d.data.message,
      }),
    )
    .catch(() =>
      dispatch({
        type: CognivizActionTypes.FETCHING_FAILURE,
      }),
    );
};

export const saveUserRole = (id, roles, isActivated) => async (dispatch) => {
  const options = {
    url: `${CLIENT_USER_URL}/org/admin/user/short/${id}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.authToken}`,
    },
    data: {
      roles,
      isActivated,
    },
  };

  dispatch({ type: CognivizActionTypes.START_SAVING });

  axios(options)
    .then(() => {
      toast.success('User details updated!');
      dispatch({
        type: CognivizActionTypes.STOP_SAVING,
      });
    })
    .catch(() => {
      toast.error('Could not update user!');
      dispatch({
        type: CognivizActionTypes.STOP_SAVING,
      });
    });
};

export const fetchUser = (id) => async (dispatch) => {
  const options = {
    url: `${CLIENT_USER_URL}/org/admin/user/${id}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.authToken}`,
    },
  };

  dispatch({ type: CognivizActionTypes.START_FETCHING });

  axios(options)
    .then((data) => {
      dispatch({
        type: CognivizActionTypes.FETCHED_USER,
        payload: data.data.message,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: CognivizActionTypes.FETCHING_FAILURE,
      });
    });
};

export const saveEditedUser = (
  id,
  variables,
  dashboardList,
  saleVertical,
  dashboardPermissions,
  roles,
) => async (dispatch) => {
  const { localEmail, isActivated, department } = variables;

  const options = {
    url: `${CLIENT_USER_URL}/org/admin/user/${id}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.authToken}`,
    },
    data: {
      localEmail,
      isActivated,
      roles,
      dashboardList,
      saleVertical,
      dashboardPermissions,
      department,
    },
  };

  dispatch({ type: CognivizActionTypes.START_FETCHING });

  axios(options)
    .then(() => {
      toast.success('User details updated!');
      dispatch({
        type: CognivizActionTypes.FETCHING_FAILURE,
      });
    })
    .catch((err) => {
      console.log(err);
      toast.error('Could not update user!');
      dispatch({
        type: CognivizActionTypes.FETCHING_FAILURE,
      });
    });
};

export const addUser = (
  variables,
  dashboardList,
  saleVertical,
  roles,
) => async (dispatch) => {
  const {
    localEmail,
    department,
    password,
    ai,
    firstName,
    lastName,
  } = variables;

  const options = {
    url: `${CLIENT_USER_URL}/org/admin/adduser`,
    method: 'post',
    data: {
      email: localEmail,
      password,
      roles: roles || 'consumer',
      department,
      username: `${firstName} ${lastName}`,
      dashboardList,
      saleVertical,
      dashboardPermission: ai
        ? { ai: { uscs: true, uscscc: true } }
        : { ai: false },
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.authToken}`,
    },
  };

  dispatch({ type: CognivizActionTypes.START_FETCHING });

  axios(options)
    .then(() => {
      toast.success('User successfully created');
      dispatch({
        type: CognivizActionTypes.FETCHING_FAILURE,
      });
    })
    .catch((err) => {
      console.log(err);
      toast.error('Error in creating user!');
      dispatch({
        type: CognivizActionTypes.FETCHING_FAILURE,
      });
    });
};

export const fetchDashboardList = (org) => async (dispatch) => {
  const options = {
    url: `${CLIENT_USER_URL}/org/org/dashboards/${org}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.authToken}`,
    },
  };

  dispatch({ type: CognivizActionTypes.START_FETCHING });

  axios(options)
    .then((data) => {
      dispatch({
        type: CognivizActionTypes.FETCHED_DASHBOARD_LIST,
        payload: data.data.dashboards.dashboard_list,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: CognivizActionTypes.FETCHING_FAILURE,
      });
    });
};

export const setDepartment = (dep) => async (dispatch) => {
  dispatch({
    type: CognivizActionTypes.SET_DEPARTMENT,
    payload: dep,
  });
};

export const setTeam = (team) => async (dispatch) => {
  dispatch({
    type: CognivizActionTypes.TEAM_SUCCESS,
    payload: team,
  });
};
