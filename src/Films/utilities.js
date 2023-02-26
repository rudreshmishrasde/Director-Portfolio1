export const getBestRatedFilm = (films) => {
    let bestRatedFilm = { rating: 0 }
    films.forEach((film) => {
        if (film?.rating > bestRatedFilm?.rating)
            bestRatedFilm = { ...film }
    })
    return bestRatedFilm?.name
}

export const getLongestFilmDuration = (films) => {
    let longestFilm = { length: 0 }
    films.forEach((film) => {
        if (film.length > longestFilm.length)
            longestFilm = { ...film }
    })
    return `${longestFilm.length} minutes`
}
export const getAvgRating = (films) => {
    let avgRating = 0
    films.forEach((film) => {
        avgRating += film.rating
    })
    const result = avgRating / films.length
    const resultArray = String(result).split(".")
    return resultArray[0]+"." +resultArray[1].slice(0,2)
}
export const getShortestDays = (films) => {
    const dateObjectArray = []
    films.forEach((film) => {
        const formattedDate = createDateObject(film?.releaseDate)
        dateObjectArray.push({ ...film, releaseDate: formattedDate })
    })
    const sortedArray = dateObjectArray.sort((a, b) => {
        return a.releaseDate - b.releaseDate
    })
    let minDifference = 100000000000000
    
    for (let i = 0; i < sortedArray.length - 1; i++) {
        let tempTime = sortedArray[i + 1].releaseDate.getTime() - sortedArray[i].releaseDate.getTime()
        tempTime = tempTime / (1000 * 60 * 60 * 24)
        if (minDifference > tempTime) {
            minDifference = tempTime
        }
    }
    return String(minDifference)
}
export const createDateObject = (date) => {
    const dateObject = new Date(`${date} GMT`)
    return dateObject
}
