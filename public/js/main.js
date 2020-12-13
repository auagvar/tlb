function checkFunction() {
	var listingInfo = {
		"firstName" : "",
		"lastName" : "",
		"email" : "",
		"phone": "",
		"contact": "",
		"description" : "",
		"subjects": [],
		"eduLevel" : [],
		"format" : [],
	}	

	var fname = document.getElementById('fname').value;
	listingInfo.firstName = fname;

	var lname = document.getElementById('lname').value;
	listingInfo.lastName = lname;

	var email = document.getElementById('email').value;
	listingInfo.email = email; 

	var phoneNumber = document.getElementById('phonenumber').value;
	listingInfo.phone = phoneNumber; 

	var contact = document.getElementById('contact').value;
	listingInfo.contact = contact;

	var courseDescription = document.getElementById('course_description').value;
	listingInfo.description = courseDescription;


	//CHECKBOX DATA TO OBJECT 


	var checkboxSub = document.getElementsByClassName("checkboxSub");
	var subCheckedItems = [];
	for (var i = 0; i < checkboxSub.length; i++) {
		if (checkboxSub[i].checked == true) {
			subCheckedItems.push(checkboxSub[i].value);
		}
	}
	listingInfo.subjects = subCheckedItems;

	var checkboxEdu = document.getElementsByClassName("checkboxEducation");
	var eduCheckedItems =[];
	for (var i = 0; i < checkboxEdu.length; i++) {
		if( checkboxEdu[i].checked == true){
			eduCheckedItems.push(checkboxEdu[i].value);
		}
	}
	listingInfo.eduLevel = eduCheckedItems;

	var checkboxFormat = document.getElementsByClassName("checkboxFormat");
	var formatCheckedItems = [];
	for (var i = 0; i < checkboxFormat.length; i++) {
		if (checkboxFormat[i].checked == true) {
			formatCheckedItems.push(checkboxFormat[i].value);
		}
	}
	listingInfo.format = formatCheckedItems;

	var listings = JSON.parse(window.localStorage.getItem("listingInfo"));
	if (!listings) {
		listings = []		
	}

	//form validation 
	var formValid = true;

	if (listingInfo.firstName == "") {
		console.log("The name cannot be empty");
		document.getElementById("fname_error").style.display = "block";
		document.getElementById("fname").style.backgroundColor= '#efbbcc';
		formValid = false;
	} else {
		document.getElementById("fname_error").style.display = "none";
		document.getElementById("fname").style.backgroundColor= '#fff';
	}

	if (listingInfo.lastName == "") {
		console.log("The Surname cannot be empty");
		document.getElementById("lname_error").style.display = "block";
		document.getElementById("lname").style.backgroundColor= '#efbbcc';
		formValid = false;
	} else {
		document.getElementById("lname_error").style.display = "none";
		document.getElementById("lname").style.backgroundColor= '#fff';
	}

	if (listingInfo.email == "") {
		console.log("The email cannot be empty");
		document.getElementById("email_error").style.display = "block";
		document.getElementById("email").style.backgroundColor= '#efbbcc';
		formValid = false;
	} else {
		document.getElementById("email_error").style.display = "none";
		document.getElementById("email").style.backgroundColor= '#fff';
	}

	if(listingInfo.phone == "") {
		console.log("The phonenumber cannot be empty");
		document.getElementById("phone_error").style.display = "block";
		document.getElementById("phonenumber").style.backgroundColor= '#efbbcc';
		formValid = false;
	} else {
		document.getElementById("phone_error").style.display = "none";
		document.getElementById("phonenumber").style.backgroundColor= '#fff';
	}




	if (formValid == true) {
		listings.push(listingInfo);
		window.localStorage.setItem("listingInfo", JSON.stringify(listings));
		window.location.href = "thanks.html"
	}
}



function handleInputValidation(e, errorMessageBoxID) {
	console.log(e.target.value);
	if (e.target.value == "") {
		document.getElementById(errorMessageBoxID).style.display = "block";
		e.target.style.backgroundColor= '#efbbcc';
		formValid = false;
	} else {
		document.getElementById(errorMessageBoxID).style.display = "none";
		e.target.style.backgroundColor= '#fff';
	}
}


//


function getListingData() {
	if (JSON.parse(window.localStorage.getItem("listingInfo"))) {
		return JSON.parse(window.localStorage.getItem("listingInfo"));
	} else {
		return []
	}
}

function loadExistingListings() {
	var courses = getListingData();
	for (var i = 0; i < courses.length; i++) {
		if (courses[i].firstName != "") {
			document.getElementById("courseListings").innerHTML += "<li onclick='showDonationInfo(event)'><div>" + courses[i].firstName + " " + courses[i].lastName + "</div><div class='donationDetails'>" + getCourseInfo(courses[i], i) + "</div></li>";
		}
	}
}

function reloadData() {
	document.getElementById("courseListings").innerHTML = '';
	loadExistingListings();
}

function rejectListing(index) {
	var courses = getListingData();
	courses.splice(index, 1);
	localStorage.setItem('listingInfo', JSON.stringify(courses));
	reloadData();
}

function acceptListing(index) {
	var finalCourses = getFinalData();
	var courses = getListingData();
	finalCourses.push(courses[index]);
	localStorage.setItem('finalInfo', JSON.stringify(finalCourses));
	rejectListing(index);
}

function getFinalData() {
	if (JSON.parse(window.localStorage.getItem("finalInfo"))) {
		return JSON.parse(window.localStorage.getItem("finalInfo"));
	} else {
		return []
	}
}


function editListing() {

}




function getCourseInfo(item, index) {
	console.log(item);
	console.log(index);
	var innerHTML = "<span class='phone'><span class='fieldTitle'>Phone: </span>" + item.phone + "</span><br>";
	innerHTML += "<span class= 'email'><span class='fieldTitle'>EMAIL: </span>" + item.email + "</span><br>";
	innerHTML += "<span class= 'location'><span class='fieldTitle'>Location: </span>" + item.description + "</span><br>";
	innerHTML += "<span class= 'checkboxItems'><span class='fieldTitle'>Subjects: </span>" + item.subjects + "</span><br>";
	innerHTML += "<span class= 'checkboxItems'><span class='fieldTitle'>Education Level: </span>" + item.eduLevel + "</span><br>";
	innerHTML += "<span class= 'checkboxItems'><span class='fieldTitle'>Format: </span>" + item.format + "</span><br>";
	innerHTML += "<span class= 'contact'><span class='fieldTitle'>Contact: </span>" + item.contact + "</span><br>";
	innerHTML += "<span class= 'edit'><span class='fieldTitle'><a onclick='editListing()'>Edit</a></span></span><br>";
	innerHTML += "<span class= 'accept'><span class='fieldTitle'><button type='button' onclick='acceptListing(" + index + ")'>Accept</button></span></span><br>";
	innerHTML += "<span class= 'reject'><span class='fieldTitle'><button type='button' onclick='rejectListing(" + index + ")'>Reject</button></span></span><br>";
	return innerHTML;
}

function renderFinalData() {
	var listings = getFinalData();
	listings.forEach(listing =>
		document.getElementById("courses").innerHTML += '<div class="course"><div class="course-elm1" ><div class="teacher-info"><div class="prof-pic"><img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt="Profile picture" /></div><div class="prof-no-pic"><div class="name-teaching-format"><h3>' + listing.firstName + ' ' + listing.lastName + ' [' + listing.eduLevel + ']</h3> </div><div class="subject-taught"><h3>' + listing.subjects + ' </h3></div></div></div><div class="course-description"><p>' + listing.description + '</p></div></div ><div class="course-elm2"><div class="center-day-time"><div class="day-time"><h4>Mon: 16:00-18:00</h4></div><div class="day-time"><h4>Wed: 16:00-18:00</h4></div><div class="day-time"><h4>Fri: 16:00-18:00</h4></div></div></div><div class="course-elm3"><a href="#"><button class="contact-teacher">Contact</button></a></div></div >'
	);
}


function showDonationInfo(e) {
	if (e.currentTarget.children[1].style.display == "block") {
		e.currentTarget.children[1].style.display = "none";
	} else {
		e.currentTarget.children[1].style.display = "block";
	}
}

function showAll() {
	var donationInfoBoxes = document.getElementsByClassName("donationDetails");
	for (var i = 0; i < donationInfoBoxes.length; i++) {
		donationInfoBoxes[i].style.display = "block";
	}
}

function hideAll() {
	var donationInfoBoxes = document.getElementsByClassName("donationDetails");
	for (var i = 0; i < donationInfoBoxes.length; i++) {
		donationInfoBoxes[i].style.display = "none";
	}	
}



//function handleLocationChange() {
//	if (document.getElementById('selected-location').value == "Other") {
//		document.getElementById('otherLocationBox').style.display = "block";
//	} else {
//		document.getElementById('otherLocationBox').style.display = "none";
//		document.getElementById('other-location').value = ""
//	}
//}
//function handleDeliveryChange() {
//	if(document.getElementById('howWillYouDonate').value=="Other") {
//		document.getElementById('other-delivery').style.display="block";
//	} else{
//		document.getElementById('other-delivery').style.display="none";
//		document.getElementById('howElsewillYouDonate').value=""
//	}
//}
//function handleItemChange(){
//	if(document.getElementById('checkboxOther').checked == true) {
//		document.getElementById("OtherItemBox").style.display='block';
//	} else { 
//		document.getElementById("OtherItemBox").style.display='none';
//		document.getElementById('OtherItems').value=""
//	}	
//}


//function loadExistingData() {
//	donationInfo = JSON.parse(window.localStorage.getItem("donationInfo"));
//	if (donationInfo && donationInfo.length > 0) {
//		donationInfo = donationInfo[0]
//		document.getElementById('fname').value = donationInfo.firstName;
//		document.getElementById('lname').value = donationInfo.lastName;
//		document.getElementById('email').value = donationInfo.email;
//		document.getElementById('phonenumber').value = donationInfo.phone;
//		document.getElementById('contact').value = donationInfo.contact;

//		var selectableLocationOptions = document.getElementsByClassName("location");
//		var selectableLocationNames = []

//		for (var i = 0; i < selectableLocationOptions.length; i++) {
//			var locationName = selectableLocationOptions[i].value;
//			if (locationName != "Other") {
//				selectableLocationNames.push(locationName)
//			}
//		}

//		if (selectableLocationNames.includes(donationInfo.location)) {
//			document.getElementById('selected-location').value = donationInfo.location;
//		} else {
//			document.getElementById('selected-location').value = "Other";
//			document.getElementById('other-location').value = donationInfo.location;
//		}

//		handleLocationChange()


//		var selectableDeliveryOptions=document.getElementById("howWillYouDonate").children;
//		var selectableDelivery =[]

//		for(var k=0; k< selectableDeliveryOptions.length; k++){
//			var deliveryWay=selectableDeliveryOptions[k].value;
//			if (deliveryWay != "Other"){
//				selectableDelivery.push(deliveryWay)
//			}
//		}
//		if(selectableDelivery.includes(donationInfo.deliveryMethod)){
//			document.getElementById('howWillYouDonate').value=donationInfo.deliveryMethod
//		}else{
//			//document.getElementById('howWillYouDonate').value="Other";
//			document.getElementById('howElsewillYouDonate').value=donationInfo.deliveryMethod
//		}
//		handleDeliveryChange()


//		var checkbox = document.getElementsByClassName("checkboxlist");
//		for (var i = 0; i < checkbox.length; i++) {
//			if( donationInfo.items.includes(checkbox[i].value)){
//				checkbox[i].checked = true
//				var index = donationInfo.items.indexOf(checkbox[i].value)
//				donationInfo.items.splice(index, 0);
//				console.log(donationInfo.items)
//			}
//		}

//		handleItemChange()

//	}
//}