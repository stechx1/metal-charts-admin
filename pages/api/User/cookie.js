import { getCookie, setCookies } from "cookies-next";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        {
          const admin = await getCookie("admin", { req, res });
          console.log(admin);

          res.send(admin);
        }
        break;
      case "POST": {
        setCookies("admin", "", {
          req,
          res,
          expires: new Date(0),
          sameSite: true,
          httpOnly: true,
          secure: true,
        });

        res.status(204);
      }
      default:
        {
          res.json({ message: "Request Method not defined!" });
        }
        break;
    }
  } catch (error) {
    res.json({ message: error.message });
  }
}
