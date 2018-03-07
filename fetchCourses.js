// Get courses from MyPurdue home page.
var course_cols = document.getElementsByClassName('myCourses_sectionCol');
var courses = [];
for (var i = 1; i < course_cols.length; i++) {
  courses.push(course_cols[i].innerText);
}
// Send the courses to the extension.
chrome.extension.sendRequest(courses);
