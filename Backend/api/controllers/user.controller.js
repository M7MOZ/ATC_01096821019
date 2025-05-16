import User from '../models/user.model.js';

export const saveEvent = async (req, res) => {
    const { userId, eventId } = req.body;

    try {
        const user = await User.findById(userId);
        user.savedEvents.push(eventId);
        await user.save();

        res.status(200).json({ message: "Event saved successfully", savedEvents: user.savedEvents });
    } catch (err) {
        res.status(500).json({ message: "Error saving event", error: err.message });
    }
};

export const bookEvent = async (req, res) => {
    const { userId, eventId } = req.body;

    try {
        const user = await User.findById(userId);
        user.reservedEvents.push(eventId);
        await user.save();

        res.status(200).json({ message: "Event booked successfully", reservedEvents: user.reservedEvents });
    } catch (err) {
        res.status(500).json({ message: "Error booking event", error: err.message });
    }
};
