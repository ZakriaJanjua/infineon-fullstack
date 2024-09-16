const { app } = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION).then(
	() => console.log('db connected'),
	(err) => console.error(err)
);

app.listen(process.env.PORT, () => {
	console.log(`server running at ${process.env.PORT}`);
});
