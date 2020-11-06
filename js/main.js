function loadExistingData() {
	userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
	document.getElementById('fname').value = userInfo.firstName;
}


function checkFunction() {
	var userInfo = {
		"firstName" : "",
		"lastName" : "",
		"email" : "",
		"phone" : "",
		"location" : "",
		"items" : [],
		"deliveryMethod" : "",
		"hasShelter" : false 
	}	

	var fname = document.getElementById('fname').value;
	userInfo.firstName = fname;

	var lname = document.getElementById('lname').value;
	userInfo.lastName = lname;

	var email = document.getElementById('email').value;
	userInfo.email = email; 

	var phoneNumber = document.getElementById('phonenumber').value;
	userInfo.phone = phoneNumber;

	var location = document.getElementById('selected-location').value;
	userInfo.location = location; 

	var otherLocation = document.getElementById('other-location').value;
	if (location == "Other" && otherLocation != "") {
		userInfo.location = otherLocation
	}

	/*var checkbox = document.getElementsByClassName("checkboxlist");
	var allcheckboxlist =[];
	for (var i = 0; i < checkbox.length; i++) {
		if( checkbox[i].checked == true){
			allcheckboxlist.push(checkbox[i].value);
		}
	}

	var OtherItems = document.getElementById('OtherItems').value;
	console.log(OtherItems);*/

	var howWillYouDonate = document.getElementById('HowWillYouDonate').value;
	userInfo.deliveryMethod = howWillYouDonate;

	var howElsewillYouDonate = document.getElementById('HowElsewillYouDonate').value;
	if (howElsewillYouDonate != "") {
		userInfo.deliveryMethod = howElsewillYouDonate
	}

	var shelterForPeople = document.getElementById('ShelterForPeople').value;
	userInfo.hasShelter = shelterForPeople

	window.localStorage.setItem("userInfo", JSON.stringify(userInfo))
}