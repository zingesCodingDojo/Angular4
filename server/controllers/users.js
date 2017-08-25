const goose = require('mongoose');
const User = goose.model('User');
const Bucket = goose.model('Bucket');
goose.Promise = global.Promise
const session = require('express-session');

module.exports = {
    login: (req, res, next) => {
        User.findOne({name: req.body.name}).then( user => {
            if (user){
                req.session.name = user.name;
                res.json(true);
            } else{
                let new_user = new User({name:req.body.name})
                new_user.save().then(() => {
                    req.session.name = new_user.name;
                    res.json(true);
                }).catch(err => console.log("ERROR No user", err))
            };
        });
    },

    get_user: (req, res, next) => {
        let found_user = User.findOne({name: req.session.name})
        .then( user => {
            if (!user){
                // try status with json?
                res.status(500).json(false)
            } else{
                User.findOne({name: req.session.name})
                    .populate('buckets')
                    .exec( (err, removeU) => {
                    // parse error
                    res.status(200).json(removeU)
                    })
                };
            }
        );
    },

    getDisplay: (req, res, next) => {
        if (!req.session.name){
            res.redirect('/')
        } else {
            if (req.session.name == req.body){
                res.redirect('/')
            } else {
                User.findOne({name: req.body.name})
                        .populate('buckets')
                        .exec((err, removeU) => {
                        // parse error
                        res.status(200).json(removeU)
                        });
                    };
        };
    },

    getAll: (req, res, next) => {
        // Lets get everyone in database EXCEPT myself. --- $ ne
        User.find({name : {$ne: req.session.name}})
        .then(users => {res.status(200).json(users)})
        .catch( err => {res.status(500).json(err)});
    },

    create: (req, res, next) => {
        User.findOne({name: req.session.name}, (err, user) => {
        // ALWAYS BE EXPLICIT!
        let newBucket = new Bucket({title: req.body.title, description: req.body.description, checked: false, creator: req.session.name, _users:[user]})
        newBucket.save()
            .then( () => {
                user.buckets.push(newBucket)
                user.save((err) => {
                    if (err){
                        res.json(false)
                    } else {
                        res.json(newBucket)
                    }
                })
            })
        })
    },

    check: (req, res, next) => {
        Bucket.findOne({_id: req.body._id})
            .then( bucket => {bucket.checked = true;
            bucket.save()})
            .catch( (err) => {console.log("Error when Checking box.", err)});
    },

    uncheck: (req, res, next) => {
        Bucket.findOne({_id: req.body._id})
            .then( bucket => {bucket.checked = false;
            bucket.save()})
            .catch( (err) => {console.log("Error when UNCHECKING BOX.", err)});
    },

    tag: (req, res, next) => {
        User.findOne({_id: req.body.tagged}, (err, user) => {
            Bucket.findOne({title: req.body.title})
            .then(foundBucket => {
                foundBucket._users.push(user)
                foundBucket.save()
                    .then( () => {
                        user.buckets.push(foundBucket)
                        user.save( (err) => {
                            if (err){
                                res.json(false);
                            } else {
                                res.json(foundBucket);
                            }
                        })
                    })
                }
            );
        });
    },

    logout: (req, res, next) => {
        console.log(req.session);
        req.session.destroy();
        res.redirect('/');
    }
};