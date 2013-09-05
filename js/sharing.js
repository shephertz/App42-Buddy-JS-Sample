/* 
 * For Managing App42Buddy Service.
 */


/* 
 * Identifies That The LoggedIn User Wants To Share Notification With Whome, "Friends" OR "Groups".
 */
function createNote(){
    var shareWithName = $(".mySelect").find(":selected").text();
    if(shareWithName == "Friends"){
        shareNotificationWithFriends ();    // If LoggedIn User Wants To Share Notification With his/her Friends.
       
    }else{
        var owner = document.getElementById(shareWithName).innerHTML;
        shareNotificationWithFriendsInGroup (shareWithName, owner)   // If LoggedIn User Wants To Share Notification With his/her Particular Group Members.
    }
    
}

/* Create Notification,
 * Store Notification.
 * By Using App42 Buddy Service (sendMessageToFriends); 
 * Sharing Notification With All Friends Of LoggedIn User.
 */
function shareNotificationWithFriends (){
    var buddy = new App42Buddy();
    var message = $("#createNotificationBox").val();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.sendMessageToFriends(userNameThroughLogin || userNameThroughRegister, message, {    // Sharing Notification With Friends.
        success: function(object) {
            var messageObj = JSON.parse(object)
            var currentTime = messageObj.app42.response.buddies.buddy.sendedOn
            var timeAndDate = new Date(currentTime);
            var owner = messageObj.app42.response.buddies.buddy.userName
            $("#notificationBar").append('<li>'+message+'</li><br>'+owner+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+timeAndDate+'<hr>')
            window.location = ("#notificationsPage");
            ReloadPage();
        },
        error:function(object){
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
            if(errorCode == 4604){
                $("#noFriendsToSharePopUp").popup("open");
                setTimeout(function (){
                    $("#noFriendsToSharePopUp").popup("close")
                },4000)
            }
            else {
            }
        }
    });
}

/* Create Notification,
* Store Notification.
* By Using App42 Buddy Service (sendMessageToGroup). 
* Sharing Notification With All Friends In An Desired Given Group Of LoggedIn User.
*/
function shareNotificationWithFriendsInGroup(availGroupName, availOwnerName){
    var buddy = new App42Buddy();
    var message = $("#createNotificationBox").val();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.sendMessageToGroup(userNameThroughRegister || userNameThroughLogin, availOwnerName, availGroupName, message,{ // Sharing Notification With All Members of Given Group.
        success: function(object) {
            var messageObj = JSON.parse(object)
            var currentTime = messageObj.app42.response.buddies.buddy.sendedOn
            var timeAndDate = new Date(currentTime);
            var owner = messageObj.app42.response.buddies.buddy.userName
            $("#notificationBar").append('<li>'+message+'</li><br>'+owner+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+timeAndDate+'<hr>')
            window.location = ("#notificationsPage");
            ReloadPage();
        },
        error:function(object){
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
                
            if(errorCode == 4611){
              $("#noFriendsInGroupForSharingPopup").popup("open");
                setTimeout(function (){
                    $("#noFriendsInGroupForSharingPopup").popup("close")
                },4000)
            }else {
               
            }
        }
    });
}
/* Get All Notifications,
 * Notications Which Are Updated By You,
 * As Well As Notifications Which Are Shared By Your Friends For You.
 * By Using App42 Buddy Service (getAllMessages); 
 */
function getAllNotifications(){
    var buddy = new App42Buddy();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.getAllMessages(userNameThroughRegister || userNameThroughLogin,{  // Getting All Notificcations.
        success: function(object) {
            var notificationsObj = JSON.parse(object)
            var notification_list = notificationsObj.app42.response.buddies.buddy
            if( Object.prototype.toString.call( notification_list ) === '[object Array]' ){  
                for (var i = 0; i < notification_list.length; i++){
                    var noteName = notification_list[i].message;
                    var noteCreaterName = notification_list[i].ownerName;
                    var currentTime = notification_list[i].sendedOn;
                    var monthNames = [ "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December" ];
                    var date = new Date(currentTime).getDate();
                    var Month = monthNames[new Date(currentTime).getMonth()];
                    var Year = new Date(currentTime).getFullYear();
                    var UpdatedOn = Month+"  "+date +" "+Year
                    $("#notificationBar").append('<li class="ui-li ui-li-static ui-btn-up-c ui-first-child"><p class="ui-li-aside ui-li-desc"><strong>'+UpdatedOn+'</strong></p><h3 class="ui-li-heading">'+noteCreaterName+'</h3><p class="ui-li-desc"><strong>'+noteName+'</strong></p></li>')
                }
            }else{
                var noteName1 = notification_list.message;
                var noteCreaterName1 = notification_list.ownerName;
                var currentTime1 = notification_list.sendedOn;
                var monthNames1 = [ "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ];
                var Date1 = new Date(currentTime1).getDate();
                var Month1 = monthNames1[new Date(currentTime1).getMonth()];
                var Year1 = new Date(currentTime1).getFullYear();
                var UpdatedOn1 = Month1+"  "+Date1 +" "+Year1
                $("#notificationBar").append('<li class="ui-li ui-li-static ui-btn-up-c ui-first-child"><p class="ui-li-aside ui-li-desc"><strong>'+UpdatedOn1+'</strong></p><h3 class="ui-li-heading">'+noteCreaterName1+'</h3><p class="ui-li-desc"><strong>'+noteName1+'</strong></p></li>')
            }
        },
        error: function(error) {
        }
    }); 
}
/* Share Score With Whome,
 * With A Particular Requested Buddy(friend) Or,
 * All Buddies.
 */
function shareScoreWith(){
   var shareScoreWithValue = $(".selectFriend").find(":selected").text();
   if(shareScoreWithValue == "All Friends"){
       shareScoreWithAllFriends();
   }else{
       shareScoreWithFriend(shareScoreWithValue);
   }
}

/* Share Score With Friend.
 * By Using App42 Buddy Service (sendMessageToFriend); 
 */
function shareScoreWithFriend(friendName){
    var buddy = new App42Buddy();
    var score = $.session.get('currentScore');
    var message = "Hello "+friendName+", Beat My Score In DevilDeck Game: My Score Is -- "+score+" ";
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.sendMessageToFriend(userNameThroughLogin || userNameThroughRegister, friendName, message, {    // Sharing Notification With Friends.
        success: function(object) {
            var messageObj = JSON.parse(object)
            var currentTime = messageObj.app42.response.buddies.buddy.sendedOn
            var timeAndDate = new Date(currentTime);
            var owner = messageObj.app42.response.buddies.buddy.userName
            $("#notificationBar").append('<li>'+message+'</li><br>'+owner+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+timeAndDate+'<hr>')
            $.mobile.showPageLoadingMsg("a","Successfully Shared With "+friendName+" !...", "b");
            setTimeout(function (){
                $.mobile.hidePageLoadingMsg();
            },2000)
            window.location = ("#gameGameEndPage");
        },
        error:function(object){
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
            if(errorCode == 4604){
                $("#noFriendsToSharePopUp").popup("open");
                setTimeout(function (){
                    $("#noFriendsToSharePopUp").popup("close")
                },4000)
            }
            else {
            }
        }
    });
}
/* Share Score With  All Friends.
 * By Using App42 Buddy Service (sendMessageToFriends); 
 */
function shareScoreWithAllFriends(){
    var buddy = new App42Buddy();
    var score = $.session.get('currentScore');
    var message = "Hello All, Beat My Score In DevilDeck Game: My Score Is -- "+score+" ";
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.sendMessageToFriends(userNameThroughLogin || userNameThroughRegister, message, {    // Sharing Notification With Friends.
        success: function(object) {
            var messageObj = JSON.parse(object)
            var currentTime = messageObj.app42.response.buddies.buddy.sendedOn
            var timeAndDate = new Date(currentTime);
            var owner = messageObj.app42.response.buddies.buddy.userName
            $("#notificationBar").append('<li>'+message+'</li><br>'+owner+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+timeAndDate+'<hr>')
            $.mobile.showPageLoadingMsg("a","Successfully Shared With All Friends !...", "b");
            setTimeout(function (){
                $.mobile.hidePageLoadingMsg();
            },2000)
            window.location = ("#gameGameEndPage");
        },
        error:function(object){
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
            if(errorCode == 4604){
                $("#noFriendsToSharePopUp").popup("open");
                setTimeout(function (){
                    $("#noFriendsToSharePopUp").popup("close")
                },4000)
            }
            else {
            }
        }
    });
}

/* Share Score With A Particular Requested Group.
 * By Using App42 Buddy Service (sendMessageToGroup); 
 */
function shareScoreWithFriendsInGroup(){
    var buddy = new App42Buddy();
    var score = $.session.get('currentScore');
    var groupName = $(".selectGroup").find(":selected").text();
    var ownerName = document.getElementById(groupName).innerHTML;
    var message = "Hello,My ("+groupName+") Friends, Beat My Score In DevilDeck Game: My Score Is -- "+score+" ";
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.sendMessageToGroup(userNameThroughLogin || userNameThroughRegister, ownerName, groupName, message, {    // Sharing Notification With Friends.
        success: function(object) {
            var messageObj = JSON.parse(object)
            var currentTime = messageObj.app42.response.buddies.buddy.sendedOn
            var timeAndDate = new Date(currentTime);
            var owner = messageObj.app42.response.buddies.buddy.userName
            $("#notificationBar").append('<li>'+message+'</li><br>'+owner+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+timeAndDate+'<hr>')
            $.mobile.showPageLoadingMsg("a","Successfully Shared With "+groupName+" !...", "b");
            setTimeout(function (){
                $.mobile.hidePageLoadingMsg();
            },2000)
            window.location = ("#gameGameEndPage");
        },
        error:function(object){
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
            if(errorCode == 4611){
                window.location = ("#gameGameEndPage");
                setTimeout(function (){
                    $("#noFriendsInGroupToShareScorePopUp").popup("open");
                },1000)
                setTimeout(function (){
                    $("#noFriendsInGroupToShareScorePopUp").popup("close")
                },6000)
                 
            }
            else {
            }
        }
    });
}
    
    
    