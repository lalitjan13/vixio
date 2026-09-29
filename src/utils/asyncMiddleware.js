const asyncMiddleware = (handler) => {
  (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch((err) => next(err));
  };
};

export default asyncMiddleware;

// const asyncMiddleware = (handler) => {
//   return async (req, res, next) => {
//     try {
//       await handler(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };
// };
