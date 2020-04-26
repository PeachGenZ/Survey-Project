const router = require('express').Router();
let UserResult = require('../models/userResult.model');

router.route('/').get((req, res) => {
  UserResult.find()
    .then(userResult => res.json(userResult))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
  const answerId = req.body.answerId;
  const surveyId = req.body.surveyId;
  const setResult = req.body.setResult;
  const userResult = req.body.userResult;

  const newUserResult = new UserResult({
    answerId,
    surveyId,
    setResult,
    userResult,
  });

  newUserResult.save()
    .then(() => res.json('newUserResult create!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/find/:id').get((req, res) => {
  UserResult.find({ surveyId: req.params.id })
    .then(userResult => res.json(userResult))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  UserResult.findByIdAndDelete(req.params.id)
    .then(() => res.json('newUserResult deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit/:id').post((req, res) => {
  UserResult.findById(req.params.id)
    .then(userResult => {
      userResult.userResult = req.body.userResult;
      userResult.setResult = req.body.setResult;
      
      userResult.save()
        .then(() => res.json('UserResult update!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;