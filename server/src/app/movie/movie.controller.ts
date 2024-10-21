import { Request, Response } from 'express';
import { prisma } from '../../utils/configs';

export const getMovie = async (req: Request, res: Response) => {
  const { id } = req.query;
  console.log('id:', id);
  try {
    const resp = await prisma.movies.findUnique({
      where: {
        id: id as string,
      },
    });
    console.log('resp:', resp);
    return res.status(200).send(resp);
  } catch (error) {
    console.log('Error in getMovie:', error);
    return res.status(500).send('Internal server error');
  }
};

export const getAllMovie = async (req: Request, res: Response) => {
  try {
    const resp = await prisma.movies.findMany();

    return res.status(200).send(resp);
  } catch (error) {
    console.log('Error in getAllMovie:', error);
    res.status(500).send('Internal server error');
  }
};

export const createMovie = async (req: Request, res: Response) => {
  const { title, description, year, image } = req.body;

  try {
    const resp = await prisma.movies.create({
      data: {
        title,
        description,
        year,
        image,
      },
    });
    return res.status(201).send(resp);
  } catch (error) {
    console.log('Error in createMovie:', error);
    return res.status(500).send('Internal server error');
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  const { title, description, year, image } = req.body;
  const { id } = req.query;
  console.log('req.body:', req.body);

  try {
    const resp = await prisma.movies.update({
      where: {
        id: id as string,
      },
      data: {
        title,
        description,
        year,
        image,
      },
    });
    return res.status(203).send(resp);
  } catch (error) {
    console.log('Error in updateMovie:', error);
    res.status(500).send('Internal server error');
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const resp = await prisma.movies.delete({
      where: {
        id: id as string,
      },
    });
    return res.status(203).send(resp);
  } catch (error) {
    console.log('Error in deleteMovie:', error);
    res.status(500).send('Internal server error');
  }
};

// delete many Movies
export const deleteManyMovie = async (req: Request, res: Response) => {
  const { ids } = req.body;
  try {
    const resp = await prisma.movies.deleteMany({
      where: {
        id: { in: ids },
      },
    });
    return res.status(203).send(resp);
  } catch (error) {
    console.log('Error in deleteMovie:', error);
    return res.status(500).send({ error });
  }
};

export const deleteAllMovie = async (req: Request, res: Response) => {
  try {
    const resp = await prisma.movies.deleteMany({});
    return res.status(203).send(resp);
  } catch (error) {
    console.log('Error in deleteMovie:', error);
    res.status(500).send('Internal server error');
  }
};
