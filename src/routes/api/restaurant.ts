import { Router } from "express";
import Validate from "../../validator/validate";
import CreateValidate from "../../validator/create.validator";
import UpdateValidate from "../../validator/update.validator";
import DeleteValidate from "../../validator/delete.validator";
import SearchValidator from '../../validator/search.validator';
import GetValidator from '../../validator/get.validator';

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
router.post("/get", Validate(GetValidator), getRestaurant);
router.post("/search", Validate(SearchValidator), searchRestaurant);
router.post("/create", Validate(CreateValidate), createRestaurant);
router.put("/update", Validate(UpdateValidate), editRestaurant);
router.post("/delete", Validate(DeleteValidate), deleteRestaurant);

export default router;
