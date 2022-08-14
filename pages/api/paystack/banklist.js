import axios from "axios";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET": {
        const response = await axios(`https://api.paystack.co/bank`, {
          headers: {
            Authorization: "Bearer" + process.env.SECRET_KEY,
          },
        });

        // banks list
        res.send(response.data.data);
      }
      default: {
        return res.json({ message: "Request Method not defined!" });
      }
    }
  } catch (error) {
    res.json({ "acc-verify": error.message });
  }
}
