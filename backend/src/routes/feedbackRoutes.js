const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const { asyncHandler } = require("../middleware/errorHandler");
const {
  feedbackValidationRules,
  idParamValidator,
  handleValidationErrors,
} = require("../middleware/validators");

/**
 * Feedback Routes
 *
 * POST   /api/feedback                    - Submit feedback for a course
 * GET    /api/feedback/course/:id         - Get all feedback for a specific course
 * GET    /api/feedback/course/:id/average - Get average rating for a course
 * GET    /api/feedback/:id                - Get a single feedback by ID
 * DELETE /api/feedback/:id                - Delete a feedback
 */

router.post(
  "/",
  feedbackValidationRules,
  handleValidationErrors,
  asyncHandler(feedbackController.submitFeedback)
);

router.get(
  "/course/:id",
  idParamValidator,
  handleValidationErrors,
  asyncHandler(feedbackController.getFeedbackByCourse)
);

router.get(
  "/course/:id/average",
  idParamValidator,
  handleValidationErrors,
  asyncHandler(feedbackController.getAverageRating)
);

router.get(
  "/:id",
  idParamValidator,
  handleValidationErrors,
  asyncHandler(feedbackController.getFeedbackById)
);

router.delete(
  "/:id",
  idParamValidator,
  handleValidationErrors,
  asyncHandler(feedbackController.deleteFeedback)
);

module.exports = router;
