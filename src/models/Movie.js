import fs from "fs/promises";
import { v4 as uuid } from "uuid";

let dbSerialized = await fs.readFile("./src/db.json", { encoding: "utf-8" });
let db = JSON.parse(dbSerialized);

export default class Movie {
	constructor(data) {
		Object.assign(this, data);
		this._id = uuid();
	}

	async save() {
		db.movies.push(this);

		const dbSerialized = JSON.stringify(db, null, 4);

		await fs.writeFile("./src/db.json", dbSerialized);

		return this;
	}

	get id() {
		return this._id;
	}

	static find(filter = {}) {
		let result = db.movies.slice();

		if (filter._id) {
			result = result.filter((m) => m._id === filter._id);
		}

		if (filter.title) {
			result = result.filter((m) =>
				m.title.toLowerCase().includes(filter.title.toLowerCase())
			);
		}

		if (filter.genre) {
			result = result.filter(
				(m) => m.genre.toLowerCase() === filter.genre.toLowerCase()
			);
		}

		if (filter.year) {
			result = result.filter((m) => m.year === filter.year);
		}

		return result;
	}

	static findOne(filter = {}) {
		let result = db.movies[0];
		if (filter._id) {
			result = db.movies.find((m) => m._id === filter._id);
		}
		return result;
	}
}
