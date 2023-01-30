const submits = () =>{
    const articles = JSON.parse(localStorage.getItem("articles")) ?? []
    var title = document.getElementById('title').value;
    var body = document.getElementById('body').value;
    var tag = document.getElementById('tag').value;
     if (!title || !coverImage || !body || !tag || !img){
        return;
     }
     var newArticles = {
        id: articles.length,
        title: title,
        body: body,
        image: coverImage,
        tag: tag,
     };
     articles.unshift(newArticles)
     localStorage.setItem('articles', JSON.stringify(articles));
     document.getElementById('title').value = '',
     document.getElementById('body').value = '',
     document.getElementById('tag').value = '',
     document.getElementById('fileInput').value = ''
     alert('dats has been well inserted')
    console.log(body);
     return false
    };