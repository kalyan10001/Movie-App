import amqp from "amqplib";

export const sendToQueue = async (movieData) => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const queue = "movies_queue";

  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(movieData)), { persistent: true });
  console.log("✔ Movie queued");
};
