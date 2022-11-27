const isIdOrName = (value) => {
	return Number(value) ? "id" : "name";
};
module.exports = isIdOrName;
