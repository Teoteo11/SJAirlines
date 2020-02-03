import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(logResponseTime);

function logResponseTime(req: Request, res: Response, next: NextFunction) {
  const startHrTime = process.hrtime();

  res.on("finish", () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    console.log("ℹ️ Path: %s - req elapsed time in ms: %fms", req.path, elapsedTimeInMs);
  });

  next();
}

router.post("/", async(req: Request, res: Response) =>{
  res.status(200).json({ message: "JSON received." });
});

export = router;