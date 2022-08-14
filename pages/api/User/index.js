// database
import database from "../../../lib/database";
// models
import User from "../../../models/User";

import { getCookie, setCookies } from "cookies-next";

export default async function handler(req, res) {
  try {
    // database
    await database();

    switch (req.method) {
      case "GET": {
        // admin login
        const { email, password } = await req.query;
        console.log(req.query);
        const isExist = await User.findOne({ email, password, role: "admin" });
        console.log("isExist", isExist);
        if (!isExist) {
          return res.status(203).json({ message: "Wrong email or Password" });
        }

        const token = isExist.token;
        setCookies("admin", token, {
          req,
          res,
          maxAge: 60 * 60 * 24,
          sameSite: true,
          httpOnly: true,
          secure: true,
        });

        res.status(200).json({ message: "User Authenticated" });
      }
      default:
        {
          res.json({ message: "Request Method not defined!" });
        }
        break;
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}
