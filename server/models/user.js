const goose = require('mongoose');
const Schema = goose.Schema;

const UserSchema = new goose.Schema({
    name: String,
    buckets: [{type: Schema.Types.ObjectId, ref: 'Bucket'}]
}, {timestamps: true});

const User = goose.model('User', UserSchema);