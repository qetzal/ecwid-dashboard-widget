/* 
 This file was generated by Dashcode.  
 You may edit this file to customize your widget or web page 
 according to the license.txt file included in the project.
 #
 */

var api_url = "https://appdev.ecwid.com/api/v1/";
var apiKey = "";
var storeID = "";
var orders = {
};

function open_my_ecwid() {
if((storeID == "" || storeID == "undefined" || !storeID) || (apiKey == "" || apiKey == "undefined" || !apiKey) ) { 
showBack();
} else {
 if ( window.widget )
  {
    widget.openURL("https://my.ecwid.com/");
    return false;
  }
  }
}
function show_data()
{
console.log(storeID + " + " + apiKey);

if((storeID == "" || storeID == "undefined" || !storeID) || (apiKey == "" || apiKey == "undefined" || !apiKey) ) {

//$("#setupme").show();
//$("#orders").hide();
console.log("Please set up me");
$("#orders").html("Setup...");
return "";
}
    var request_url = api_url + storeID + "/orders?secure_auth_key=" + apiKey + "&statuses=ACCEPTED";

//    dataSource.

    console.log(request_url);
    
    $.ajax({
        url:      request_url,
        dataType: "json",
        success:  function(data) {
            console.log("success")
            orders = data["orders"];
            display_values();
        },
        error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus + errorThrown);
        }
    });
}

function display_values()
{
var total = 0.00;
for (i=0;i<orders.length;i=i+1) {
total = total + orders[i]["totalCost"];
console.log(orders[i]["totalCost"]);
// console.log(orders[i]);
}
$("#orders").html("$" + total.toFixed(2));
}


//
// Function: load()
// Called by HTML body element's onload event when the widget is ready to start
//
function load()
{
    dashcode.setupParts();
    
    // Initialize apiKey from preference
    var apiKeyPref = widget.preferenceForKey(widget.identifier + "-apiKey");
    var storeIDPref = widget.preferenceForKey(widget.identifier + "-storeID");
     
   apiKey = apiKeyPref;
   storeID = storeIDPref;
}

//
// Function: remove()
// Called when the widget has been removed from the Dashboard
//
function remove()
{
    // Stop any timers to prevent CPU usage
    // Remove any preferences as needed
    // widget.setPreferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));
}

//
// Function: hide()
// Called when the widget has been hidden
//
function hide()
{
    // Stop any timers to prevent CPU usage
}

//
// Function: show()
// Called when the widget has been shown
//
function show()
{
    // Restart any timers that were stopped on hide
    show_data();
}

//
// Function: sync()
// Called when the widget has been synchronized with .Mac
//
function sync()
{
    // Retrieve any preference values that you need to be synchronized here
    // Use this for an instance key's value:
    // instancePreferenceValue = widget.preferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));

    //
    // Or this for global key's value:
    // globalPreferenceValue = widget.preferenceForKey(null, "your-key");
}

//
// Function: showBack(event)
// Called when the info button is clicked to show the back of the widget
//
// event: onClick event from the info button
//
function showBack(event)
{
    if (window.widget) {
        widget.prepareForTransition("ToBack");
    }
    
    $('#apikey').val(apiKey);
    $('#storeid').val(storeID);
    
    $('#front').css("display", "none");
    $('#back').css("display", "block");

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

//
// Function: showFront(event)
// Called when the done button is clicked from the back of the widget
//
// event: onClick event from the done button
//
function showFront(event)
{
    apiKey = $('#apikey').val();
    widget.setPreferenceForKey(apiKey, widget.identifier + "-apiKey");
    
    storeID = $('#storeid').val();
    widget.setPreferenceForKey(apiKey, widget.identifier + "-storeID");
    
    show_data();

    if (window.widget) {
        widget.prepareForTransition("ToFront");
    }
    
    $('#front').css("display", "block");
    $('#back').css("display",  "none");

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

function onUpdateButtonClick(event)
{
    show_data();
}


function onChangeHandler(event)
{
}

if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
    widget.onsync = sync;
}
