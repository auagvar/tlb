function checkFunction(){

	var fname = document.getElementById('fname').value;
	console.log(fname);

	var lname = document.getElementById('lname').value;
	console.log(lname);

	var email = document.getElementById('email').value;
	console.log(email); 

	var phonenumber = document.getElementById('phonenumber').value;
	console.log(phonenumber);

	var location = document.getElementById('selected-location').value;
	console.log(location); 

	var Otherlocation = document.getElementById('other-location').value;
	console.log(Otherlocation);

	var OtherItems = document.getElementById('OtherItems').value;
	console.log(OtherItems);

	var HowWillYouDonate = document.getElementById('HowWillYouDonate').value;
	console.log(HowWillYouDonate);

	var HowElsewillYouDonate = document.getElementById('HowElsewillYouDonate').value;
	console.log(HowElsewillYouDonate);

	var ShelterForPeople = document.getElementById('ShelterForPeople').value;
	console.log(ShelterForPeople);


	var checkbox = document.getElementsByClassName("checkboxlist");
	var allcheckboxlist =[];
	for (var i = 0; i < checkbox.length; i++) {
		if( checkbox[i].checked == true){
			allcheckboxlist.push(checkbox[i].value);
		}
}
}