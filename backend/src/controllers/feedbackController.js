const prisma = require("../config/database");
const { AppError } = require("../middleware/errorHandler");

/**
 * @desc    Submit feedback for a course
 * @route   POST /api/feedback
 */
async function submitFeedback(req, res) {
  const { studentName, rating, comments, courseId } = req.body;

  // Verify the course exists
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    throw new AppError("Course not found. Cannot submit feedback for a non-existent course.", 404);
  }

  const feedback = await prisma.feedback.create({
    data: { studentName, rating, comments, courseId },
    include: {
      course: {
        select: { id: true, courseName: true },
      },
    },
  });

  res.status(201).json({
    success: true,
    message: "Feedback submitted successfully",
    data: feedback,
  });
}

/**
 * @desc    Get all feedback for a specific course
 * @route   GET /api/feedback/course/:id
 */
async function getFeedbackByCourse(req, res) {
  const courseId = parseInt(req.params.id);

  // Verify the course exists
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { id: true, courseName: true, instructorName: true },
  });

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  // Pagination
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
  const skip = (page - 1) * limit;

  // Optional rating filter
  const ratingFilter = req.query.rating ? { rating: parseInt(req.query.rating) } : {};

  // Sort order
  const sortBy = ["rating", "createdAt", "studentName"].includes(req.query.sortBy)
    ? req.query.sortBy
    : "createdAt";
  const order = req.query.order === "asc" ? "asc" : "desc";

  const where = { courseId, ...ratingFilter };

  const [feedbacks, totalCount] = await Promise.all([
    prisma.feedback.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: order },
    }),
    prisma.feedback.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  res.json({
    success: true,
    data: {
      course,
      feedbacks,
    },
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
}

/**
 * @desc    Get average rating for a specific course
 * @route   GET /api/feedback/course/:id/average
 */
async function getAverageRating(req, res) {
  const courseId = parseInt(req.params.id);

  // Verify the course exists
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { id: true, courseName: true, instructorName: true },
  });

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  const stats = await prisma.feedback.aggregate({
    where: { courseId },
    _avg: { rating: true },
    _count: { rating: true },
    _min: { rating: true },
    _max: { rating: true },
  });

  // Rating distribution
  const ratingDistribution = {};
  for (let i = 1; i <= 5; i++) {
    const count = await prisma.feedback.count({
      where: { courseId, rating: i },
    });
    ratingDistribution[i] = count;
  }

  res.json({
    success: true,
    data: {
      course,
      stats: {
        totalFeedbacks: stats._count.rating,
        averageRating: stats._avg.rating ? parseFloat(stats._avg.rating.toFixed(2)) : null,
        minRating: stats._min.rating,
        maxRating: stats._max.rating,
        ratingDistribution,
      },
    },
  });
}

/**
 * @desc    Get a single feedback by ID
 * @route   GET /api/feedback/:id
 */
async function getFeedbackById(req, res) {
  const id = parseInt(req.params.id);

  const feedback = await prisma.feedback.findUnique({
    where: { id },
    include: {
      course: {
        select: { id: true, courseName: true, instructorName: true },
      },
    },
  });

  if (!feedback) {
    throw new AppError("Feedback not found", 404);
  }

  res.json({
    success: true,
    data: feedback,
  });
}

/**
 * @desc    Delete a feedback by ID
 * @route   DELETE /api/feedback/:id
 */
async function deleteFeedback(req, res) {
  const id = parseInt(req.params.id);

  const existing = await prisma.feedback.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError("Feedback not found", 404);
  }

  await prisma.feedback.delete({ where: { id } });

  res.json({
    success: true,
    message: "Feedback deleted successfully",
  });
}

module.exports = {
  submitFeedback,
  getFeedbackByCourse,
  getAverageRating,
  getFeedbackById,
  deleteFeedback,
};
