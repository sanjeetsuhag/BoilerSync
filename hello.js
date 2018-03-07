var allCourses = [];

function loadCourses() {
  var courseTable = document.getElementById('courses');
  for (var i = 0; i < allCourses.length; ++i) {
    var row = document.createElement('tr');
    var col0 = document.createElement('td');
    var checkbox = document.createElement('input');
    checkbox.checked = true;
    checkbox.type = 'checkbox';
    checkbox.id = 'checked_course_' + i;
    col0.appendChild(checkbox);
    var col1 = document.createElement('td');
    col1.innerText = allCourses[i];
    row.appendChild(col0);
    row.appendChild(col1);
    console.log(row);
    courseTable.appendChild(row);
  }
}

chrome.extension.onRequest.addListener(function (courses) {
  for (var i = 0; i < courses.length; i++) {
    allCourses.push(courses[i])
  }
  loadCourses();
})

window.onload = function() {
  console.log('onload!');
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query(
      {
        active: true,
        windowId: currentWindow.id
      },
      function(activeTabs) {
        chrome.tabs.executeScript(
          activeTabs[0].id,
          {
            file: 'fetchCourses.js',
            allFrames: true
          }
        );
      }
    );
  });
};
