var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    def_name:       {type: String , required: true},
    def_addr:       {type: String , required: true},
    crime_type:     {type: String , required: true},
    crime_date:     {type: Date , required: true},
    crime_location: {type: String , required: true},
    ao_name:        {type: String , required: true},
    arrest_date:    {type: Date , required: true},
    judge_name:     {type: String , required: true},
    lawyer_name:    {type: String , required: true},
    prosecutor_name:{type: String , required: true},
    start_date:     {type: Date , required: true},
    end_date:       {type: Date, required: true},
    status:         {type: String , required: true},
    cin:            {type: Number, required: true},
    summaries: [{
        summary: { type: String, required: true },
        hearingDate: { type: Date, required: true }
    }],
    next_hearing:   {date: {type: Date, required: true}, slot: {type: Number, required: true, enum: [1,2]}},

},{
    timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
