var img_dir_path = "assets/illustration/";

// this script will automatically get image from URL
var getImages = function () {
    var queryString = document.location.search.split("+").join(" ");
    var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(queryString)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    var file_str = params.img;

    if (file_str == undefined) {
        // no value in the query string
        // here you have to manage this use case : redirect or print a message to user
    } 
    else {
        var image = document.getElementById('image');
        image.src = img_dir_path + file_str;
        image.alt = file_str;

        // allow for vertical scroll if image is very vertical
        image.addEventListener("load", function(){
            if (image.height / image.width > 2) {
                image.style.maxHeight = 'none';
            }
        });

        var image_title = getTitleFromFileName(file_str);
        document.title =  document.title.replace("image", image_title);

        // display serial images if appropriate
        var ctr = 1;
        var period_idx = file_str.indexOf(".");
        var serial_file_str = file_str.substring(0, period_idx) + "_" + ctr + file_str.substring(period_idx, file_str.length);

        while (doesFileExist(img_dir_path + serial_file_str)) {
            var serial_img = document.createElement('img');
            serial_img.src =  img_dir_path + serial_file_str;
            document.getElementsByClassName('content')[0].appendChild(serial_img);

            serial_file_str = serial_file_str.replace(ctr, ++ctr);
        }
    }
} ();

function getTitleFromFileName(fileName) {
    fileName = fileName.replace(".png", "");
    fileName = fileName.replace(".jpg", "");
    fileName = fileName.replace(/-/g, " ");
    fileName = fileName.replace(/_/g, "");
    fileName = fileName.replace("full", "");
    return fileName;
}

function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}
