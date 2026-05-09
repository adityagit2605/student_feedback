const prisma = require("../config/database");
const { AppError } = require("../middleware/errorHandler");

/**
 * @desc    Create a new course
 * @route   POST /api/courses
 */
async function createCourse(req, res) {
  const { courseName, description, instructorName, credits } = req.body;

  const course = await prisma.course.create({
    data: { courseName, description, instructorName, credits },
  });

  res.status(201).json({
    success: true,
    message: "Course created successfully",
    data: course,
  });
}

/**
 * @desc    Get all courses with optional search and pagination
 * @route   GET /api/courses
 * @query   page, limit, search, sortBy, order
 */
async function getAllCourses(req, res) {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
  const skip = (page - 1) * limit;
  const search = req.query.search || "";
  const sortBy = ["courseName", "instructorName", "credits", "createdAt"].includes(req.query.sortBy)
    ? req.query.sortBy
    : "createdAt";
  const order = req.query.order === "asc" ? "asc" : "desc";

  // Build search filter
  const where = search
    ? {
        OR: [
          { courseName: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { instructorName: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const [courses, totalCount] = await Promise.all([
    prisma.course.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: order },
      include: {
        _count: { select: { feedbacks: true } },
      },
    }),
    prisma.course.count({ where }),
  ]);

  // Calculate average rating for each course
  const coursesWithStats = await Promise.all(
    courses.map(async (course) => {
      const stats = await prisma.feedback.aggregate({
        where: { courseId: course.id },
        _avg: { rating: true },
        _count: { rating: true },
      });

      return {
        ...course,
        feedbackCount: course._count.feedbacks,
        averageRating: stats._avg.rating ? parseFloat(stats._avg.rating.toFixed(2)) : null,
        _count: undefined, // Remove the internal _count field
      };
    })
  );

  const totalPages = Math.ceil(totalCount / limit);

  res.json({
    success: true,
    data: coursesWithStats,
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
 * @desc    Get a single course by ID with its feedbacks
 * @route   GET /api/courses/:id
 */
async function getCourseById(req, res) {
  const id = parseInt(req.params.id);

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      feedbacks: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  // Calculate aggregated stats
  const stats = await prisma.feedback.aggregate({
    where: { courseId: id },
    _avg: { rating: true },
    _count: { rating: true },
    _min: { rating: true },
    _max: { rating: true },
  });

  // Rating distribution (1-5)
  const ratingDistribution = {};
  for (let i = 1; i <= 5; i++) {
    const count = await prisma.feedback.count({
      where: { courseId: id, rating: i },
    });
    ratingDistribution[i] = count;
  }

  res.json({
    success: true,
    data: {
      ...course,
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
 * @desc    Update a course (full update)
 * @route   PUT /api/courses/:id
 */
async function updateCourse(req, res) {
  const id = parseInt(req.params.id);
  const { courseName, description, instructorName, credits } = req.body;

  // Check if course exists
  const existing = await prisma.course.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError("Course not found", 404);
  }

  const course = await prisma.course.update({
    where: { id },
    data: { courseName, description, instructorName, credits },
  });

  res.json({
    success: true,
    message: "Course updated successfully",
    data: course,
  });
}

/**
 * @desc    Partially update a course
 * @route   PATCH /api/courses/:id
 */
async function patchCourse(req, res) {
  const id = parseInt(req.params.id);
  const updateData = {};

  // Only include fields that are provided
  const allowedFields = ["courseName", "description", "instructorName", "credits"];
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  }

  if (Object.keys(updateData).length === 0) {
    throw new AppError("No valid fields provided for update", 400);
  }

  // Check if course exists
  const existing = await prisma.course.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError("Course not found", 404);
  }

  const course = await prisma.course.update({
    where: { id },
    data: updateData,
  });

  res.json({
    success: true,
    message: "Course updated successfully",
    data: course,
  });
}

/**
 * @desc    Delete a course (cascades to feedbacks)
 * @route   DELETE /api/courses/:id
 */
async function deleteCourse(req, res) {
  const id = parseInt(req.params.id);

  // Check if course exists
  const existing = await prisma.course.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError("Course not found", 404);
  }

  await prisma.course.delete({ where: { id } });

  res.json({
    success: true,
    message: "Course and all associated feedbacks deleted successfully",
  });
}

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  patchCourse,
  deleteCourse,
};
