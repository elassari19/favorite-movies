import { Router } from 'express';
import {
  createMovie,
  deleteAllMovie,
  deleteMovie,
  deleteManyMovie,
  getAllMovie,
  getMovie,
  updateMovie,
} from './movie.controller';
import validateSchema from '../../middelwares/validateSchema';
import { movieSchema } from './movie.schema';

const router = Router();

/**
 * @swagger
 * /Movie:
 *   get:
 *     summary: Get a Movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.get('/', getMovie);

/**
 * @swagger
 * /Movie/all:
 *   get:
 *     summary: Get all Movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.get('/all', getAllMovie);

/**
 * @swagger
 * /Movie:
 *   post:
 *     summary: Create a new Movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieInput'
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.post('/', validateSchema(movieSchema), createMovie);

/**
 * @swagger
 * /Movie:
 *   put:
 *     summary: Update a Movie
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieInput'
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.put('/', validateSchema(movieSchema), updateMovie);

/**
 * @swagger
 * /Movie:
 *   delete:
 *     summary: Delete a Movie
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */
router.delete('/', deleteMovie);

/**
 * @swagger
 * /Movie/many:
 *   delete:
 *     summary: Delete many Movies
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: array
 *          items:
 *            type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */ router.delete('/many', deleteManyMovie);

/**
 * @swagger
 * /Movie/all:
 *   delete:
 *     summary: Delete all Movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.delete('/all', deleteAllMovie);

export default router;
