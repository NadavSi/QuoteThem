var mongoose = require("mongoose");

var quoteSchema = new mongoose.Schema({
	content: {
		type: String,
		default: ""
	},
	author: {
		type: String,
		default: ""
	},
	year: {
		type: String,
		default: ""
	}
});

quoteSchema.method("transform", function () {
	var obj = this.toObject();
	obj.id = obj._id;
	delete obj._id;
	return obj;
});
module.exports = mongoose.model("Quote", quoteSchema);
