import express, { Router } from "express";
import { ObjectId } from "mongodb";
import { DB } from "../DB/DB";

/**
 * Returns route configuration for /database/mails Route
 * @param db
 */
const projectRouter = (db: DB): Router => {
  const router = express.Router();

  router.post("/add", async (req, res) => {
    let currentUser: any = req.header("user");

    if (!currentUser || !req.body.title) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        await db.insertProject("projects", {
          title: req.body.title,
          desc: req.body.desc,
          boards: [],
          author: currentUser.id,
          members: [currentUser.id],
        });
        res.status(201).json({ message: "Project Added" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  router.get("/", async (req, res) => {
    let currentUser: any = req.header("user");

    if (!currentUser) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        const projects = await db.getProjects("projects", currentUser.id);
        res.status(201).json(projects);
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  router.delete("/delete", async (req, res) => {
    let currentUser: any = req.header("user");

    if (!currentUser || !req.body.projectID) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        await db.deleteProject("projects", req.body.projectID);
        res.status(200).json({ message: "Project Deleted" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  router.patch("/edit", async (req, res) => {
    let currentUser: any = req.header("user");

    if (!currentUser || !req.body.projectTitle || !req.body.projectID) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        await db.editProject(
          "projects",
          req.body.projectID,
          req.body.projectTitle
        );
        res.status(200).json({ message: "Project Edited" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  return router;
};

export default projectRouter;
