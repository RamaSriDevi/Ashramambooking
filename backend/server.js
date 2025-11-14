app.post("/records", (req, res) => {
  const { firstName, middleName, lastName, location, phone } = req.body;

  const sql = `
    INSERT INTO records (firstName, middleName, lastName, location, phone)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [firstName, middleName, lastName, location, phone], (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }
    res.json({ message: "Record added successfully" });
  });
});
