import { Document, Model, model, Schema } from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import config from "../config/default";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  tokens: Object[];
  generateAuthToken: () => Promise<string>;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required!"],
      validate(val: string) {
        if (!validator.isEmail(val)) {
          throw new Error("email is not valid!");
        }
      },
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "username is required!"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required!"],
      minlength: 6,
    },
    phoneNumber: {
      type: String,
      required: [true, "phone number is required!"],
      trim: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
  },
  {
    timestamps: true,
  }
);

// to hide some information
userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;

  return userObj;
};

// generate authentication token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.jwtSecret);
  user.tokens = [...user.tokens, { token }];
  await user.save();
  return token;
};

// to find the user by using his credentials
export const FindByCredentials = async (
  email: string,
  password: string
) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("Unable to login!");
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    throw new Error("Unable to login ... password is incorrect!");
  }
  return user;
};

// convert the plain password into the hashed password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const userModel: Model<IUser> = model("User", userSchema);

export default userModel;
