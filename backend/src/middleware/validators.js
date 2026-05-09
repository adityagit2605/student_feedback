const { body, param, validationResult } = require("express-validator");

/**
 * Middleware to check validation results and return errors
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Validation failed",
        details: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
          value: err.value,
        })),
      },
    });
  }
  next();
}

/**
 * Validation rules for course creation and update
 */
const courseValidationRules = [
  body("courseName")
    .trim()
    .notEmpty()
    .withMessage("Course name is required")
    .isLength({ max: 200 })
    .withMessage("Course name must be at most 200 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 2000 })
    .withMessage("Description must be at most 2000 characters"),

  body("instructorName")
    .trim()
    .notEmpty()
    .withMessage("Instructor name is required")
    .isLength({ max: 100 })
    .withMessage("Instructor name must be at most 100 characters"),

  body("credits")
    .isInt({ min: 1, max: 10 })
    .withMessage("Credits must be an integer between 1 and 10"),
];

/**
 * Validation rules for partial course updates (PATCH)
 */
const courseUpdateValidationRules = [
  body("courseName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Course name cannot be empty")
    .isLength({ max: 200 })
    .withMessage("Course name must be at most 200 characters"),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isLength({ max: 2000 })
    .withMessage("Description must be at most 2000 characters"),

  body("instructorName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Instructor name cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Instructor name must be at most 100 characters"),

  body("credits")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("Credits must be an integer between 1 and 10"),
];

/**
 * Validation rules for feedback submission
 */
const feedbackValidationRules = [
  body("studentName")
    .trim()
    .notEmpty()
    .withMessage("Student name is required")
    .isLength({ max: 100 })
    .withMessage("Student name must be at most 100 characters"),

  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),

  body("comments")
    .trim()
    .notEmpty()
    .withMessage("Comments are required")
    .isLength({ max: 2000 })
    .withMessage("Comments must be at most 2000 characters"),

  body("courseId")
    .isInt({ min: 1 })
    .withMessage("Course ID must be a positive integer"),
];

/**
 * Validate that :id param is a positive integer
 */
const idParamValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("ID must be a positive integer"),
];

module.exports = {
  handleValidationErrors,
  courseValidationRules,
  courseUpdateValidationRules,
  feedbackValidationRules,
  idParamValidator,
};
