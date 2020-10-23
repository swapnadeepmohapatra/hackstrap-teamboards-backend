import express, { Router } from "express";
import { ObjectID } from "mongodb";
import { DB } from "../DB/DB";

const boardRouter = (db: DB): Router => {
  const router = express.Router();

  router.post("/add", async (req, res) => {
    let currentUser: any = req.header("user");

    if (!currentUser || !req.body.title) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        await db.insertBoard(
          "boards",
          {
            title: req.body.title,
            desc: "",
            author: currentUser.id,
            lists: [],
            members: [currentUser.id],
            project: new ObjectID(req.body.project),
          },
          "projects"
        );
        res.status(201).json({ message: "Board Added" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  router.get("/:projectId", async (req, res) => {
    let currentUser: any = req.header("user");
    const projectId: string = req.params.projectId;

    if (!currentUser || !projectId) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        const boards = await db.getBoards("boards", projectId);
        res.status(201).json(boards);
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  router.delete("/delete", async (req, res) => {
    let currentUser: any = req.header("user");

    if (!currentUser || !req.body.projectID || !req.body.boardID) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        await db.deleteBoard("boards", req.body.projectID, req.body.boardID);
        res.status(200).json({ message: "Board Deleted" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  router.patch("/add-user", async (req, res) => {
    let currentUser: any = req.header("user");
    const boardID: string = req.body.boardID;
    const projectID: string = req.body.projectID;
    const userID: string = req.body.userName;

    if (!currentUser || !boardID || !projectID || !userID) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        await db.addUserToBoard(boardID, projectID, userID);
        res.status(200).json({ message: "Board Deleted" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  router.patch("/delete-user", async (req, res) => {
    let currentUser: any = req.header("user");
    const boardID: string = req.body.boardID;
    const projectID: string = req.body.projectID;
    const userID: string = req.body.userName;

    if (!currentUser || !boardID || !projectID || !userID) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        await db.deleteUserFromBoard(boardID, projectID, userID);
        res.status(200).json({ message: "Board Deleted" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  return router;
};

export default boardRouter;
