function onPageLoad()
{	 
topRankers();
getAllGroupsWithTopRankers();
getAllBuddyGroupsForSharingNote();
getAllBuddyGroupsForSharingScore();
getAllBuddiesForSharingScore();
friendProfile();
getAllBuddyGroups();
allAppUsers();
getAllBuddies();
getBuddy();
getAllGroupsWithBuddies();
getAllphotos();
getAllNotifications();
getRequest();
gameInit();
if(!window.navigator.standalone){
}
if(localStorage.topScore==undefined){
	localStorage.topScore=0;	
}
}