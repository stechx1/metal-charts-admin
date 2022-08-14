import Price from "../../../models/Price"
// database
import database from "../../../lib/database";

export default async function handler(req, res){
    try {
        // database
        await database();


        switch(req.method){
            case "GET":{
                const price=await Price.findOne({name:"ukoil"});
                return res.send(price);
            }
            case "POST":{
                const {price}=await req.body;
                const ukoil = await Price.findOneAndUpdate(
                    { name: "ukoil" },
                    { price: price, updated_at: Date.now()  },
                    { new: true, upsert: true }
                  );
                return res.send(ukoil)
            }
        }
    } catch (error) {
        res.json({"message":error.message})
    }
}