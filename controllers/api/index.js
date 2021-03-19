const apiControllers = require("express").Router();

apiControllers.use("/users", require("./usersController"));
apiControllers.use("/answers", require("./answersController"));
apiControllers.use("/classes", require("./classesController"));

module.exports = apiControllers;