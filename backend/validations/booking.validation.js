import Joi from "joi";

export const createBookingSchema = Joi.object({
  bookingType: Joi.string()
    .valid("package", "hotel", "flight", "bus", "custom")
    .required(),

  customerId: Joi.string().required(),

  travellers: Joi.array().items(Joi.string()).min(1).required(),

  tripId: Joi.when("bookingType", {
    is: "custom",
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),

  customDetails: Joi.when("bookingType", {
    is: "custom",
    then: Joi.object({
      destination: Joi.string().required(),
      numberOfDays: Joi.number().required(),
      numberOfNights: Joi.number().optional(),
      budgetRange: Joi.object({
        min: Joi.number().required(),
        max: Joi.number().required(),
      }).required(),
    }).required(),
    otherwise: Joi.optional(),
  }),

  departureDate: Joi.date().required(),
  totalAmount: Joi.number().required(),
});
