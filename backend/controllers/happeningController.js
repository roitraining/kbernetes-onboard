const happeningRepository = require('../repositories/happeningRepository');

exports.root = (req, res) => {
    console.log('Kubernetes health check');
	res.json([]);
};



exports.getHappenings = (req, res) => {
    console.log('Retrieving happenings from firestore');
	happeningRepository.getHappenings(function(happenings) {
		res.json(happenings);
	});
};


exports.addHappening = (req, res, next) => {
    console.log('adding a new happening ' + req.params.id + ' to firestore');
	const happening = {
		name: req.body.name,
		description: req.body.description,
        image: req.body.image,
        date_added: new Date(),
        likes: 0
	};

	happeningRepository.addHappening(happening, req.params.id, function(outcome) {
		res.json(outcome);
	}, next);
};


exports.likeHappening = async (req, res, next) => {
	try {
        console.log('liking happening ' + req.params.id );

		happening = await happeningRepository.getHappening(req.params.id);
        happening.likes += 1;
		happeningRepository.likeHappening(
            happening,
            req.params.id,
			(data) => {
				res.json({ likes: data});
			},
			next);

	} catch (e) {
		next(e);
	}

};



exports.authInfoHandler = function(req, res) {
	let authUser = {
		id: 'anonymous'
	};
	const encodedInfo = req.get('X-Endpoint-API-UserInfo');
	if (encodedInfo) {
		authUser = JSON.parse(Buffer.from(encodedInfo, 'base64'));
	}
	res.json(authUser);
};