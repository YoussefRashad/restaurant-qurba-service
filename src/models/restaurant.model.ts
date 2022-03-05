import { Document, Model, model, Schema } from "mongoose";

export interface IRestaurant extends Document {
  name: string;
  age: number;
  location: string;
  website: string;
  user_id: string;
}

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Restaurant name is required!"],
      trim: true,
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
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const restaurantModel: Model<IRestaurant> = model("Restaurant", restaurantSchema);

export default restaurantModel;
