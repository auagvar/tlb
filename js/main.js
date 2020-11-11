function handleLocationChange() {
	if (document.getElementById('selected-location').value == "Other") {
		document.getElementById('otherLocationBox').style.display = "block";
	} else {
		document.getElementById('otherLocationBox').style.display = "none";
		document.getElementById('other-location').value = ""
	}
}
function handleDeliveryChange() {
	if(document.getElementById('howWillYouDonate').value=="Other") {
		document.getElementById('other-delivery').style.display="block";
	} else{
		document.getElementById('other-delivery').style.display="none";
		document.getElementById('howElsewillYouDonate').value=""
	}
}
function loadExistingData() {
	userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
	if (userInfo) {
		document.getElementById('fname').value = userInfo.firstName;
		document.getElementById('lname').value = userInfo.lastName;
		document.getElementById('email').value = userInfo.email;
		document.getElementById('phonenumber').value = userInfo.phone;
		
		var selectableLocationOptions = document.getElementsByClassName("location");
		var selectableLocationNames = []

		for (var i = 0; i < selectableLocationOptions.length; i++) {
			var locationName = selectableLocationOptions[i].value;
			if (locationName != "Other") {
				selectableLocationNames.push(locationName)
			}
		}

		if (selectableLocationNames.includes(userInfo.location)) {
			document.getElementById('selected-location').value = userInfo.location;
		} else {
			document.getElementById('selected-location').value = "Other";
			document.getElementById('other-location').value = userInfo.location;
		}

		handleLocationChange()


		var selectableDeliveryOptions=document.getElementsByClassName("delivery");
		var selectableDelivery =[]

		for(var k=0; k< selectableDeliveryOptions.length; k++){
			var deliveryWay=selectableDeliveryOptions[k].value;
			if (deliveryWay != "Other"){
				selectableDelivery.push(deliveryWay)
			}
		}
		if(selectableDelivery.includes(userInfo.deliveryMethod)){
			document.getElementById('howWillYouDonate').value=userInfo.deliveryMethod
		}else{
			document.getElementById('howWillYouDonate').value="Other";
			document.getElementById('howElsewillYouDonate').value=userInfo.deliveryMethod
		}
		handleDeliveryChange()

	}
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

	var howWillYouDonate = document.getElementById('howWillYouDonate').value;
	userInfo.deliveryMethod = howWillYouDonate;

	var howElsewillYouDonate = document.getElementById('howElsewillYouDonate').value;
	if (howWillYouDonate == "Other" && howElsewillYouDonate != "") {
		userInfo.deliveryMethod = howElsewillYouDonate
	}

	var shelterForPeople = document.getElementById('ShelterForPeople').value;
	userInfo.hasShelter = shelterForPeople

	window.localStorage.setItem("userInfo", JSON.stringify(userInfo))
	
}