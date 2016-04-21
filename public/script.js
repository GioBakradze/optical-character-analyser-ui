function drawTextOnCanvas(text) {
    var canvas = document.getElementById("text-image");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillStyle = '#000';
    ctx.fillText(text, 10, 50);
}

function getImage() {
    return document.getElementById("text-image").toDataURL('image/jpeg');
}

$(document).ready(function () {
    $("#generate").click(function () {
        drawTextOnCanvas($("#text").val());

        $.ajax({
            type: "POST",
            url: "/process",
            data: {
                image: getImage()
            }
        }).done(function(o) {
            console.log('saved');
        });
    });
});
