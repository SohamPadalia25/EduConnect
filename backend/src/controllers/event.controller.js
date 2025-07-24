import Event from "../models/event.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse }from "../utils/ApiResponse.js";

/** @desc Create Event */
export const createEvent = asyncHandler(async (req, res) => {
  const {
    title, description, type, tags, date, time, pricing,
    price, location, image, duration
  } = req.body;

  if (!title || !description || !type || !date || !pricing || !location) {
    throw new ApiError(400, "Required fields missing");
  }

  const event = await Event.create({
    title,
    description,
    type,
    tags,
    date,
    time,
    pricing,
    price: pricing === 'paid' ? price : "Free",
    location,
    image,
    duration,
    provider: req.user._id
  });

  res
    .status(201)
    .json(new ApiResponse(201, event, "Event created successfully"));
});

/** @desc Get All Events (with optional filters) */
export const getAllEvents = asyncHandler(async (req, res) => {
  const { status, type } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (type) filter.type = type;

  const events = await Event.find(filter).sort({ date: 1 });

  res.status(200).json(new ApiResponse(200, events));
});

/** @desc Get Single Event by ID */
export const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate('provider', 'fullname email');
  if (!event) throw new ApiError(404, "Event not found");

  res.status(200).json(new ApiResponse(200, event));
});

/** @desc Update Event */
export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new ApiError(404, "Event not found");

  // Optional: Prevent others from editing
  if (req.user.role !== "admin" && event.provider.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json(new ApiResponse(200, updatedEvent, "Event updated"));
});

/** @desc Delete Event */
export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new ApiError(404, "Event not found");

  if (req.user.role !== "admin" && event.provider.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  await Event.findByIdAndDelete(req.params.id);
  res.status(200).json(new ApiResponse(200, {}, "Event deleted successfully"));
});

/** @desc Auto-expire outdated events (call periodically or on load) */
export const expireOldEvents = asyncHandler(async (req, res) => {
  const today = new Date();

  const result = await Event.updateMany(
    { date: { $lt: today }, status: { $ne: "expired" } },
    { $set: { status: "expired" } }
  );

  res.status(200).json(new ApiResponse(200, result, `Expired ${result.modifiedCount} events`));
});
