import { User } from "../models/userModel";
import { createEntity, getEntitiy } from "./factoryController";

export const addUser = createEntity(User);
export const getUser = getEntitiy(User);
