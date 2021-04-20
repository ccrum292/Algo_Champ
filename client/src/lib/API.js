import axios from "axios";

export default {
  Users: {
    login: function (email, password) {
      return axios.post("/api/users/login", { email, password });
    },

    create: function (name, email, password) {
      return axios.post("/api/users", { name, email, password });
    },

    getMe: function (authToken) {
      return axios.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }
  },

  Answers: {
    addAnswer: function(authToken, codeMirrorValue, userId, problemId, classId) {
      return axios.post("/api/answers", {
        codeText: codeMirrorValue,
        UserId: userId,
        ProblemId: problemId,
        classId: classId
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
    },

    getTenCorrectAnswers: function(authToken, problemId) {
      return axios.get("/api/answers/" + problemId, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
    },

    getMyAnswers: function(authToken, classId) {
      return axios.get(`/api/answers/all/${classId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
    }
  },

  Classes: {
    getUserClasses: function(authToken) {
      return axios.get("/api/classes", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
    },

    getAllUsersForClass: function(authToken, classId) {
      return axios.get("/api/classes/" + classId, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
    },

    removeStudentFromClass: function(authToken, classId, studentId) {
      return axios.delete(`/api/classes/${classId}/${studentId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
    },

    createClass: function(authToken, name, description, useTrilogyDefault) {
      return axios.post("/api/classes", {
        name,
        description,
        useTrilogyDefault
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
    },
  },

  JoinRequests: {
    userRequestJoin: function(authToken, nameOfClass) {
      return axios.post("/api/joinrequests",{
        name: nameOfClass
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
    },

    getJoinRequestsForAdmin: function(authToken, classId) {
      return axios.get("/api/joinrequests/" + classId, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
    },

    adminAcceptJoinRequest: function(authToken, classId, studentUserId, joinRequestId) {
      return axios.post("/api/joinrequests/accept/" + classId, {
        studentUserId: studentUserId,
        joinRequestId: joinRequestId
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
    },

    adminDeclineJoinRequest: function(authToken, classId, joinRequestId) {
      return axios.post("/api/joinrequests/decline/" + classId, {
        joinRequestId: joinRequestId
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
    }
  },
  
  Problems: {
    createProblem: function(authToken, classId, title, description, 
      startingCode, difficulty, displayExampleArr, testDataArr, classProblemObj) {
      return axios.post("/api/problems", {
        classId,
        title,
        description,
        startingCode,
        difficulty,
        displayExampleArr,
        testDataArr,
        classProblemObj
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
    },

    getProblemsForClass: function(authToken, classId) {
      return axios.get("/api/problems/" + classId, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
    },

    getProblemsForClassDashboard: function(authToken, classId) {
      return axios.get("/api/problems/dashboard/" + classId, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
    },

    updateProblem: function(authToken, classId, problemId, title, description, 
      startingCode, difficulty, displayExampleArr, exampleId, newInputOutputArr, deleteInputOutputArrOfIds, classProblemObj) {
      return axios.put("/api/problems", {
        classId,
        problemId,
        title,
        description,
        startingCode,
        difficulty,
        displayExampleArr,
        exampleId,
        newInputOutputArr,
        deleteInputOutputArrOfIds,
        classProblemObj
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
    },

    deleteProblemFromClass: function(authToken, classId, problemId) {
      return axios.delete(`/api/problems/${classId}/${problemId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
    },

    getSingleProblem: function(authToken, classId, problemId) {
      return axios.get(`/api/problems/${classId}/${problemId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
    }

  }
};