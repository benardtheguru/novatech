import mongoose from 'mongoose';

// createTest will save submitted text/data into different databases depending on user role
export const createTest = async (req, res) => {
    try {
        const userId = req.userId;
        const role = req.userRole || 'user';
        // accept flexible payload: prefer `text` field, fall back to doctorNote or testName
        const { text, testName, result, doctorNote } = req.body;
        const content = text ?? doctorNote ?? testName ?? '';

        // pick database name based on role
        const dbName = role === 'admin' ? 'admin_strings' : 'user_strings';

        // define schema for saved entries
        const entrySchema = new mongoose.Schema({
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            content: { type: String, required: true },
            result: { type: Number },
            createdAt: { type: Date, default: Date.now }
        }, { timestamps: true });

        // get connection for target database (use cache)
        const conn = mongoose.connection.useDb(dbName, { useCache: true });

        // create/get model on that connection
        const Entry = conn.models.Entry || conn.model('Entry', entrySchema, 'entries');

        const newEntry = new Entry({ userId, content, result });
        await newEntry.save();
        console.log(`Saved entry to ${dbName} for user ${userId}`);
        res.status(201).json(newEntry);
    } catch (error) {
        console.error('createTest error:', error);
        res.status(500).json({ msg: "Server error" });
    }
};

export const getUserTests = async (req, res) => {
    try{
        const userId = req.userId;
        const role = req.userRole || 'user';
        const dbName = role === 'admin' ? 'admin_strings' : 'user_strings';
        const conn = mongoose.connection.useDb(dbName, { useCache: true });
        const Entry = conn.models.Entry || conn.model('Entry', new mongoose.Schema({}, { strict: false }), 'entries');
        const tests = await Entry.find({ userId });
        res.json(tests);
    }catch (error){
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

export const deleteTest = async (req, res) => {
    try {
        const id = req.params.id;
        const role = req.userRole || 'user';
        const dbName = role === 'admin' ? 'admin_strings' : 'user_strings';
        const conn = mongoose.connection.useDb(dbName, { useCache: true });
        const Entry = conn.models.Entry || conn.model('Entry', new mongoose.Schema({}, { strict: false }), 'entries');
        const test = await Entry.findById(id);
        if (!test) return res.status(404).json({ msg: 'Test not found' });
        if (test.userId.toString() !== req.userId) return res.status(401).json({ msg: 'Unauthorized' });
        await test.remove();
        res.json({ msg: 'Test deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};