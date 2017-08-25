const goose = require('mongoose');
const Schema = goose.Schema;

const BucketSchema = new goose.Schema({
    title: String,
    description: String,
    creator: String,
    checked: Boolean,
    _users: [{type:Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true});

const Bucket = goose.model('Bucket', BucketSchema);