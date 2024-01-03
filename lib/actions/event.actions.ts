"use server";
import { CreateEventParams, GetAllEventsParams } from "../../types/index";
import { connectToDatabase } from "../database/index";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import Category from "../database/models/category.model";
import { Handlee } from "next/font/google";



const populateEvent = (query: any) => {
  return query
    .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
    .populate({ path: 'category', model: Category, select: '_id name' })
}

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);

    if (!organizer) throw new Error("Orgnizer not found");

    const NewEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(NewEvent));
  } catch (error) {
    console.log(error);

    handleError(error);
  }
};

export const getEventById = async (eventid: string) => {
  try {
    await connectToDatabase();

    const event = await populateEvent(Event.findById(eventid));

    if (!event) {
      throw new Error("Event not found");

    }
    return JSON.parse(JSON.stringify(event));

  } catch (error) {
    handleError(error);
  }
};

export const getAllEvents =async ({ query , limit = 6 , page , category} : GetAllEventsParams) => {

  try {

    await connectToDatabase();

    const conditions = {}

    const Events = await Event.find(conditions).sort({ createdAt: 'desc'}).skip(0).limit(limit)

  

    return JSON.parse(JSON.stringify(Events))
    
  } catch (error) {

    handleError(error)
    
  }
  
}