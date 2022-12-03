const isValidId = (id, count) => {
	return Number(id) <= count && Number(id) > 0 ? true : false;
};

module.exports = isValidId;
