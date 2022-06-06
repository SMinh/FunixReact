import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));

  return fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)))
    .catch((error) => dispatch(staffsFailed(error.message)));
};

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});

export const fetchDepts = () => (dispatch) => {
  dispatch(deptsLoading(true));

  return fetch(baseUrl + "departments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((depts) => dispatch(addDepts(depts)))
    .catch((error) => dispatch(deptsFailed(error.message)));
};

export const deptsLoading = () => ({
  type: ActionTypes.DEPTS_LOADING,
});

export const deptsFailed = (errmess) => ({
  type: ActionTypes.DEPTS_FAILED,
  payload: errmess,
});

export const addDepts = (depts) => ({
  type: ActionTypes.ADD_DEPTS,
  payload: depts,
});

export const fetchSalary = () => (dispatch) => {
  dispatch(salaryLoading(true));

  return fetch(baseUrl + "staffsSalary")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((salary) => dispatch(addSalary(salary)))
    .catch((error) => dispatch(salaryFailed(error.message)));
};

export const salaryLoading = () => ({
  type: ActionTypes.SALARY_LOADING,
});

export const salaryFailed = (errmess) => ({
  type: ActionTypes.SALARY_FAILED,
  payload: errmess,
});

export const addSalary = (salary) => ({
  type: ActionTypes.ADD_SALARY,
  payload: salary,
});

export const addStaff = (staff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: staff,
});

export const postStaff =
  (
    id,
    name,
    doB,
    startDate,
    departmentId,
    salaryScale,
    annualLeave,
    overTime
  ) =>
  (dispatch) => {
    const newStaff = {
      id: id,
      name: name,
      doB: doB,
      startDate: startDate,
      departmentId: departmentId,
      salaryScale: salaryScale,
      annualLeave: annualLeave,
      overTime: overTime,
    };
    newStaff.image = "/assets/images/alberto.png";
    newStaff.salary =
      parseInt(newStaff.salaryScale, 10) * 3000000 +
      parseInt(newStaff.overTime, 10) * 200000;

    return fetch(baseUrl + "staffs", {
      method: "POST",
      body: JSON.stringify(newStaff),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          console.log("postStaff: newStaff", response.ok);

          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => response.json())
      .then((response) => {
        dispatch(addStaff(response));
      })
      .catch((error) => {
        alert("Your staff could not be posted\nError: " + error.message);
      });
  };

export const deleteStaff = (id) => ({
  type: ActionTypes.DELETE_STAFF,
  payload: id,
});

export const postDeleteStaff = (id) => (dispatch) => {
  return fetch(baseUrl + `staffs/${id}`, {
    method: "DELETE",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      dispatch(deleteStaff(response));
    })
    .catch((error) => {
      alert("Your staff could not be posted\nError: " + error.message);
    });
};

export const updateStaff = (staff) => ({
  type: ActionTypes.UPDATE_STAFF,
  payload: staff,
});

export const postUpdateStaff = (staff) => (dispatch) => {
  return fetch(baseUrl + `staffs`, {
    method: "PATCH",
    body: JSON.stringify(staff),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        console.log("postStaff: newStaff", response.ok);

        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      dispatch(updateStaff(response));
    })
    .catch((error) => {
      alert("Your staff could not be posted\nError: " + error.message);
    });
};
