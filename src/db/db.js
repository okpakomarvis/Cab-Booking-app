const mongoose = require('mongoose');

function connect() {
	return new Promise((resolve, reject) => {
        /* console.log('[env]', process.env.NODE_ENV )
		if (process.env.NODE_ENV === 'test') {
            const Mockgoose= require('mockgoose').Mockgoose;
            const mockgoose = new Mockgoose(mongoose);
            mockgoose.prepareStorage()
            .then(() =>{
                mongoose
				.connect(process.env.MONGO_DB,
					{ useNewUrlParser: true, useCreateIndex: true }
				)
				.then((res, err) => {
					if (err) return reject(err);
					resolve();
				});
            })
		}
		else { } */
			mongoose
				.connect(
					`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-zztt7.mongodb.net/${process
						.env.MONGO_DB}?retryWrites=true&w=majority`,
					{ useNewUrlParser: true, useCreateIndex: true }
				)
				.then((res, err) => {
					if (err) return reject(err);
					resolve();
				});
		
	});
}

function close() {
	return mongoose.disconnect();
}

module.exports = { connect, close };
