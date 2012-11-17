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

    // Show queue of items stored in LocalStorage
    showQueue();
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

        showQueue();

	// Upload the data record
	if(navigator.onLine) {
           uploadRecords();
    }
}


showQueue = function() {

    // Retrieve data from LocalStorage
    var records = JSON.parse(localStorage.records || "[]");

    var q = document.getElementById("queue-items");
    // Clear queue html
    while (q.hasChildNodes()) {
        q.removeChild(q.firstChild);
    }
    // Add html for each queue item.
    for (var i in records) {
        var p = document.createElement("p");
        p.innerHTML = records[i].content;
        q.appendChild(p);
    }
}

uploadRecords = function() {

	// Retrieve data from LocalStorage
	var records = JSON.parse(localStorage.records || "[]");
	
	// Upload data to the server.
        while (records.length) 
	{
	    var item = records.shift();

	    // This following may be replaced with appropriate REST calls...  
		
	    //var request = new XMLHttpRequest();
	    //request.open("POST", "http://someurl.com", true);
	    //request.send(records[i].content);

	    // Normally, check result of upload, but for now consider online as success.
	    var success = navigator.onLine;

	    // Instead check if we are still online for each record.
	    if (success) {	
		log("record uploaded: "+item.content);
            } else {
                records.unshift(item);  // Put item back at top of list.
                break;                  // Stop on first failure.
            }
	}
	
	// Put back any unsent messages to LocalStorage
	localStorage.records = JSON.stringify(records);

        showQueue();
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
    log("Application cache error - perhaps the application is offline");
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
    document.getElementById("log-items").appendChild(p);
}

/* Convert applicationCache status codes into messages */
showCacheStatus = function(n) {
    return ["Uncached","Idle","Checking","Downloading","Update Ready","Obsolete"][n];
}

