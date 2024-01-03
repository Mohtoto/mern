"use server";

import { CreateCategoryParams } from "../../types";
import { connectToDatabase } from "../database/index";
import { handleError } from "../utils";
import Category from "../database/models/category.model";


export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase();

    const newCatergory = await Category.create({ name: categoryName }); // //creates new categrory in monogoDB

    return JSON.parse(JSON.stringify(newCatergory));
  } catch (error) {
    handleError(error);
  }
};


export const getAllCategrories = async () => {
  try {
    await connectToDatabase();

    const Catergories = await Category.find(); //returns all the categrories in monogoDB

    return JSON.parse(JSON.stringify(Catergories));
  } catch (error) {
    handleError(error);
  }
};
