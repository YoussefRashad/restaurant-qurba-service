import { Router } from "express";
import Validate from "../../validator/validate";

import {
  createRestaurant,
  deleteRestaurant,
  editRestaurant,
  getRestaurant,
  fetchRestaurant,
  searchRestaurant,
} from "../../controller/restaurant.controller";

const router: Router = Router();

router.get("/fetch", fetchRestaurant);
router.post("/get", getRestaurant);
router.post("/search", searchRestaurant);
router.post("/create", createRestaurant);
router.put("/edit", editRestaurant);
router.delete("/delete", deleteRestaurant);

export default router;
