import axios from 'axios'

export default async (req, res) => {
    const { query } = req.query
    const { data } = await axios.get(
        `https://github.com/erik-sytnyk/movies-list/blob/master/db.json`
    ).then(res => res.data)
    const filteredData = data.filter(item => {
        const { title, year, genre } = item
        const queryLowerCase = query.toLowerCase()
        const titleLowerCase = title.toLowerCase()
        const genreLowerCase = genre.toLowerCase()
        return (
            titleLowerCase.includes(queryLowerCase) ||
            genreLowerCase.includes(queryLowerCase) ||
            year.includes(query)
        )
    })
    console.log(data);
    res.status(200).json(data)
}
