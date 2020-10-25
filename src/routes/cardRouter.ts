import express, { Router } from "express";
import { ObjectID } from "mongodb";
import { DB } from "../DB/DB";

const cardRouter = (db: DB): Router => {
  const router = express.Router();

  router.post("/add", async (req, res) => {
    let currentUser: any = req.header("user");

    if (!currentUser || !req.body.text || !req.body.list) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        await db.insert(
          "cards",
          {
            text: req.body.text,
            list: new ObjectID(req.body.list),
          },
          "lists",
          {
            _id: new ObjectID(req.body.list),
          }
        );
        res.status(201).json({ message: "Card Added" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  router.patch("/edit-text", async (req, res) => {
    let currentUser: any = req.header("user");
    const cardId: string = req.body.cardID;
    const cardText: string = req.body.cardText;

    if (!currentUser || !cardId || !cardText) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        await db.editCardText("cards", cardId, cardText);
        res.status(201).json({ message: "Card Edited" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  router.patch("/edit-date", async (req, res) => {
    let currentUser: any = req.header("user");
    const cardId: string = req.body.cardID;
    const dueDate: Date = req.body.dueDate;

    if (!currentUser || !cardId || !dueDate) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        await db.editCardDate("cards", cardId, dueDate);
        res.status(201).json({ message: "Card Edited" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  router.patch("/edit-priority", async (req, res) => {
    let currentUser: any = req.header("user");
    const cardId: string = req.body.cardID;
    const priority: Number = req.body.priority;

    if (!currentUser || !cardId || !priority) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        await db.editCardPriority("cards", cardId, priority);
        res.status(201).json({ message: "Card Edited" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  router.delete("/delete", async (req, res) => {
    let currentUser: any = req.header("user");
    const cardId: string = req.body.cardID;
    const listId: string = req.body.listID;

    if (!currentUser || !cardId || !listId) {
      res.status(400).json({ err: "Invalid request" });
    } else {
      currentUser = JSON.parse(currentUser);
      try {
        // await db.deleteCard("cards", cardId, listId);
        await db.delete("cards", cardId, "lists", listId);
        res.status(200).json({ message: "Card Deleted" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
      }
    }
  });

  return router;
};

export default cardRouter;
