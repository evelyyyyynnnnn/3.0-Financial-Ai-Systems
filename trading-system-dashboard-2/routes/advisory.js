const express = require('express');
const router = express.Router();
const AdvisoryService = require('../services/AdvisoryService');

const advisoryService = new AdvisoryService();

/**
 * @route POST /api/advisory/generate
 * @desc Generate an investment commentary from a market-data snapshot.
 *       Migrated from the retired Investment Analysis Dashboard, whose only
 *       capability the Platform did not already cover.
 * @access Public
 */
router.post('/generate', async (req, res) => {
  try {
    const advice = await advisoryService.generateAdvice(req.body || {});
    res.json({ success: true, data: { advice } });
  } catch (error) {
    console.error('Advisory error:', error.message);
    const status = error.code === 'NO_API_KEY' ? 503 : 500;
    res.status(status).json({
      error: 'Failed to generate advice',
      message: error.message
    });
  }
});

/**
 * @route GET /api/advisory/portfolio-metrics/:riskLevel
 * @desc Reference risk/return profile for a named risk level.
 * @access Public
 */
router.get('/portfolio-metrics/:riskLevel', (req, res) => {
  const profile = advisoryService.getRiskProfile(req.params.riskLevel);
  if (!profile) {
    return res.status(400).json({
      error: 'Unknown risk level',
      message: `Expected one of: ${advisoryService.riskLevels().join(', ')}`
    });
  }
  res.json({ success: true, data: profile });
});

/**
 * @route GET /api/advisory/status
 * @desc Whether the advisory model is configured, so the UI can show why
 *       generation is unavailable instead of failing silently.
 * @access Public
 */
router.get('/status', (req, res) => {
  res.json({ success: true, data: advisoryService.status() });
});

module.exports = router;
