import { Response, Request } from 'express'
import db from '../../models'

export const sample = async (req: Request, res: Response) => {
    try {
        const sampleData = {
            message: 'This is a sample API response',
            timestamp: new Date()
        };
        res.json(sampleData);
    } catch (error) {
        console.log(error);
        res.send("something went wrong")
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await db.User.create({
            firstName: "tejas",
            lastNAme: 'kumar'
        })
        return res.status(200).json({ message: 'Success', data: user });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Something went wrong' });

    }
}

export const getUSers = async (req: Request, res: Response) => {
    try {
        const users = await db.User.findAll()
        return res.status(200).json({ message: 'Success', data: users });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Something went wrong' });

    }
}

export const editUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const user = await db.User.findOne({
            where: { id: id }
        });
        if (user) {
            await user.update({
                firstName: "Tejaskumar",
                lastName: 'S'
            });

            return res.status(200).json({ message: 'Success', data: user });
        } else {
            return res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
