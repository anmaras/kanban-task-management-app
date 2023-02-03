const notFoundMiddleware = (req, res) => {
  //if route does not exist send that response
  res.status(400).send('Route does not exist');
};

export default notFoundMiddleware;
