/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management and authentication
 *   - name: Activities
 *     description: Activities and system logs
 *   - name: Academic Years
 *     description: Academic year management
 *   - name: Classes
 *     description: Class management
 *   - name: Subjects
 *     description: Subject management
 *   - name: Timetables
 *     description: Timetable management
 *   - name: Exams
 *     description: Exam management
 *   - name: Dashboard
 *     description: Dashboard statistics
 *   - name: Attendance
 *     description: Attendance management
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Logout successful
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/users/update/{id}:
 *   patch:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */


/**
 * @swagger
 * /api/activities:
 *   get:
 *     summary: Get all activities
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Activities retrieved successfully
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/academic-years:
 *   get:
 *     summary: Get all academic years
 *     tags: [Academic Years]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Academic years retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/academic-years/create:
 *   post:
 *     summary: Create an academic year
 *     tags: [Academic Years]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Academic year created successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/academic-years/current:
 *   get:
 *     summary: Get current academic year
 *     tags: [Academic Years]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current academic year retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/academic-years/update/{id}:
 *   patch:
 *     summary: Update an academic year
 *     tags: [Academic Years]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Academic year updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Academic year not found
 */

/**
 * @swagger
 * /api/academic-years/delete/{id}:
 *   delete:
 *     summary: Delete an academic year
 *     tags: [Academic Years]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Academic year deleted successfully
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Classes retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/classes/create:
 *   post:
 *     summary: Create a class
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Class created successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/classes/update/{id}:
 *   patch:
 *     summary: Update a class
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Class not found
 */

/**
 * @swagger
 * /api/classes/delete/{id}:
 *   delete:
 *     summary: Delete a class
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/subjects:
 *   get:
 *     summary: Get all subjects
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subjects retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/subjects/create:
 *   post:
 *     summary: Create a subject
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Subject created successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/subjects/update/{id}:
 *   patch:
 *     summary: Update a subject
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/subjects/delete/{id}:
 *   delete:
 *     summary: Delete a subject
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subject deleted successfully
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/timetables/generate:
 *   post:
 *     summary: Generate timetable
 *     tags: [Timetables]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Timetable generated successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/timetables/{classId}:
 *   get:
 *     summary: Get timetable for a class
 *     tags: [Timetables]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Timetable retrieved successfully
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/exams:
 *   get:
 *     summary: Get all exams
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Exams retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/exams/{id}:
 *   get:
 *     summary: Get an exam by ID
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Exam retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Exam not found
 */

/**
 * @swagger
 * /api/exams/{id}/result:
 *   get:
 *     summary: Get exam result
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Exam result retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/exams/{id}/status:
 *   patch:
 *     summary: Toggle exam status
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Exam status updated successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/exams/{id}/submit:
 *   post:
 *     summary: Submit an exam
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Exam submitted successfully
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/attendance:
 *   post:
 *     summary: Mark attendance
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Attendance marked successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/attendance/class/{class}:
 *   get:
 *     summary: Get class attendance
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: class
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class attendance retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/attendance/student/{student}:
 *   get:
 *     summary: Get student attendance
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: student
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student attendance retrieved successfully
 *       401:
 *         description: Unauthorized
 */
