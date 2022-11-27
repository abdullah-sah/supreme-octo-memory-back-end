const isValidId = (id, count) => {
	return id > count || id <= 0 ? false : true;
};

module.exports = isValidId;
