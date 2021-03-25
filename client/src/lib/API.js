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
    addAnswer: function(authToken, codeMirrorValue, userId, problemId) {
      return axios.post("/api/answers", {
        codeText: codeMirrorValue,
        UserId: userId,
        ProblemId: problemId
      },
      {
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

    adminGetJoinRequests: function(authToken) {
      return axios.get("/api/classes", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
    }
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
      startingCode, displayExampleArr, testDataArr, classProblemObj) {
      return axios.post("/api/joinrequests/accept/" + classId, {
        title,
        description,
        startingCode,
        displayExampleArr,
        testDataArr,
        classProblemObj
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
    },
  }

};
