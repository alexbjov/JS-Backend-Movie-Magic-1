import express from "express";
import handlebars from "express-handlebars";
import routes from "./routes.js";

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

// Setup middlewares
app.use(express.static("src/public"));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Start server
app.listen(5000, () =>
	console.log("Server is listening on http://localhost:5000...")
);
