function onBodyLoad()
{       
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady()
{
	// do your thing!
    navigator.notification.alert("PhoneGap is working")
}