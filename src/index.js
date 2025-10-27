import express from "express";
import handlebars from "express-handlebars";
import homeController from "./controllers/homeController.js";

const app = express();

// Setup handlebars
app.engine(
	"hbs",
	handlebars.engine({
		extname: "hbs",
	})
);
app.set("view engine", "hbs");
app.set("views", "src/views");

// Routes
app.use(homeController);

// Setup middlewares
app.use(express.static("src/public"));

// Start server
app.listen(5000, () =>
	console.log("Server is listening on http://localhost:5000...")
);
