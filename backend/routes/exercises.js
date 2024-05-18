const router = require("express").Router();
const Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.status(200).json(exercises))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/add").post(async (req, res) => {
  const {
    def_name,
    def_addr,
    crime_type,
    crime_date,
    crime_location,
    ao_name,
    arrest_date,
    judge_name,
    lawyer_name,
    prosecutor_name,
    start_date,
    end_date,
    status,
    summaries,
    next_hearing,
    hearing_slot,
  } = req.body;

  const len = await Exercise.find().countDocuments();


  const newExercise = new Exercise({
    def_name,
    def_addr,
    crime_type,
    crime_date,
    crime_location,
    ao_name,
    arrest_date,
    judge_name,
    lawyer_name,
    prosecutor_name,
    start_date,
    end_date,
    status,
    summaries,
    cin: len+1,
    next_hearing: { date: next_hearing, slot: hearing_slot },
  });

  console.log("this is new exercise\n", newExercise);

  newExercise
    .save()
    .then(() => res.status(200).json("Exercise added!"))
    .catch((err) => res.json("Error " + err));
});

router.route("/emptyslots").get(async (req, res) => {
  try {
    console.log("fffffff");
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);

    const slots = [1, 2];
    const emptySlots = {};

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      if (d.getDay() === 0 || d.getDay() === 6) continue; // skip weekends
      const resp = await Exercise.find({ "next_hearing.date": d }).select(
        "next_hearing"
      );
      const filled = resp.map((x) => x.next_hearing.slot);
      const empty = slots.filter((x) => !filled.includes(x));
      emptySlots[d.toISOString().split("T")[0]] = empty;
    }
    res.status(200).json(emptySlots);
  } catch (e) {
    console.log(e);
    res.status(400).json("Error " + e);
  }
});

router.route("/search").post(async (req, res) => {
  try{
    const { starting_date, ending_date, hearing_date, cin, keyword } = req.body;
    console.log(req.body);
    const query = {};
    if (starting_date) query.end_date = { $gte: new Date(starting_date) };
    if (ending_date) query.end_date = { $lte: new Date(ending_date) };
    if (hearing_date) query["next_hearing.date"] = new Date(hearing_date);
    if (keyword) query["summaries.summary"] = { $regex: keyword, $options: 'i' };
    if (cin) query.cin = cin;
    console.log(query);
    const exercises = await Exercise.find(query);
    res.status(200).json(exercises);
  } catch(e){
    console.log(e);
  }
});


router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.status(200).json(exercise))
    .catch((err) => res.json("Error " + err));
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("Exercise deleted"))
    .catch((err) => res.json("Error " + err));
});

router.route("/update/:id").post(async (req, res) => {
  const resp = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
  });
  console.log(resp);
  res.status(200).json("Updated");
  //   exercise.save()
  //       .then(() => )
  //       .catch(err => res.status(400).json('Error ' + err));
  // .catch(err => res.status(400).json('Error ' + err));
});

router.route("/cases/upcomingCases").get(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  Exercise.find({ start_date: { $gte: today } })
    .then((exercise) => res.status(200).json(exercise))
    .catch((err) => res.json("Error " + err));
});

router.route("/cases/pendingCases").get((req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  Exercise.find({
    $and: [{ start_date: { $lt: today } }, { end_date: { $gte: today } }],
  })
    .then((exercise) => res.status(200).json(exercise))
    .catch((err) => res.json("Error " + err));
});

router.route("/cases/resolvedCases").get((req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  Exercise.find({ end_date: { $lt: today } })
    .then((exercise) => res.status(200).json(exercise))
    .catch((err) => res.json("Error " + err));
});

module.exports = router;
