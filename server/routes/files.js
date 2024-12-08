import express from 'express';
import { File } from '../models/File.js';
import { runCode } from '../services/codeRunner.js';

const router = express.Router();

// Get all files
router.get('/', async (req, res) => {
  try {
    const files = await File.find().sort({ updatedAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new file
router.post('/', async (req, res) => {
  const file = new File({
    name: req.body.name,
    content: req.body.content,
    language: req.body.language,
  });

  try {
    const newFile = await file.save();
    res.status(201).json(newFile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update file
router.patch('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    if (req.body.content) file.content = req.body.content;
    if (req.body.language) file.language = req.body.language;
    file.updatedAt = Date.now();

    const updatedFile = await file.save();
    res.json(updatedFile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete file
router.delete('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    await file.deleteOne();
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Run code
router.post('/:id/run', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    const output = await runCode(file.content, file.language);
    res.json({ output });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const fileRouter = router;