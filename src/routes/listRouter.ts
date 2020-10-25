import express, { Router } from "express";
import { ObjectID } from "mongodb";
import { DB } from "../DB/DB";

const listRouter = (db: DB): Router => {
  const router = express.Router();

  router.post("/add", async (req, res) => {
    let currentUser: any = req.header("user");

    if (!currentUser || !req.body.title || !req.body.board) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        await db.insert(
          "lists",
          {
            title: req.body.title,
            cards: [],
            board: new ObjectID(req.body.board),
          },
          "boards",
          {
            _id: new ObjectID(req.body.board),
          }
        );
        res.status(201).json({ message: "List Added" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  router.get("/:listId", async (req, res) => {
    let currentUser: any = req.header("user");
    const listId: string = req.params.listId;

    if (!currentUser || !listId) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        const lists = await db.getLists("lists", listId);
        res.status(200).json(lists.lists);
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  router.patch("/edit", async (req, res) => {
    let currentUser: any = req.header("user");
    const listId: string = req.body.listId;
    const listTitle: string = req.body.listTitle;

    if (!currentUser || !listId || !listTitle) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        await db.editListTitle("lists", listId, listTitle);
        res.status(201).json({ message: "List Edited" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  router.delete("/delete", async (req, res) => {
    let currentUser: any = req.header("user");

    if (!currentUser || !req.body.boardID || !req.body.listID) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        await db.deleteList("lists", req.body.boardID, req.body.listID);
        res.status(200).json({ message: "List Deleted" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  return router;
};

export default listRouter;
