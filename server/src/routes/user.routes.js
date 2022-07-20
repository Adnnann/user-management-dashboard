import express from "express";
import passport from "passport";
import userCtrl from "../controllers/user.controller.js";
import "../middleware/passport.js";

const router = express.Router();

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.cookies.userJwtToken) {
      res.send(JSON.stringify({ message: req.cookies.userJwtToken }));
    }
  }
);

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.cookies.userJwtToken) {
      res.send(JSON.stringify({ message: req.cookies.userJwtToken }));
    }
  }
);
// For authorization add here authCtrl.hasAuthorization. If user does not have httpyOnly cookie in request he or she will not
//be able to access routes. Also users using POSTMAN would be prevented from sending req if they are not logged in
router.route("/api/users").post(userCtrl.getUsers);
router.route("/api/addUser").post(userCtrl.createUser);
router.route("/api/removeUser/:userId").put(userCtrl.remove);
router.route("/api/assignUserRole/:userId").put(userCtrl.assignUserRole);
router.route("/api/users/:userId").get(userCtrl.read).put(userCtrl.update);

router.param("userId", userCtrl.userByID);

export default router;
