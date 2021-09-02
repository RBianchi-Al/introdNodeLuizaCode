import app from './';


if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")))
}

const PORT = process.env.PORT || 3000


app.listen(PORT, console.log("Server is running 🚀"));
