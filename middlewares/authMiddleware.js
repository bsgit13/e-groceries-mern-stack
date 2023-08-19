import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
//TWO MIDDLEWARES
//1) TOKEN CHECK
//2) ADMIN CHECK
/*
We use token to protect our routes
We create a middleware and perform token comparison
If token is obtained then only we show route
Else we protect our route
// know more about middleware in node js https://www.geeksforgeeks.org/middleware-in-express-js/
*/
//Protected Routes token base
//we will have extra parameter called next because of middleware in arrow function
//whenever we get request then only next is validated and response is sent
//we will validate authorized user using next
export const requireSignIn = async (req, res, next) => {
  try {
    //verify is a function of jsonwebtoken.
    //We will get token which is present in req.headers.authorization, and also put the decode key JWT_SECRET
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode; //we are decrypting
    next(); //once decode is done call next
  } catch (error) {
    console.log(error);
  }
};

//admin access
//Protected middleware is created for admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    //in db we have a field called role (if(role==0) user access else if(role==1) admin access
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next(); //admin can access
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
