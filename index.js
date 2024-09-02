import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

const contentBlog = []  

app.get("/", (req, res) => {
    
    console.log("Content blog saat ini:", contentBlog)
    res.render("index.ejs", {
        IsiKonten: contentBlog.length,
       contentBlog:contentBlog
      

    })
})

app.get("/post", (req, res) => {
    res.render("post.ejs", {title: "Satrun LINE | Post"})
})

app.post("/submit", (req, res) => {

    const newPost = {
        judul: req.body['judul'],
        content: req.body['content']
    };

    contentBlog.push(newPost);
  
   console.log(contentBlog)

    res.redirect("/")
})


// Rute untuk menghapus elemen berdasarkan indeks
app.get('/delete/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < contentBlog.length) {
      contentBlog.splice(index, 1); // Menghapus elemen dari array
    }
    res.redirect('/'); // Redirect kembali ke halaman utama setelah penghapusan
  });

app.listen(port, (req, res) => {
    console.log(`Port Method: ${port}`)
});
