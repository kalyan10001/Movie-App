import amqp from "amqplib";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Movie from "../models/movie.schema.js";

dotenv.config();

export const startWorker = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const conn = await amqp.connect("amqp://localhost");
  const channel = await conn.createChannel();
  const queue = "movies_queue";

  await channel.assertQueue(queue, { durable: true });
  console.log("🎧 Listening for messages...");

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const movieData = JSON.parse(msg.content.toString());
      await Movie.create(movieData);
      console.log("📥 Inserted movie:", movieData.title);
      channel.ack(msg);
    }
  });
};

startWorker().catch(console.error);
