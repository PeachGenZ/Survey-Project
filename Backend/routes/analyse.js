const router = require('express').Router();
let Analyse = require('../models/analyse.model');

router.route('/').get((req, res) => {
  Analyse.find()
    .then(analyses => res.json(analyses))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
  const answerId = req.body.answerId;
  const surveyId = req.body.surveyId;
  const preProcess = req.body.preProcess;
  const result = req.body.result;
  const amountAnswer = req.body.amountAnswer;

  const newAnalyse = new Analyse({
    answerId,
    surveyId,
    preProcess,
    result,
    amountAnswer
  });

  newAnalyse.save()
    .then(() => res.json('Analyse create!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/find/:id').get((req, res) => {
  Analyse.find({ surveyId: req.params.id })
    .then(analyses => res.json(analyses))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Analyse.findByIdAndDelete(req.params.id)
    .then(() => res.json('Analyse deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit/:id').post((req, res) => {
  Analyse.findById(req.params.id)
    .then(analyse => {
      analyse.preProcess = req.body.preProcess;
      analyse.result = req.body.result;
      analyse.amountAnswer = req.body.amountAnswer;
      
      analyse.save()
        .then(() => res.json('Analyse update!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;