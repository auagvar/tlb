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
function handleItemChange(){
	if(document.getElementById('checkboxOther').checked == true) {
		document.getElementById("OtherItemBox").style.display='block';
	} else { 
		document.getElementById("OtherItemBox").style.display='none';
		document.getElementById('OtherItems').value=""
	}
	

}
function loadExistingData() {
	donationInfo = JSON.parse(window.localStorage.getItem("donationInfo"));
	if (donationInfo && donationInfo.length > 0) {
		donationInfo = donationInfo[0]
		document.getElementById('fname').value = donationInfo.firstName;
		document.getElementById('lname').value = donationInfo.lastName;
		document.getElementById('email').value = donationInfo.email;
		document.getElementById('phonenumber').value = donationInfo.phone;
		
		var selectableLocationOptions = document.getElementsByClassName("location");
		var selectableLocationNames = []

		for (var i = 0; i < selectableLocationOptions.length; i++) {
			var locationName = selectableLocationOptions[i].value;
			if (locationName != "Other") {
				selectableLocationNames.push(locationName)
			}
		}

		if (selectableLocationNames.includes(donationInfo.location)) {
			document.getElementById('selected-location').value = donationInfo.location;
		} else {
			document.getElementById('selected-location').value = "Other";
			document.getElementById('other-location').value = donationInfo.location;
		}

		handleLocationChange()


		var selectableDeliveryOptions=document.getElementById("howWillYouDonate").children;
		var selectableDelivery =[]

		for(var k=0; k< selectableDeliveryOptions.length; k++){
			var deliveryWay=selectableDeliveryOptions[k].value;
			if (deliveryWay != "Other"){
				selectableDelivery.push(deliveryWay)
			}
		}
		if(selectableDelivery.includes(donationInfo.deliveryMethod)){
			document.getElementById('howWillYouDonate').value=donationInfo.deliveryMethod
		}else{
			document.getElementById('howWillYouDonate').value="Other";
			document.getElementById('howElsewillYouDonate').value=donationInfo.deliveryMethod
		}
		handleDeliveryChange()


		var checkbox = document.getElementsByClassName("checkboxlist");
		for (var i = 0; i < checkbox.length; i++) {
			if( donationInfo.items.includes(checkbox[i].value)){
				checkbox[i].checked = true
				var index = donationInfo.items.indexOf(checkbox[i].value)
				donationInfo.items.splice(index, 0);
				console.log(donationInfo.items)
			}
		}

		handleItemChange()

	}
}


function checkFunction() {
	var donationInfo = {
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
	donationInfo.firstName = fname;

	var lname = document.getElementById('lname').value;
	donationInfo.lastName = lname;

	var email = document.getElementById('email').value;
	donationInfo.email = email; 

	var phoneNumber = document.getElementById('phonenumber').value;
	donationInfo.phone = phoneNumber;

	var location = document.getElementById('selected-location').value;
	donationInfo.location = location; 

	var otherLocation = document.getElementById('other-location').value;
	if (location == "Other" && otherLocation != "") {
		donationInfo.location = otherLocation
	}

	var checkbox = document.getElementsByClassName("checkboxlist");
	var allCheckedItems =[];
	for (var i = 0; i < checkbox.length; i++) {
		if( checkbox[i].checked == true){
			if (checkbox[i].value == "Other") {
				donationInfo.otherItems = document.getElementById('OtherItems').value;
			} else {
				allCheckedItems.push(checkbox[i].value);
			}
		}
	}
	donationInfo.items = allCheckedItems;


	var howWillYouDonate = document.getElementById('howWillYouDonate').value;
	donationInfo.deliveryMethod = howWillYouDonate;

	var howElsewillYouDonate = document.getElementById('howElsewillYouDonate').value;
	if (howWillYouDonate == "Other" && howElsewillYouDonate != "") {
		donationInfo.deliveryMethod = howElsewillYouDonate
	}

	var shelterForPeople = document.getElementById('ShelterForPeople').value;
	donationInfo.hasShelter = shelterForPeople;

	var donations = JSON.parse(window.localStorage.getItem("donationInfo"));
	if (!donations) {
		donations = []		
	}
	if (donationInfo.firstName == "") {
		console.log("The name cannot be empty");
		document.getElementById("fname_error").style.display = "block";
		document.getElementById("fname").style.backgroundColor= '#efbbcc';
	}

	else if (donationInfo.lastName == "") {
		console.log("The Surname cannot be empty");
		document.getElementById("lname_error").style.display = "block";
		document.getElementById("lname").style.backgroundColor= '#efbbcc';
	}

	else if (donationInfo.email == "") {
		console.log("The email cannot be empty");
		document.getElementById("email_error").style.display = "block";
		document.getElementById("email").style.backgroundColor= '#efbbcc';
	}

	else if(donationInfo.phone == "") {
		console.log("The phonenumber cannot be empty");
		document.getElementById("phone_error").style.display = "block";
		document.getElementById("phonenumber").style.backgroundColor= '#efbbcc';
	} else {
		donations.push(donationInfo)
	}

	window.localStorage.setItem("donationInfo", JSON.stringify(donations))
	
}


//Admin Code

var donations = []
function loadExistingDonations() {
	donations = JSON.parse(window.localStorage.getItem("donationInfo"));
	for (var i = 0; i < donations.length; i++) {
		if (donations[i].firstName !="") {
			document.getElementById("donationsList").innerHTML += "<li onclick='showDonationInfo(" + i + ")'>" + donations[i].firstName + " " + donations[i].lastName + "</li>";
		}
	}
}

function showDonationInfo(itemIndex) {
	var item = donations[itemIndex];
	document.getElementById("donationInfo").innerHTML = "<span class='fullname'>" + item.firstName + " " + item.lastName + "</span></br>";
	document.getElementById("donationInfo").innerHTML += "<span class='phone'>" + item.phone + "</span></br>";
}



