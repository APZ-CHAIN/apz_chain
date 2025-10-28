const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const DOCS_PATH = path.join(__dirname, '../../../docs');
const PENDING_PATH = path.join(__dirname, '../../../docs_pending');
const { notifyTranslationStatus } = require('../notify/translationStatus');

router.get('/:lang/:slug', (req, res) => {
  const file = path.join(DOCS_PATH, req.params.lang, `${req.params.slug}.md`);
  if (!fs.existsSync(file)) return res.status(404).send('Not found');
  res.send(fs.readFileSync(file, 'utf8'));
});

router.get('/:lang/:slug/pending', (req, res) => {
  const file = path.join(PENDING_PATH, req.params.lang, `${req.params.slug}.md`);
  if (!fs.existsSync(file)) return res.status(404).send('Not found');
  res.send(fs.readFileSync(file, 'utf8'));
});

router.post('/:lang/:slug/pending', (req, res) => {
  const dir = path.join(PENDING_PATH, req.params.lang);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${req.params.slug}.md`), req.body.content);
  res.json({ success: true });
});

router.post('/:lang/:slug/approve', async (req, res) => {
  const { lang, slug } = req.params;
  const pending = path.join(PENDING_PATH, lang, `${slug}.md`);
  const final = path.join(DOCS_PATH, lang, `${slug}.md`);
  if (!fs.existsSync(pending)) return res.status(404).send('Not found');
  const content = fs.readFileSync(pending, 'utf8');
  fs.writeFileSync(final, content);
  fs.unlinkSync(pending);
  await notifyTranslationStatus({ lang, slug, status: 'approved', editor: req.body.editor || 'unknown' });
  res.json({ success: true });
});

router.post('/:lang/:slug/reject', async (req, res) => {
  const { lang, slug } = req.params;
  const pending = path.join(PENDING_PATH, lang, `${slug}.md`);
  if (fs.existsSync(pending)) fs.unlinkSync(pending);
  await notifyTranslationStatus({ lang, slug, status: 'rejected', editor: req.body.editor || 'unknown' });
  res.json({ success: true });
});

module.exports = router;