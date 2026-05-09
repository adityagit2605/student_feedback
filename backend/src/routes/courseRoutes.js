const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { asyncHandler } = require("../middleware/errorHandler");
const {
  courseValidationRules,
  courseUpdateValidationRules,
  idParamValidator,
  handleValidationErrors,
} = require("../middleware/validators");

/**
 * Course Routes
 *
 * GET    /api/courses          - Get all courses (paginated, searchable, sortable)
 * POST   /api/courses          - Create a new course
 * GET    /api/courses/:id      - Get a single course with feedbacks and stats
 * PUT    /api/courses/:id      - Full update of a course
 * PATCH  /api/courses/:id      - Partial update of a course
 * DELETE /api/courses/:id      - Delete a course and its feedbacks
 */

router
  .route("/")
  .get(asyncHandler(courseController.getAllCourses))
  .post(courseValidationRules, handleValidationErrors, asyncHandler(courseController.createCourse));

router
  .route("/:id")
  .get(idParamValidator, handleValidationErrors, asyncHandler(courseController.getCourseById))
  .put(
    idParamValidator,
    courseValidationRules,
    handleValidationErrors,
    asyncHandler(courseController.updateCourse)
  )
  .patch(
    idParamValidator,
    courseUpdateValidationRules,
    handleValidationErrors,
    asyncHandler(courseController.patchCourse)
  )
  .delete(idParamValidator, handleValidationErrors, asyncHandler(courseController.deleteCourse));

module.exports = router;
