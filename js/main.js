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
	userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
	if (userInfo && userInfo.length > 0) {
		userInfo = userInfo[0]
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


		var selectableDeliveryOptions=document.getElementById("howWillYouDonate").children;
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


		var checkbox = document.getElementsByClassName("checkboxlist");
		for (var i = 0; i < checkbox.length; i++) {
			if( userInfo.items.includes(checkbox[i].value)){
				checkbox[i].checked = true
				var index = userInfo.items.indexOf(checkbox[i].value)
				userInfo.items.splice(index, 0);
				console.log(userInfo.items)
			}
		}

		handleItemChange()

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

	var checkbox = document.getElementsByClassName("checkboxlist");
	var allCheckedItems =[];
	for (var i = 0; i < checkbox.length; i++) {
		if( checkbox[i].checked == true){
			if (checkbox[i].value == "Other") {
				userInfo.otherItems = document.getElementById('OtherItems').value;
			} else {
				allCheckedItems.push(checkbox[i].value);
			}
		}
	}
	userInfo.items = allCheckedItems;


	var howWillYouDonate = document.getElementById('howWillYouDonate').value;
	userInfo.deliveryMethod = howWillYouDonate;

	var howElsewillYouDonate = document.getElementById('howElsewillYouDonate').value;
	if (howWillYouDonate == "Other" && howElsewillYouDonate != "") {
		userInfo.deliveryMethod = howElsewillYouDonate
	}

	var shelterForPeople = document.getElementById('ShelterForPeople').value;
	userInfo.hasShelter = shelterForPeople;

	var donations = JSON.parse(window.localStorage.getItem("userInfo"));
	if (!donations) {
		donations = []
	}
	donations.push(userInfo)

	window.localStorage.setItem("userInfo", JSON.stringify(donations))
	
}


//Admin Code

var donations = []
function loadExistingDonations() {
	donations = JSON.parse(window.localStorage.getItem("userInfo"));
	for (var i = 0; i < donations.length; i++) {
		document.getElementById("donationsList").innerHTML += "<li class='donationListItem' onclick='showDonationInfo(" + i + ")'>" + donations[i].firstName + " " + donations[i].lastName + "</li>";
	}
}

function showDonationInfo(itemIndex) {
	var item = donations[itemIndex];
	document.getElementById("donationInfo").innerHTML = "<span class='fullname'>" + item.firstName + " " + item.lastName + "</span></br>";
	document.getElementById("donationInfo").innerHTML += "<span class='phone'>" + item.phone + "</span></br>";
}


