const express = require("express");
var cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51LwFqzLIT8vyepKrwaNLwDJwvUDlx56QKFKbsRnMeaylxSEMIngv0jfZWNn2IbqZdYgfQZV85aVRQgB0ar07vt7f00UZDGj0YC"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  /**
   req.body.items
   [
    {
        id: 1,
        quantity: 3
    }
   ]

   stripe wants
   [
    {
        price: 1,
        quantity: 3
    }
   ]
   */
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel"
  });

  res.send(
    JSON.stringify({
      url: session.url
    })
  );
});

app.listen(4000, () => console.log("Listening on Port 4000!"));
