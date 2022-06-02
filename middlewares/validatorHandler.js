const boom = require("@hapi/boom");

function validatorHandler(schema, property) {
  return (req, res, next) => {
    // req.body POST
    // req.params GET
    // req.query depends on the request the information could come from any of the above
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler
