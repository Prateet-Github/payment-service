import autocannon from "autocannon";
import env from "../config/env.js";

const instance = autocannon({
  url: "http://localhost:5001/api/payment/create",
  connections: 50,
  duration: 20,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Cookie: `token=${env.TOKEN}`,
  },
  setupClient: (client) => {
    client.setHeaders({
      "Idempotency-Key": `key-${Math.random()}`,
    });
  },
  body: JSON.stringify({ amount: 50000 }),
});

autocannon.track(instance);
