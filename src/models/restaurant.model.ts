import { Document, Model, model, Schema } from "mongoose";
import Messages from "../config/Messages";

export interface IRestaurant extends Document {
  name: string;
  code: string;
  age: number;
  location: string;
  website: string;
  user_id: Schema.Types.ObjectId;
}

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, Messages.restaurant.error.NAME_REQUIRED],
      trim: true,
    },
    code: {
      type: String,
      unique: true,
      required: [true, Messages.restaurant.error.CODE_REQUIRED],
    },
    age: {
      type: Number,
      required: [true, Messages.user.error.AGE_REQUIRED],
    },
    location: {
      type: String,
      required: [true, Messages.restaurant.error.LOCATION_REQUIRED],
      trim: true,
    },
    website: {
      type: String,
      required: [true, Messages.restaurant.error.WEBSITE_REQUIRED],
      trim: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: [true, Messages.user.error.USER_ID_REQUIRED],
    },
  },
  {
    timestamps: true,
  }
);

// to hide some information
restaurantSchema.methods.toJSON = function () {
  const restaurant = this;
  const restaurantObj = restaurant.toObject();
  delete restaurantObj.user_id;

  return restaurantObj;
};

const restaurantModel: Model<IRestaurant> = model("Restaurant", restaurantSchema);

export default restaurantModel;
