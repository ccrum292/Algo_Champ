const apiControllers = require("express").Router();

apiControllers.use("/users", require("./usersController"));
apiControllers.use("/answers", require("./answersController"));
apiControllers.use("/classes", require("./classesController"));
apiControllers.use("/joinrequests", require("./joinRequestController"));
apiControllers.use("/problems", require("./problemsController"));

module.exports = apiControllers;