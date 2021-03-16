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






  //   inviteFriend: function (email) {
  //     return axios.post("/api/users/invite",{ email: email })
  //   },
    
  //   // retrieves an array of objects with all of the people a user follows
  //   getThoseIFollow: function (authToken) {
  //     return axios.get("/api/users/follows", {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     });
  //   },

  //   // add to the people a user is following
  //   // must pass in the id of person they want to follow
  //   addToThoseIFollow: function (userFollowie, authToken) {
  //     return axios.post(
  //       "/api/users/follows",
  //       {
  //         userFollowie: userFollowie,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       }
  //     );
  //   },

  //   // remove a userFollowie for a user
  //   // must pass in the id of person they want to unfollow
  //   removeFromThoseIFollow: function (userFollowie, authToken) {
  //     return axios.put(
  //       "/api/users/follows/delete",
  //       {
  //         userFollowie: userFollowie,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       }
  //     );
  //   },

  //   // Search for a user by entering their email
  //   // returns an object
  //   searchForUser: function (email) {
  //     return axios.get("/api/users/search/" + email, {});
  //   },
  // },


};
