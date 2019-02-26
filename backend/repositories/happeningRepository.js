const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
	projectId: process.env.GOOGLE_CLOUD_PROJECT
});

const HAPPENINGS = 'happenings';



const processHappenings = entities => {
	const e = [];
	entities.forEach(element => {
        let d = element.data();
        d.id = element.id;
        d.date_added = d.date_added.toDate()
		e.push(d);
	}, this);
	return e;
};


const happeningRepository = (function() {

	const getHappenings = (callback) => {
		db.collection(HAPPENINGS).orderBy('date_added', 'desc').get()
		.then((snapshot) => {
			if (!snapshot.empty) {
                console.log('Retrieved all happenings from firestore');
				callback(processHappenings(snapshot.docs));
			} else {
				callback([]);
			}
		})
		.catch((err) => {
			console.error('Error getting happenings', err);
			callback([]);
		});
	};

	const getHappening = (id) => {
		return new Promise((resolve, reject) => {
			db.collection(HAPPENINGS).doc(id).get()
				.then((snapshot) => {
					if (snapshot.exists) {
							resolve(snapshot.data());
					} else {
						resolve(null);
					}
				})
				.catch(err => reject(err));
		});

	};

	const addHappening = (happening, id, callback, next) => {
		db.collection(HAPPENINGS).doc(id).set(happening)
			.then(res => {
                console.log('successfully added happening: ' + id + ' to firestore');
                callback(res);
  			})
			.catch(next);
	};

	const likeHappening = (happening, id, callback, next) => {
		db.collection(HAPPENINGS).doc(id).update({
					likes : happening.likes
				})
				.then(outcome => {
                    console.log('added like to happening ' + id );
					callback(happening.likes);
				})
		.catch(next);
	};



	return {
		getHappening: getHappening,
		getHappenings: getHappenings,
		addHappening: addHappening,
		likeHappening: likeHappening

	};
})();

module.exports = happeningRepository