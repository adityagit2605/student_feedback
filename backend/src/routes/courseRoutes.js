const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { asyncHandler } = require("../middleware/errorHandler");
const { protect, authorize } = require("../middleware/auth");
const {
  courseValidationRules,
  courseUpdateValidationRules,
  idParamValidator,
  handleValidationErrors,
} = require("../middleware/validators");

/**
 * Course Routes
 *
 * GET    /api/courses          - Get all courses (public, paginated, searchable, sortable)
 * POST   /api/courses          - Create a new course (auth required)
 * GET    /api/courses/:id      - Get a single course with feedbacks and stats (public)
 * PUT    /api/courses/:id      - Full update of a course (admin only)
 * PATCH  /api/courses/:id      - Partial update of a course (admin only)
 * DELETE /api/courses/:id      - Delete a course and its feedbacks (admin only)
 */

router
  .route("/")
  .get(asyncHandler(courseController.getAllCourses))
  .post(
    protect,
    courseValidationRules,
    handleValidationErrors,
    asyncHandler(courseController.createCourse)
  );

router
  .route("/:id")
  .get(idParamValidator, handleValidationErrors, asyncHandler(courseController.getCourseById))
  .put(
    protect,
    authorize("admin"),
    idParamValidator,
    courseValidationRules,
    handleValidationErrors,
    asyncHandler(courseController.updateCourse)
  )
  .patch(
    protect,
    authorize("admin"),
    idParamValidator,
    courseUpdateValidationRules,
    handleValidationErrors,
    asyncHandler(courseController.patchCourse)
  )
  .delete(
    protect,
    authorize("admin"),
    idParamValidator,
    handleValidationErrors,
    asyncHandler(courseController.deleteCourse)
  );

module.exports = router;
