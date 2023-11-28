async function tat(req, res) {
    try {
        const { categorycodes } = req.query;
        if(!categorycodes) {
            return res.status(400).json({ message: "Category codes required." });
        }
        const url = `https://tatapi.tourismthailand.org/tatapi/v5/places/search?keyword=${categorycodes}&categorycodes=${categorycodes}` // TAT API
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Accept-Language": "EN"
            }
        })
        .then(response => response.json())
        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error"})
    }
}

module.exports = tat;