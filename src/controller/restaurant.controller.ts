import Request from "../types/Request";
import { Response } from "express";
import HttpStatusCodes from "http-status-codes";
import Restaurant from "../models/restaurant.model";
import { IRestaurant } from "../models/restaurant.model";
import Messages from "../config/Messages";

export const fetchRestaurant = async (req: Request, res: Response) => {
  const restaurants = await Restaurant.find();
  return res.status(HttpStatusCodes.OK).send(restaurants);
};
export const getRestaurant = async (req: Request, res: Response) => {
  const { code }: { code: string } = req.body;
  const restaurant = await getRestaurantByCode(code);
  if (!restaurant) {
    return res.status(HttpStatusCodes.BAD_REQUEST).send(Messages.restaurant.error.NOT_FOUND);
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
    return res.status(HttpStatusCodes.BAD_REQUEST).send(Messages.restaurant.error.NOT_FOUND);
  }
  return res.status(HttpStatusCodes.OK).send(restaurants);
};

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = new Restaurant({ ...req.body });
    await restaurant.save();
    return res.status(HttpStatusCodes.CREATED).send(restaurant);
  } catch (error) {
    return res.status(HttpStatusCodes.BAD_REQUEST).send(error.message);
  }
};
export const editRestaurant = async (req: Request, res: Response) => {
  const {
    code,
    user_id,
    ...rest
  }: { code: string; user_id: string; rest: IRestaurant } = req.body;
  const restaurant = await getRestaurantByCode(code);
  if (!restaurant) {
    return res.status(HttpStatusCodes.BAD_REQUEST).send(Messages.restaurant.error.NOT_FOUND);
  }
  checkIfAuthorized(user_id, restaurant);
  await restaurant.updateOne(rest);
  return res.status(HttpStatusCodes.CREATED).send(restaurant);
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  const { code, user_id }: { code: string; user_id: string } = req.body;
  const restaurant = await getRestaurantByCode(code);
  if (!restaurant) {
    return res.status(HttpStatusCodes.BAD_REQUEST).send(Messages.restaurant.error.NOT_FOUND);
  }
  checkIfAuthorized(user_id, restaurant);
  await restaurant.delete();
  return res.status(HttpStatusCodes.OK).send(restaurant);
};

const getRestaurantByCode = async (code: string) => {
  return await Restaurant.findOne({ code });
};

const checkIfAuthorized = (user_id: string, restaurant: IRestaurant) => {
  if (+user_id === +restaurant.user_id) {
    throw new Error(Messages.user.error.NOT_AUTHORIZED);
  }
};
