const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sleepDataSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId }, //auth.currentUser.uid
    username: { type: String, required: true, }, //auth.currentUser.displayName
    userId: { type: String, required: true, }, //auth.currentUser.uid
    change: { type: Array, default: [], },
    sleepStruggle: {
      min: { type: Number, enum: [0, 2, 8] , default: -1, },
      max: { type: Number, enum: [2, 8, -1] , default: 0, },
    },
    bedTime: { type: String, default: "", },
    wakeTime: { type: String, default: "", },
    sleepDuration: { type: Number, min: 0, max: 10, },
    createdAt: { type: Date, default: Date.now, },
    updatedAt: { type: Date, default: Date.now, },
  },
  { timestamps: true }
);

const SleepData = mongoose.model("SleepData", sleepDataSchema);
module.exports = SleepData;

