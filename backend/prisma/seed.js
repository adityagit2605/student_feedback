require("dotenv").config();
const { PrismaClient } = require("../generated/prisma");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...\n");

  // Clear existing data
  await prisma.feedback.deleteMany();
  await prisma.course.deleteMany();
  console.log("🗑️  Cleared existing data");

  // Create courses
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        courseName: "Introduction to Computer Science",
        description:
          "A comprehensive introduction to the fundamental concepts of computer science, including algorithms, data structures, and programming paradigms.",
        instructorName: "Dr. Sarah Johnson",
        credits: 4,
      },
    }),
    prisma.course.create({
      data: {
        courseName: "Data Structures and Algorithms",
        description:
          "In-depth study of data structures (trees, graphs, hash tables) and algorithm design techniques (divide and conquer, dynamic programming, greedy algorithms).",
        instructorName: "Prof. Michael Chen",
        credits: 3,
      },
    }),
    prisma.course.create({
      data: {
        courseName: "Web Development Fundamentals",
        description:
          "Learn to build modern web applications using HTML, CSS, JavaScript, and popular frameworks. Covers both frontend and backend development.",
        instructorName: "Dr. Emily Rodriguez",
        credits: 3,
      },
    }),
    prisma.course.create({
      data: {
        courseName: "Database Management Systems",
        description:
          "Study of relational database design, SQL, normalization, transaction processing, and introduction to NoSQL databases.",
        instructorName: "Prof. David Kim",
        credits: 3,
      },
    }),
    prisma.course.create({
      data: {
        courseName: "Machine Learning Basics",
        description:
          "Introduction to machine learning concepts including supervised and unsupervised learning, neural networks, and practical applications using Python.",
        instructorName: "Dr. Priya Patel",
        credits: 4,
      },
    }),
  ]);

  console.log(`✅ Created ${courses.length} courses`);

  // Create sample feedbacks
  const feedbackData = [
    // Feedback for "Introduction to Computer Science"
    { studentName: "Alex Thompson", rating: 5, comments: "Excellent course! Dr. Johnson explains complex concepts in a very approachable way. The hands-on projects were incredibly valuable.", courseId: courses[0].id },
    { studentName: "Maria Garcia", rating: 4, comments: "Great introduction to CS. The pace was good but I wish there were more practice problems. Overall, highly recommended for beginners.", courseId: courses[0].id },
    { studentName: "James Wilson", rating: 5, comments: "Best introductory course I've taken. The curriculum is well-structured and the assignments build on each other perfectly.", courseId: courses[0].id },
    { studentName: "Sophia Lee", rating: 3, comments: "Decent course but some topics felt rushed. The textbook was helpful though. Would benefit from more office hours.", courseId: courses[0].id },

    // Feedback for "Data Structures and Algorithms"
    { studentName: "Ryan Cooper", rating: 4, comments: "Challenging but rewarding. Prof. Chen is a brilliant teacher who makes complex algorithms understandable. The weekly coding challenges were great.", courseId: courses[1].id },
    { studentName: "Emma Davis", rating: 5, comments: "This course completely changed how I think about problem-solving. The competitive programming aspects were fun and motivating.", courseId: courses[1].id },
    { studentName: "Liam Brown", rating: 4, comments: "Very thorough coverage of DSA topics. The grading is fair and the TAs are very helpful. Prepare to spend a lot of time on assignments.", courseId: courses[1].id },

    // Feedback for "Web Development Fundamentals"
    { studentName: "Olivia Martinez", rating: 5, comments: "Amazing hands-on course! Dr. Rodriguez keeps the content current with industry trends. I built my portfolio site as the final project.", courseId: courses[2].id },
    { studentName: "Noah Taylor", rating: 4, comments: "Great practical course. Covers a lot of ground from HTML/CSS to React. Could use more backend depth but overall excellent.", courseId: courses[2].id },
    { studentName: "Isabella Anderson", rating: 5, comments: "This course gave me the confidence to start building real web apps. The code reviews and peer programming sessions were invaluable.", courseId: courses[2].id },
    { studentName: "Ethan Thomas", rating: 3, comments: "Good content but moves very fast. If you're a complete beginner, you might struggle. Having some prior coding experience helps a lot.", courseId: courses[2].id },
    { studentName: "Ava Jackson", rating: 4, comments: "Loved the project-based approach. Each week we built something new. The deployment section was particularly useful.", courseId: courses[2].id },

    // Feedback for "Database Management Systems"
    { studentName: "Lucas White", rating: 4, comments: "Prof. Kim is very knowledgeable. The course strikes a good balance between theory and practical SQL skills. The group project was challenging.", courseId: courses[3].id },
    { studentName: "Mia Harris", rating: 3, comments: "The SQL parts were great but the theoretical components (normalization, relational algebra) were dry. More real-world examples would help.", courseId: courses[3].id },

    // Feedback for "Machine Learning Basics"
    { studentName: "Benjamin Clark", rating: 5, comments: "Dr. Patel makes ML accessible to everyone. The Jupyter notebook assignments were excellent. Best course of my degree so far!", courseId: courses[4].id },
    { studentName: "Charlotte Lewis", rating: 4, comments: "Solid introduction to ML. Prerequisites of linear algebra and statistics are a must. The final project where we built a real model was amazing.", courseId: courses[4].id },
    { studentName: "Daniel Robinson", rating: 5, comments: "Incredible course! The mix of theory and hands-on implementation with scikit-learn and TensorFlow was perfect. Highly recommend!", courseId: courses[4].id },
  ];

  const feedbacks = await Promise.all(
    feedbackData.map((data) => prisma.feedback.create({ data }))
  );

  console.log(`✅ Created ${feedbacks.length} feedbacks\n`);

  // Print summary
  console.log("📊 Seed Summary:");
  console.log("─".repeat(50));
  for (const course of courses) {
    const count = feedbackData.filter((f) => f.courseId === course.id).length;
    const ratings = feedbackData
      .filter((f) => f.courseId === course.id)
      .map((f) => f.rating);
    const avg = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2);
    console.log(`  📘 ${course.courseName}: ${count} feedbacks (avg: ${avg}⭐)`);
  }
  console.log("─".repeat(50));
  console.log("\n✨ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
