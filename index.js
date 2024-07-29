import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import database from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import BeritaRoute from "./routes/BeritaPemudaRoute.js";
import ProgramPemudaRoute from "./routes/ProgramPemudaRoute.js";
import RegProgramRoute from "./routes/RegProgramRoute.js";
import FileUpload from "express-fileupload";
import GaleriRoute from "./routes/GaleriRoute.js";
import ProgramOlahragaRoute from "./routes/ProgramOlahragaRoute.js";
import BeritaOlahragaRoute from "./routes/BeritaOlahragaRoute.js";
import KomentarRoute from "./routes/KomentarRoute.js";
import ForumRoute from "./routes/ForumRoute.js";
import Suratkadis from "./routes/SuratKadisRoute.js";
import Suratolahraga from "./routes/SuratOlahragaRoute.js";
import Suratsekretariat from "./routes/SuratSekretariatRoute.js";
import Suratpemuda from "./routes/SuratPemudaRoute.js";
import ProgramKerja from "./routes/ProgramKerjaRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: database,
});

// (async () => {
//   await database.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
      sameSite: "none",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001",
  })
);

app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(AuthRoute);
app.use(BeritaRoute);
app.use(BeritaOlahragaRoute);
app.use(ProgramPemudaRoute);
app.use(ProgramOlahragaRoute);
app.use(RegProgramRoute);
app.use(GaleriRoute);
app.use(ForumRoute);
app.use(KomentarRoute);
app.use(Suratkadis);
app.use(Suratolahraga);
app.use(Suratsekretariat);
app.use(Suratpemuda);
app.use(ProgramKerja);

app.get("/", (req, res) => {
  res.send("<h1>BackendDispora</h1>");
});

store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
