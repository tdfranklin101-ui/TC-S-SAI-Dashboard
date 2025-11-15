import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db, solarAuditEntries, solarAuditCategories, solarAuditDataSources } from '@tcs-network/shared';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'sai-dashboard' });
});

app.get('/api/audit/entries', async (req, res) => {
  try {
    const entries = await db.select().from(solarAuditEntries).limit(100);
    res.json(entries);
  } catch (error) {
    console.error('Error fetching audit entries:', error);
    res.status(500).json({ error: 'Failed to fetch audit entries' });
  }
});

app.get('/api/audit/categories', async (req, res) => {
  try {
    const categories = await db.select().from(solarAuditCategories);
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/audit/sources', async (req, res) => {
  try {
    const sources = await db.select().from(solarAuditDataSources);
    res.json(sources);
  } catch (error) {
    console.error('Error fetching sources:', error);
    res.status(500).json({ error: 'Failed to fetch sources' });
  }
});

app.listen(PORT, () => {
  console.log(`SAI Dashboard API running on port ${PORT}`);
});
