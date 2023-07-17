const notFound = (req , res ,next) => {
    const eror = new Error("Not Found")
    res.status(404)
    next(eror)
}