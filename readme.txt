--Readme document for Natalie McDonald, nmcdona1@uci.edu & Davin Makris, dxmakris@uci.edu--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

10/10
- 1/1 Communicating with the webserver
- 1/1 Populating information about the user
- 3/3 Populating the search component
- 3/3 Artist page
- 1.5/1.5 Album page
- 0.5/0.5 Track page


2. How long, in hours, did it take you to complete this assignment?
~ 10 hours each, about 20 total


3. What online resources did you consult when completing this assignment? (list specific URLs)
- We used all of the resources linked in the assignment description, such as:
	https://getbootstrap.com/docs/5.3/components/progress/
	https://getbootstrap.com/docs/5.3/components/carousel/#how-it-works
	https://angular.dev/api/core/@for
	https://developer.spotify.com/documentation/web-api
	https://www.w3schools.com/tags/att_option_selected.asp
- Additional material we used outside of the ones linked in the assignment are:
	https://developer.spotify.com/documentation/web-api/howtos/web-app-profile
	https://www.w3schools.com/html/html_links.asp
	https://www.w3schools.com/bootstrap/bootstrap_progressbars.asp
	https://www.w3schools.com/tags/ref_urlencode.asp
	https://stackoverflow.com/questions/26219670/how-can-i-change-color-of-bootstrap-progress-bar-with-custom-color


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
- We didn't consult any other classmates, only one another


5. Did you add a bonus feature to your submission? If so, what is it and how should we see it?
- We did not add a bonus feature


6. Is there anything special we need to know in order to run your code?
- We found two bugs in our assignment that we're unsure of how to fix:

	The first one has to do with the GNX album by Kendrick Lamar. It appear that there may be two instances of the GNX album. This also seems to be the only album that has two instances, but we haven't checked every single one. The bug is reproducible by:
	Search for the song "luther (with sza)" by track. You will see two instances of this song. Clicking on the "GNX" album link with the ID that starts "1Ss0..." will bring the user to an unknown album page. 
	However, if you simply search for the GNX album, this works as intended. It appears that there are two instances of "luther (with sza)" and one has corrupted data that cannot display. The version of "luther (with sza)" with the corrupted album link is also fetched by the top tracks track-list on the Kendrick Album Page. 


	The second bug has to do with the carousel on the main search page. Since some of the images are smaller/larger than one another, if you search for an artist, click either left or right a few times, and search for a different artist, the images will display on top of one another. However, sometimes scrolling back to the original artist will resolve the error. 
	For example: Search for the "Taylor" and scroll right to "Drake", then search for "Weeknd", and scroll left one, the images will be overlayed on top of one another, such that there are two images showing at the same time. 
