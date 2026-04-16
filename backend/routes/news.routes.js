const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validation.middleware');

// PUBLIC ROUTES - Get all articles with pagination
router.get('/articles', newsController.getAllArticles);

// Get articles by category
router.get('/articles/category/:slug', newsController.getArticlesByCategory);

// Get single article by ID
router.get('/articles/:id', newsController.getArticleById);

// Get featured articles
router.get('/featured', newsController.getFeaturedArticles);

// Get trending articles
router.get('/trending', newsController.getTrendingArticles);

// Get all categories
router.get('/categories', newsController.getCategories);

// Search articles
router.get('/search', newsController.searchArticles);

// Get recent articles
router.get('/recent', newsController.getRecentArticles);

// PROTECTED ROUTES - Create new article (Editor & Admin only)
router.post('/articles', auth.protect, auth.authorize('editor', 'admin'), validate.validateArticle, newsController.createArticle);

// Update article (Editor & Admin only)
router.put('/articles/:id', auth.protect, auth.authorize('editor', 'admin'), validate.validateArticle, newsController.updateArticle);

// Delete article (Admin only)
router.delete('/articles/:id', auth.protect, auth.authorize('admin'), newsController.deleteArticle);

// Publish article (Editor & Admin only)
router.patch('/articles/:id/publish', auth.protect, auth.authorize('editor', 'admin'), newsController.publishArticle);

// Add article to featured (Admin only)
router.patch('/articles/:id/feature', auth.protect, auth.authorize('admin'), newsController.featureArticle);

module.exports = router;