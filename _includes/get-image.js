// this script will automatically get image from URL
var getImage = function () {
    var queryString = document.location.search.split("+").join(" ");
    var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(queryString)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    if (params.img == undefined) {
        // no value in the query string
        // here you have to manage this use case : redirect or print a message to user
    } else {
        var image = document.getElementById('image');
        image.src = "assets/art/" + params.img;
        image.alt = params.img;

        var title = document.getElementById('page-title');
        var image_title = getTitleFromFileName(params.img);
        title.innerHTML = image_title.italics();
        document.title = document.title.replace("image", image_title);
    }
} ();

function getTitleFromFileName(fileName) {
    fileName = fileName.replace(".png", "");
    fileName = fileName.replace(".jpg", "");
    fileName = fileName.replace(/-/g, " ");
    return fileName;
}
