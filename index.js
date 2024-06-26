var tableBody = document.getElementById("tableBody");
var bookmarkNameInput = document.getElementById("bookmarkNameInput");
var bookmarkUrlInput = document.getElementById("bookmarkUrlInput");

var bookmarkList = [];

if (localStorage.getItem("bookmarksList") != null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarksList"));
  displayBookmarks();
}

function isValidUrl(url) {
  var simpleRegex = /^[^ "]+\.[^ "]+$/;
  return simpleRegex.test(url);
}

function addBookmark() {
  var bookmarkName = bookmarkNameInput.value;
  var bookmarkUrl = bookmarkUrlInput.value;

  if (bookmarkName === "" || bookmarkUrl === "") {
    alert("Please enter both name and URL.");
    return;
  }

  if (!isValidUrl(bookmarkUrl)) {
    alert("Please enter a valid URL.");
    return;
  }

  if (
    !bookmarkUrl.startsWith("http://") &&
    !bookmarkUrl.startsWith("https://")
  ) {
    bookmarkUrl = "http://" + bookmarkUrl;
  }

  var bookmark = {
    Name: bookmarkName,
    Url: bookmarkUrl,
  };

  bookmarkList.push(bookmark);
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarkList));
  console.log(bookmarkList);

  clearForm();
  displayBookmarks();
}

function clearForm() {
  bookmarkNameInput.value = "";
  bookmarkUrlInput.value = "";
}

function displayBookmarks() {
  tableBody.innerHTML = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    tableBody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${bookmarkList[i].Name}</td>
        <td><a href="${
          bookmarkList[i].Url
        }" class="btn btn-warning py-2 px-3 my-2" target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
        <td><button onclick="deleteBookmark(${i})" class="btn btn-info py-2 px-3 my-2"><i class="fa-solid fa-trash-can pe-1"></i>Delete</button></td>
      </tr>`;
  }
}

function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  displayBookmarks();
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarkList));
}
