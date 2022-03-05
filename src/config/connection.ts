
import mongoose from "mongoose";
import config from './default'

export default mongoose.connect(config.mongoURI)