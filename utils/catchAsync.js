// A wrapper function to deal with promises
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

/*
we dont want to mess around with error handling inside our userController
we dont want to repeat our self using try catch
we dont want to send error response from our controller 

// into our  catchAsync function we are passing a function(createUser)
const catchAsync = function => {
  // function is an async function , and async functions return promises , so we can use .catch(next) to pass the error to our globalErrorHandler
  return (req , res , next) => { // the function that express gonna call
    function (req , res , next).catch(next)
  }
}

const createUser =  catchAsync(async (req , res ,next) => {
  const user = await User.create({...req.body})
  res.status(200).json({
    data: {
      user
    }
  })
})
*/
