import { Document, Model, model, Schema } from "mongoose";

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
      required: [true, "Restaurant name is required!"],
      trim: true,
    },
    code: {
      type: String,
      unique: true,
      required: [true, "Restaurant code is required!"],
    },
    age: {
      type: Number,
      required: [true, "User age is required!"],
    },
    location: {
      type: String,
      required: [true, "restaurant location is required!"],
      trim: true,
    },
    website: {
      type: String,
      required: [true, "restaurant website is required!"],
      trim: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
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
