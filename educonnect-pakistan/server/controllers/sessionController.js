const User = require('../models/User');
const Session = require('../models/Session');

exports.createSession = async (req, res) => {
    try {
        const { tutorId, student, date, time, duration, type, price } = req.body;
        console.log('📥 Incoming Booking Request:', req.body);

        // Check required fields
        if (!tutorId || !student || !date || !time || !duration || !type || !price) {
            console.warn('❌ Missing required fields');
            return res.status(400).json({ message: 'Missing required session fields.' });
        }

        const tutor = await User.findById(tutorId);
        if (!tutor) {
            console.warn('❌ Tutor not found');
            return res.status(404).json({ message: 'Tutor not found' });
        }

        // ⛔ Check teaching mode
        if (!tutor.teachingPreferences.includes(type)) {
            console.warn('❌ Invalid teaching mode');
            return res.status(400).json({ message: `Tutor does not offer ${type} sessions.` });
        }

        // 🕓 Check availability
        const requestedDay = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
        const availableSlot = tutor.availability?.find(
            slot => slot.day.toLowerCase() === requestedDay.toLowerCase()
        );
        console.log('🎯 Checking availability on', requestedDay, 'at', time);
        console.log('✅ Tutor Available Times:', availableSlot?.times);

        const normalizedTime = time.trim().toLowerCase();
        const isAvailable = availableSlot?.times?.some(
            t => t.trim().toLowerCase() === normalizedTime
        );

        if (!isAvailable) {
            console.warn('❌ Tutor not available at this time');
            return res.status(400).json({ message: `Tutor is not available on ${requestedDay} at ${time}.` });
        }

        // 🔁 Check for duplicates
        const existing = await Session.findOne({
            tutor: tutorId,
            date: new Date(date),
            time,
        });

        if (existing) {
            console.warn('❌ Duplicate session exists');
            return res.status(400).json({ message: 'This session slot is already booked.' });
        }

        const session = await Session.create({
            tutor: tutorId,
            student,
            date: new Date(date),
            time,
            duration,
            type,
            price,
            status: 'pending',
        });

        console.log('✅ Session created:', session);
        res.status(201).json(session);
    } catch (error) {
        console.error('🔥 Server error while creating session:', error);
        res.status(500).json({ message: 'Server error while creating session.' });
    }
};


exports.getSessionsByUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const role = req.query.role;

        const filter = role === 'tutor' ? { tutor: userId } : { student: userId };

        const sessions = await Session.find(filter).populate('tutor student');
        res.status(200).json(sessions);
    } catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({ message: 'Failed to fetch sessions.' });
    }
};

exports.updateSessionStatus = async (req, res) => {
    try {
        const { status, date, time, type } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'Status is required.' });
        }

        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ message: 'Session not found.' });
        }
        console.log("🧠 Session being updated:", session._id);
        console.log("🧠 New date/time:", new Date(date), time);
        // 🧠 Only validate on reschedule
        if (date && time) {
            console.log("🧠 Rescheduling for:", date, time, "type:", type);
            console.log("🧠 Found session:", session);
            console.log("🧠 Tutor ID from session:", session.tutor);
            const tutorId = session.tutor._id || session.tutor; // works for both Object or ID
            const tutor = await User.findById(tutorId);
            console.log("🧠 Found Tutor:", tutor);
            if (!tutor) {
                return res.status(404).json({ message: 'Tutor not found for reschedule.' });
            }

            const requestedDay = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
            const availableSlot = tutor.availability?.find(
                slot => slot.day.toLowerCase() === requestedDay.toLowerCase()
            );
            console.log("🗓️ Requested Day:", requestedDay);
            console.log("🕓 Available Slot for Day:", availableSlot);
            console.log("⏰ Time to Match:", time);
            const normalizedTime = time.trim().toLowerCase();
            const isAvailable = availableSlot?.times?.some(
                t => t.trim().toLowerCase() === normalizedTime
            );

            if (!isAvailable) {
                return res.status(400).json({ message: 'Tutor is not available at the selected reschedule slot.' });
            }

            // Optional: Validate teaching mode if passed
            const modeToCheck = type || session.type;

            if (!tutor.teachingPreferences.includes(modeToCheck)) {
                return res.status(400).json({ message: `Tutor does not offer ${modeToCheck} sessions.` });
            }

            session.type = modeToCheck; // always set the type

            // 🔐 Check if another session already exists at the new date/time
            const existing = await Session.findOne({
                tutor: session.tutor,
                date: new Date(date),
                time,
                _id: { $ne: session._id }, // Exclude current session
                status: { $in: ['pending', 'accepted'] }, // ❗ only active conflicts
            });

            if (existing) {
                return res.status(400).json({ message: 'Another session already exists at this time.' });
            }

            session.date = new Date(date);
            session.time = time;
            if (type) session.type = type;
        }

        session.status = status;
        await session.save();

        res.status(200).json(session);
    } catch (error) {
        console.error('❌ Error updating session:', error.message);
        console.error(error.stack);
        res.status(500).json({ message: 'Failed to update session.', error: error.message });
      }      
};



exports.deleteSession = async (req, res) => {
    try {
        const session = await Session.findByIdAndDelete(req.params.id);
        if (!session) return res.status(404).json({ message: 'Session not found.' });

        res.status(200).json({ message: 'Session deleted successfully.' });
    } catch (error) {
        console.error('Error deleting session:', error);
        res.status(500).json({ message: 'Failed to delete session.' });
    }
};