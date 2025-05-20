export const FakeRoute = (req, res, next) => {
  res.status(404).json({ message: "Not Found" });
};

export const Error = (err, req, res, next) => {
  res.status(500).json({ message: err.message });
};
