let url = 'http://localhost:8000/api/activities';
fetch(url, { method: 'GET' }).then((res) => res.json()).then(response => {
  // Do something with response
  console.log(response);
  showPosts(response);
}).catch(error => {
  console.log("error: ", error); // Handle error
});

function showPosts (data) {
  var bigtable = document.getElementById('myTable');

		for (item of data){
      const convDate = new Date(item.date);

      const root = document.createElement('div');
      const name = document.createElement('div');
      const mastery = document.createElement('div');
      const pleasure = document.createElement('div');
      const comment = document.createElement('div');

      name.textContent = item.name;
      mastery.textContent = item.mastery;
      pleasure.textContent = item.pleasure;
      comment.textContent = item.comment;
      root.append(name, mastery, pleasure, comment);
      root.className = "box activity";

			var bigRow = `<tr>
							<td>${convDate.getMonth()}</td>
							<td>${convDate.getDate() + '(' + convDate.getDay() + ')'}</td>
              <td><table>
                  <tr>
                    <th>Time</th>
                    <th>Activity</th>
                    <th>Mastery</th>
                    <th>Pleasure</th>
                    <th>Comment</th>
                  </tr>
                  <tbody id="activitiesTable">

                  </tbody></td>
            </tr>`;
			bigtable.innerHTML += bigRow;
      }
/*
      var activitiesTable = document.getElementById('activitiesTable');
      var actRow = `<tr>
                  <td>${convDate.getHours() + ':' + convDate.getMinutes()}</td>
                  <td id='help' class='help' style="background-color:blue">${item.name}</td>
                  <td>${item.mastery}</td>
                  <td>${item.pleasure}</td>
                  <td>${item.comment}</td>
                </tr>`;
      activitiesTable.innerHTML += actRow;

		*/
  for (item of data){
    const root = document.createElement('div');
    const daySection = document.createElement('section');
    const name = document.createElement('div');
    const mastery = document.createElement('div');
    const pleasure = document.createElement('div');
    const comment = document.createElement('div');
    const month = document.createElement('div');
    const date = document.createElement('div');
    const day = document.createElement('div');
    const hours = document.createElement('div');
    const minutes = document.createElement('div');
/*
    console.log("date: ", item.date);
    console.log("type of date: ", typeof(item.date));

    console.log("convDate: ", convDate);
    console.log("type of convDate: ", typeof(convDate));
*/

    name.textContent = item.name;
    mastery.textContent = item.mastery;
    pleasure.textContent = item.pleasure;
    comment.textContent = item.comment;
    month.textContent = convDate.getMonth();
    date.textContent = convDate.getDate() + '(' + convDate.getDay() + ')';
    hours.textContent = convDate.getHours() + ':' + convDate.getMinutes();

    daySection.append(date);
    daySection.className = "columnDate";
    document.getElementById('month_list').append(month);
    root.append(name, mastery, pleasure, comment);
    root.className = "box activity";
    document.getElementById('activity_list').append(root);
  }

}

document.addEventListener('DOMContentLoaded', () => {
    document
      .getElementById('radioToday')
      .addEventListener('click', showRadioNow);

    document
      .getElementById('newActivityForm')
      .addEventListener('submit', handleForm);

  }); //page is loaded, listens to form's submit and calls handleForm (with this event)

function showRadioNow(){
  const radioNowDiv = document.getElementById('radioNowDiv');
  const input = `<input type="radio"`;
}


function handleForm(ev) {
  ev.preventDefault(); //stop the page reloading
  //console.dir(ev.target);
  let postForm = ev.target;
  let postData = new FormData(postForm);

  //add more things that were not in the form
  //  postData.append('api-key', 'myApiKey');

  let json = convertFD2JSON(postData);
  let jsonString = JSON.stringify(json);

  //send the request with the formdata
  let url = 'http://localhost:8000/api/activities';
  let h = new Headers();
  h.append('Content-type', 'application/json');

  let req = new Request(url, {
    headers: h,
    body: jsonString,
    method: 'POST',
  });

  fetch(req)
    .then((res) => res.json())
    .then((data) => {
      console.log('Response from server?');

      console.log(data);
    })
    .catch(console.warn);


}



function convertFD2JSON(formData) {
  let obj = {};
  for (let key of formData.keys()) {
    obj[key] = formData.get(key);
  }
  return obj;
}
