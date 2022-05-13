var idupimage = JSON.parse(localStorage.getItem("idupimage"));
if (idupimage === null) {
  idupimage = [];
  var idupimage = 0;
  localStorage.setItem("idupimage", JSON.stringify(idupimage));
}

var upload_image = JSON.parse(localStorage.getItem("upload_image"));
if (upload_image === null) {
  upload_image = [];
  localStorage.setItem("upload_image", JSON.stringify(upload_image));
}

document.querySelector("#file").addEventListener("change", function () {
  var img = document.getElementById("file");
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    console.log(reader.result);
    localStorage.setItem("img", reader.result);
  });
  reader.readAsDataURL(img.files[0]);
});

document.getElementById("file").addEventListener("change", settime);

function settime() {
  setTimeout(upload_image_host(), 5000);
  console.log("sa");
}

function upload_image_host() {
  var id = idupimage;
  var image = localStorage.getItem("img");
  if (image != "") {
    var pushimage = { id, image };
    upload_image.push(pushimage);
    localStorage.setItem("upload_image", JSON.stringify(upload_image));
    idupimage++;
    localStorage.setItem("idupimage", JSON.stringify(idupimage));

    console.log(upload_image);
    print_image();
  } else {
    alert("Please enter full information");
  }
}

function print_image() {
  countprint();
  document.getElementById("image_grid").innerHTML = " ";
  var upload_image = JSON.parse(localStorage.getItem("upload_image"));
  for (let i = 0; i < upload_image.length; i++) {
    var prinf =
      `
    <div class="box">
    <img src="` +
      upload_image[i].image +
      `" alt="" />
    <span onclick="Deleteimage(` +
      upload_image[i].id +
      `)">Delete</span>
  </div>`;
    document.getElementById("image_grid").innerHTML += prinf;
  }
}
print_image();
function Deleteimage(id) {
  for (var i = 0; i < upload_image.length; i++) {
    if (id == upload_image[i].id) {
      upload_image.splice(i, 1);

      localStorage.setItem("upload_image", JSON.stringify(upload_image));
      print_image();
    }
  }
}

function countprint() {
  let count = document.getElementById("count");
  count.innerText = upload_image.length;
}
countprint();
