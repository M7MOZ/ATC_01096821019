import Event from '../models/event.model.js';
import { errorHandler } from '../utils/error.js';

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    next(errorHandler(500, "Failed to fetch events."));
  }
};

export const getSingleEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return next(errorHandler(404, "Event not found."));
    res.status(200).json(event);
  } catch (err) {
    next(errorHandler(500, "Failed to fetch the event."));
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const { title, location, price, rating, image, description, gallery, category, startDate, endDate } = req.body;

    const newEvent = new Event({ title, location, price, rating, image, description, gallery, category, startDate, endDate });
    await newEvent.save();

    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (err) {
    next(errorHandler(500, "Failed to create event."));
  }
};
