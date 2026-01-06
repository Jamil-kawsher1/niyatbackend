const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const PrayerLog = require('./models/PrayerLog');
const { Op } = require('sequelize');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// Associations
User.hasMany(PrayerLog, { foreignKey: 'userId' });
PrayerLog.belongsTo(User, { foreignKey: 'userId' });

// Sync Database
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Failed to sync database:', err);
});

app.get('/', (req, res) => {
  res.send('Niya Backend is running (Sequelize)');
});

// Get Prayer Logs Endpoint
app.get('/api/logs', require('./middleware/auth'), async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    const whereClause = { userId };

    if (startDate && endDate) {
      whereClause.date = {
        [Op.between]: [startDate, endDate]
      };
    }

    const logs = await PrayerLog.findAll({
      where: whereClause,
      order: [['date', 'ASC']]
    });

    res.json({ status: 'success', logs });
  } catch (error) {
    console.error('Get Logs Error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Sync Endpoint
app.post('/api/sync', require('./middleware/auth'), async (req, res) => {
  try {
    const { logs } = req.body;
    const userId = req.user.id;

    console.log(`Syncing ${logs.length} logs for user ${userId}`);

    const results = [];

    // Sync Settings if provided
    if (req.body.settings) {
      const { calculationMethod, coordinates, locationName } = req.body.settings;
      await User.update({
        calculationMethod,
        latitude: coordinates?.latitude,
        longitude: coordinates?.longitude,
        locationName
      }, {
        where: { id: userId }
      });
      console.log('User settings synced');
    }

    // Process logs
    for (const log of logs) {
      // Upsert logic for Sequelize
      const [record, created] = await PrayerLog.upsert({
        userId,
        date: log.date,
        fajr_status: log.fajr_status,
        dhuhr_status: log.dhuhr_status,
        asr_status: log.asr_status,
        maghrib_status: log.maghrib_status,
        isha_status: log.isha_status,
        tahajjud_status: log.tahajjud_status || 'NONE',
        ishrak_status: log.ishrak_status || 'NONE',
        duha_status: log.duha_status || 'NONE',
        awwabin_status: log.awwabin_status || 'NONE'
      });
      results.push(record);
    }

    res.json({ status: 'success', syncedAt: new Date() });
  } catch (error) {
    console.error('Sync Error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
