const logErrors = (err, req, res, next) => {
	console.error(err.stack);
	next(err);
};

const clientErrorHandler = (err, req, res, next) => {
	if (req.xhr) {
		res.status(500).json({ error: 'Fatal error' });
	} else {
		next(err);
	}
};

const errorHandler = (err, req, res, next) => {
	res.status(500).json({ error: err });
};

export {
	logErrors,
	clientErrorHandler,
	errorHandler
};