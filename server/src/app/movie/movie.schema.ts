import Joi from 'joi';

// Define the schema for creating new chapter
export const movieSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  description: Joi.string().min(10).max(500),
  year: Joi.string().required(),
  image: Joi.string().uri(),
});
