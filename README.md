
HTML5 Offline App template
==========================

TL;DR:
------
HTML5 Offline App template (demo [here](http://bit-taming.com/content/projects/appcachetest/example1.html))
 is a responsive web application template that uses Application Cache and Local Storage.
 
Overview:
---------
What is the miniumum amount of code necessary to build a mobile web application that:
* Can collect user data whilst offline,
* Automatically post any collected data once online,
* Responsively adapt to any device it is viewed upon
...using only HTML, CSS and javascript? 

This small HTML5 web app is an attempt to answer this question and provide a base for more complex apps. 

Nothing here is new or original. The following resources were used in it's construction:
* Chapter 10 of [Pro HTML5 Programming (Lubbers, et al)](http://www.amazon.com/Pro-HTML5-Programming-Application-Development/dp/1430227907)
provided the caching and storage smarts behind the page.
* This [NET Mag tutorial](http://media.netmagazine.futurecdn.net/files/imagecache/shop_item/gallery/magazine/2012/07/NET231.tut_resp.jpg)
provided the responsive smarts behind the page.
* Chapter 1 of [Web Development Recipes (Hogan, et al)](http://www.waterstones.com/waterstonesweb/products/brian+p-+hogan/chris+warren/mike+weber/web+development+recipes/8848417/) 
provided the 100% CSS-generated buttons. 

But each on it's own wasn't particularly compelling. It was only after combining them that something useful began to emerge.

Online demo:
------------
[HTML5 Offline App template Demo](http://bit-taming.com/content/projects/appcachetest/example1.html)

Install/View:
-------------
* Download and copy these files to some sub-folder of your web server. Browse to `./example1.html`
* Alternatively, simply view the app [here](http://bit-taming.com/content/projects/appcachetest/example1.html).

Details:
--------
* Because the html header tag contains the string `manifest="example1.manifest"`, complying browsers will cache the resources 
listed in example1.manifest.
* This means that subsequent refreshes of the page will NOT result in the resources listed being re-fetched from the server, 
UNLESS example1.manifest is modified OR the offline cache is manually cleared.
* Hence the app can be used in situations where there is no connection to the server.
* Try it and see: disconnect from the internet and refresh the page. 
* Also, reconnect to the internet, modify some copy on the page, browse and click "Check for updates". This forces the app to
 update it's cache, and refresh the page, but only if `example1.manifest` had been modified first.
* "Add a record" adds an item to `records` in LocalStorage. If the app is online then the entire contents of `records` will
 also be uploaded. (I'll let you provide the actual upload code!)
* If the app is offline then no upload is performed. However, upon detection of being online, the app will fetch `records` 
from LocalStorage and perform the upload. This is done in the `online` event handler in example.js. Try it and see!
* Messages are logged to the right hand panel to make the underlying process clearer.  


Successfully tested on:
-----------------------
* Chrome (v.23) on MacOS
* Safari on iPad (iOS v.6.0)


Issues/problems testing on:
---------------------------
* Android (v.2.2) native browser: The cache doesn't seem to be getting created, though the 
`navigator.onLine` / `navigator.offLine` functionality appears to be OK 


TODO list:
----------
* Implement a cookie workaround for those using Internet Explorer 9 and below. Here is a guide:
[Best practices for a faster web app with HTML5](http://www.html5rocks.com/en/tutorials/speed/quick/)
* Find a workaround for the Android (v2.2) issue above
* Implement authentication


The following concepts and resources were found to be useful:
-------------------------------------------------------------
* [The HTML5 Offline Web Application API](https://developer.mozilla.org/en-US/docs/HTML/Using_the_application_cache)
* [The HTML5 Web Storage API](http://diveintohtml5.info/storage.html)
* [Best practices for a faster web app with HTML5](http://www.html5rocks.com/en/tutorials/speed/quick/)
* Chapter 10 of [Pro HTML5 Programming (Lubbers, et al)](http://www.amazon.com/Pro-HTML5-Programming-Application-Development/dp/1430227907)
provided the caching and storage smarts behind the page.
* This [NET Mag tutorial](http://media.netmagazine.futurecdn.net/files/imagecache/shop_item/gallery/magazine/2012/07/NET231.tut_resp.jpg)
provided the responsive smarts behind the page.
* Chapter 1 of [Web Development Recipes (Hogan, et al)](http://www.waterstones.com/waterstonesweb/products/brian+p-+hogan/chris+warren/mike+weber/web+development+recipes/8848417/) 
provided the 100% CSS-generated buttons. 
* [Placekitten](http://placekitten.com/) provided the adorable kitten placeholders.

