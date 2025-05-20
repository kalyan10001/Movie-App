export const FakeRoute = (req, res) => {
  res.status(404).json({ message: "Not Found" });
};

export const Error = (err, req, res) => {
  res.status(500).json({ message: err.message });
};