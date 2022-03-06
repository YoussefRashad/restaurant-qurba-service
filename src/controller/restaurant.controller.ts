import Request from "../types/Request";
import { Response } from "express";
import HttpStatusCodes from "http-status-codes";
import Restaurant from "../models/restaurant.model";
import { IRestaurant } from "../models/restaurant.model";

export const fetchRestaurant = async (req: Request, res: Response) => {
  const restaurants = await Restaurant.find();
  return res.status(HttpStatusCodes.OK).send(restaurants);
};
export const getRestaurant = async (req: Request, res: Response) => {
  const { code }: { code: string } = req.body;
  const restaurant = await get(code);
  if (!restaurant) {
    return res.status(HttpStatusCodes.BAD_REQUEST).send();
  }
  return res.status(HttpStatusCodes.OK).send(restaurant);
};
export const searchRestaurant = async (req: Request, res: Response) => {
  const { query } = req.body;
  const restaurants = await Restaurant.aggregate([
    {
      $match: {
        $or: [
          { name: query },
          { age: query },
          { code: query },
          { location: query },
        ],
      },
    },
  ]);
  if (!restaurants.length) {
    return res.status(HttpStatusCodes.BAD_REQUEST).send();
  }
  return res.status(HttpStatusCodes.OK).send(restaurants);
};

export const createRestaurant = async (req: Request, res: Response) => {
  const restaurant = new Restaurant({ ...req.body });
  await restaurant.save();
  return res.status(HttpStatusCodes.CREATED).send(restaurant);
};
export const editRestaurant = async (req: Request, res: Response) => {
  const {
    code,
    user_id,
    ...rest
  }: { code: string; user_id: string; rest: IRestaurant } = req.body;
  const restaurant = await get(code);
  if (!restaurant) {
    return res.status(HttpStatusCodes.BAD_REQUEST).send();
  }
  checkIfAuthorized(user_id, restaurant);
  await restaurant.updateOne(rest);
  return res.status(HttpStatusCodes.CREATED).send(restaurant);
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  const { code, user_id }: { code: string; user_id: string } = req.body;
  const restaurant = await get(code);
  if (!restaurant) {
    return res.status(HttpStatusCodes.BAD_REQUEST).send();
  }
  checkIfAuthorized(user_id, restaurant);
  await restaurant.delete();
  return res.status(HttpStatusCodes.OK).send(restaurant);
};

const get = async (code: string) => {
  return await Restaurant.findOne({ code });
};

const checkIfAuthorized = (user_id: string, restaurant: IRestaurant) => {
  if (+user_id === +restaurant.user_id) {
    throw new Error("restaurant does not exist");
  }
};
