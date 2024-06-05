import express, { Request, Response } from 'express';
const app = express();
const port = 3000;

app.get("/typescript", (req: Request, res: Response) => {
    res.send("Hello TypeScript");
})

app.get("/javascript", (req: Request, res: Response) => {
    res.send("Hello JavaScript")
})

app.listen(port, () => { console.log(`App listening at http://localhost:${port}`)})