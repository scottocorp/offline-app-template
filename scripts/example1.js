onload = function(e) {
	
    // Check for required browser features
    if (!window.applicationCache) {
        log("HTML5 Offline Applications are not supported in your browser.");
        return;
    }
    if (!window.localStorage) {
        log("HTML5 Local Storage not supported in your browser.");
        return;
    }

    log("Initial cache status: " + showCacheStatus(window.applicationCache.status));
    
    // Initialise the buttons
    document.getElementById("installButton").onclick = install;
    document.getElementById("addButton").onclick = addrecord;

    // Synchronize with the server if the browser is now online
    if(navigator.onLine) {
        uploadRecords();
    }
}

handleRecord = function() {

	log("handle record");
    
	// Create some content to put into the data record
	var content=new Date().getTime();
	
	// Store the data record locally
	storeRecord(content);
	
	// Upload the data record
	if(navigator.onLine) {
        uploadRecords();
    }
}

uploadRecords = function() {

	// Retrieve data from LocalStorage
	var records = JSON.parse(localStorage.records || "[]");
	
	// Upload data to the server.
	for (var i=0; i<records.length; i++)
	{
		// This following may be replaced with appropriate REST calls...  
		
	    //var request = new XMLHttpRequest();
	    //request.open("POST", "http://someurl.com", true);
	    //request.send(records[i].content);

		log("record uploaded: "+records[i].content);
	}
	
	// Clear data from LocalStorage
	localStorage.records='[]';
}

storeRecord = function(content) {
	
	log("record stored: "+content);
	
    // Retrieve stored data
    var records = JSON.parse(localStorage.records || "[]");
    
    // add current record to the data
    records.push({"content" : content});
    
    // Save data to LocalStorage
    localStorage.records = JSON.stringify(records);
}

addrecord = function() {
	
    log("Adding a record");
    
    handleRecord();
}

install = function() {
	
    log("Checking for updates");
    
    try {
        window.applicationCache.update();
    } catch (e) {
        applicationCache.onerror();
    }
}

/* log each of the events fired by window.applicationCache */

window.applicationCache.onchecking = function(e) {
    log("Checking for application update");
}

window.applicationCache.onnoupdate = function(e) {
    log("No application update found");
}

window.applicationCache.onupdateready = function(e) {
	
    log("Application update ready");
    
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
    	
        // Browser downloaded a new app cache. Swap it in and reload the page
        window.applicationCache.swapCache();
        if (confirm('A new version of this site is available. Load it?')) {
          window.location.reload();
        }
        
    } else {
        // Manifest didn't changed. Nothing new to server.
    }
}

window.applicationCache.onobsolete = function(e) {
    log("Application obsolete");
}

window.applicationCache.ondownloading = function(e) {
    log("Downloading application update");
}

window.applicationCache.oncached = function(e) {
    log("Application cached");
}

window.applicationCache.onerror = function(e) {
    log("Application cache error");
}

window.addEventListener("offline", function(e) {
    log("Offline");
}, true);

window.addEventListener("online", function(e) {
	
    log("Online");
    
    // Synchronize with the server if the browser is now online
    
    uploadRecords();
    
}, true);

log = function() {
    var p = document.createElement("p");
    var message = Array.prototype.join.call(arguments, " ");
    p.innerHTML = message;
    document.getElementById("info").appendChild(p);
}

/* Convert applicationCache status codes into messages */
showCacheStatus = function(n) {
    statusMessages = ["Uncached","Idle","Checking","Downloading","Update Ready","Obsolete"];
    return statusMessages[n];
}

