import express from 'express';
import { projectOwnership } from '../middlewares/onership.middleware.js';
import { closeProject, createProject, deleteProject, getOwnerProjects, updateProject } from '../controllers/project.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';



const router = express.Router();
router.use(authMiddleware);

/**
 * @swagger
 * /api/projects/:
 *   post:
 *     summary: Create a new Project
 *     tags: [Owner]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - capital
 *             properties:
 *               title:
 *                 type: string
 *                 example: Project_test
 *               description:
 *                 type: string
 *                 example: hello on your test Project
 *               capital:
 *                 type: number
 *                 example: 200000
 *     responses:
 *       201:
 *         description: User project is created
 *       403:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post('/', createProject)

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update a project
 *     tags: [Owner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *           example: 665f1c2a8b7d3e0012345678
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Project Title
 *               description:
 *                 type: string
 *                 example: This is the updated description for the project.
 *               capital:
 *                 type: number
 *                 example: 300000
 *               status:
 *                 type: string
 *                 enum: [open, closed]
 *                 example: open
 *               maxInvestmentPercentage:
 *                 type: number
 *                 example: 40
 *               initialInvestment:
 *                 type: number
 *                 example: 10000
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Validation error or bad request
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - user does not own this project
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 *
 *   patch:
 *     summary: Close a project
 *     tags: [Owner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *           example: 665f1c2a8b7d3e0012345678
 *     responses:
 *       200:
 *         description: Project closed successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - user does not own this project
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a project
 *     tags: [Owner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *           example: 665f1c2a8b7d3e0012345678
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - user does not own this project
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 *
 * /api/projects/my-projects:
 *   get:
 *     summary: Get all projects owned by the logged-in user
 *     tags: [Owner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of owner's projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 665f1c2a8b7d3e0012345678
 *                   title:
 *                     type: string
 *                     example: Project_test
 *                   description:
 *                     type: string
 *                     example: hello on your test Project
 *                   capital:
 *                     type: number
 *                     example: 200000
 *                   status:
 *                     type: string
 *                     enum: [open, closed]
 *                     example: open
 *                   ownerId:
 *                     type: string
 *                     example: 665f1b8a8b7d3e0012345671
 *                   maxInvestmentPercentage:
 *                     type: number
 *                     example: 50
 *                   initialInvestment:
 *                     type: number
 *                     example: 0
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-04-01T10:30:00.000Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-04-01T12:00:00.000Z
 *       401:
 *         description: No token provided or unauthorized
 *       500:
 *         description: Internal server error
 */
router
   .get('/my-projects', getOwnerProjects)
   .put('/:id', projectOwnership, updateProject)
   .patch('/:id', projectOwnership, closeProject)
   .delete('/:id', projectOwnership, deleteProject)


export default router