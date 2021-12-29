import express from "express";
import dotenv from "dotenv";

dotenv.config();
const env = process.env;
const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router: express.Router = express.Router();
app.use(router);

//Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/api/getTest", (req: express.Request, res: express.Response) => {
  console.log("get request");
  res.send("Hello world");
});

//Router
const posts = require("./routes/posts");
app.use("/posts", posts);

const users = require("./routes/users");
app.use("/users", users);

//Server
const PORT = env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on ${PORT}`));
