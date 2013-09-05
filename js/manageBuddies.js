/* 
 * For Managing BuddyManagement Service.
 */


/* 
 * Send Friend Request To Existing Buddy_App User.
 * By Using App42Buddy Service (sendFriendRequest).
 */
function sendFriendRequest(){
    var buddy = new App42Buddy();   //Initialize "buddy" As New App42Buddy.
    var buddyName = $.session.get('nameViaRequestPage');  // Getting Friend's Name From Local Storage, Through Friends Profile. 
    var message = "HI... Wanna Be My Friend ?";
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var username = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.sendFriendRequest(username, buddyName, message, {  //Send Friend Request To Friend.
        success:function(object){
            var requestObj = JSON.parse(object)
            var friendName = requestObj.app42.response.buddies.buddy.userName
            var friendMessage = requestObj.app42.response.buddies.buddy.message
            $("#friendRequest_list").append('<li><a href="#">'+friendName+''+friendMessage+'</a></li>');
            
            $("#successSendFriendRequestPopup").popup("open");
            setTimeout(function (){
                $("#successSendFriendRequestPopup").popup("close")
                window.location = ('#friendProfile');
            },3000)
        },
        error:function(object){
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
            if(errorCode == 4601){
                $("#friendRequestAlreadySendedPopup").popup("open");
                setTimeout(function (){
                    $("#friendRequestAlreadySendedPopup").popup("close")
                },2000)
                
            }else if(errorCode == 4613){
                $("#alreadyFriendPopup").popup("open");
                setTimeout(function (){
                    $("#alreadyFriendPopup").popup("close")
                },3000)
               
            }else if(errorCode == 4614){
                $("#pendingForApprovalPopUp").popup("open");
                setTimeout(function (){
                    $("#pendingForApprovalPopUp").popup("close")
                },5000)
               
            }else{
                
            }
        }
    }); 
}

/* 
 * Get Friend Requests Of Existing Buddy_App Users.
 * By Using App42Buddy Service (getFriendRequest).
 */
function getRequest(){
    var buddy = new App42Buddy();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var username = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.getFriendRequest(username, { // Get Requests Of Persons, Who Wants To Be Friend With Current LoggedIn User.
        success:function(object){
            var requestObj = JSON.parse(object)
            var friendList = requestObj.app42.response.buddies.buddy
            if( Object.prototype.toString.call( friendList ) === '[object Array]' ){
                for (var i = 0; i < friendList.length; i++){   // Showing Friend Requests In ListView, With A Dialog Have Options "Accept" Or "Reject" Friend Request.
                    var friendName = friendList[i].buddyName;
                    $("#friendRequest_list").append('<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="false" data-iconpos="right" data-theme="a" class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-btn-up-c"><a href="#"><h2><div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text"><a class="ui-link-inherit" href="#friendProfile" onclick="friendProfile('+"'"+friendName+"'"+');" ><img class="profileImageThumbnail" id="friendRequestImage" src="profilePic/boy.png"/><span style="white-space:normal;">'+friendName+'</span></a></div></div></h2></a><a href="#confirmRequestPopUp" id="remove" data-rel="popup" data-position-to="origin" data-transition="flow" onclick = "getFriendName('+"'"+friendName+"'"+');"  title="Accept & Reject" class="ui-li-link-alt ui-btn ui-btn-up-f" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="span" data-icon="false" data-iconpos="false" data-theme="f"><span class="ui-btn-inner"><span class="ui-btn-text"></span><span data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="menu" data-iconpos="notext" data-theme="a" title="" class="ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-btn-icon-notext"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text"></span><span class="ui-icon ui-icon-menu ui-icon-shadow">&nbsp;</span></span></span></span></a></li>');
                } 
            }else{
                var friendName1 = friendList.buddyName;
                $("#friendRequest_list").append('<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="false" data-iconpos="right" data-theme="a" class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-btn-up-c"><a href="#"><h2><div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text"><a class="ui-link-inherit" href="#friendProfile" onclick="friendProfile('+"'"+friendName1+"'"+');" ><img class="profileImageThumbnail" id="friendRequestImage" src="profilePic/boy.png"/><span style="white-space:normal;">'+friendName1+'</span></a></div></div></h2></a><a href="#confirmRequestPopUp" id="remove" data-rel="popup" data-position-to="origin" data-transition="flow" onclick = "getFriendName('+"'"+friendName1+"'"+');"  title="Accept & Reject" class="ui-li-link-alt ui-btn ui-btn-up-f" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="span" data-icon="false" data-iconpos="false" data-theme="f"><span class="ui-btn-inner"><span class="ui-btn-text"></span><span data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="menu" data-iconpos="notext" data-theme="a" title="" class="ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-btn-icon-notext"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text"></span><span class="ui-icon ui-icon-menu ui-icon-shadow">&nbsp;</span></span></span></span></a></li>');
            }
           
        },
        error:function(object){
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
                
            if(errorCode == 4602){
                $("#requestsNotFound").show();
            }
            else {
                $("#requestsNotFound").hide();
            }
        }
    });
}

/* 
 * Accept Pending Friend Requests Of Existing Buddy_App Users.
 * By Accepting Friend request, The Buddy_App User Is Added In Your FriendList.
 * By Using App42Buddy Service (acceptFriendRequest).
 */
function acceptRequest(){
    var buddy = new App42Buddy();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var username = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    var buddyName = $.session.get('friendNameForAcceptingRequest');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.acceptFriendRequest(username, buddyName, {  // Accept Friend Request.
        success:function(object){
            var requestObj = JSON.parse(object)
            var friendNameList = requestObj.app42.response.buddies.buddy
            for (var i = 0; i < friendNameList.length; i++){  
                var friendName = friendNameList[i].buddyName;
                $("#Friends_list").append('<li><span style="white-space:normal;">'+friendName+'</span></li>');
            }
            $.mobile.showPageLoadingMsg("a","Friend Request Accepted !...", "a");
            setTimeout(function (){
                $.mobile.hidePageLoadingMsg();
            },2000)
            window.location = ("#getRequestPage");
            setTimeout(function (){
                ReloadPage();
            },1000)
        },
        error:function(object){
        }
    });
}

/* 
 * Reject Pending Friend Requests Of Existing Buddy_App Users.
 * By Rejecting Friend request, The Buddy_App User Is Not Added In Your FriendList.
 * By Using App42Buddy Service (rejectFriendRequest).
 */
function rejectRequest(){
    var buddy = new App42Buddy();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
     var username = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    var buddyName = $.session.get('friendName');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.rejectFriendRequest(username, buddyName, {  // Reject Friend Request.
        success:function(object){
            $.mobile.showPageLoadingMsg("a","Friend Request Rejected !...", "a");
            setTimeout(function (){
                $.mobile.hidePageLoadingMsg();
            },2000)
            window.location = ("#getRequestPage");
            setTimeout(function (){
                ReloadPage();
            },2000)
        },
        error:function(object){
        }
    });
}

/* 
 * Send Friend Request To Existing Buddy_App User From "All App Users Page".
 */
function sendFriendRequestViaAllUsers(){
    var buddy = new App42Buddy();
    var buddyNameViaAllUsersPage = $.session.get('friendNameForSendingRequest');
    var message = "HI... Wanna Be My Friend ?";
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var username = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    var sessionId = (sessionIdViaRegister || sessionIdViaLogin);
    buddy.setSessionId(sessionId);
    buddy.sendFriendRequest(username, buddyNameViaAllUsersPage, message, {
        success:function(object){
            var requestObj = JSON.parse(object)
            var friendName = requestObj.app42.response.buddies.buddy.userName
            var friendMessage = requestObj.app42.response.buddies.buddy.message
            $("#friendRequest_list").append('<li><a href="#">'+friendName+''+friendMessage+'</a></li>');
            $.mobile.showPageLoadingMsg("a","Successfully Sent !...", "a");
            setTimeout(function (){
                $.mobile.hidePageLoadingMsg();
            },2000)
            window.location = ('#viewAllAppUsers');
        },
        error:function(object){
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
            if(errorCode == 4601){
                $.mobile.showPageLoadingMsg("a","Friend Request Is Already Sent To This Person !...", "a");
                setTimeout(function (){
                    $.mobile.hidePageLoadingMsg();
                },2000)
                window.location = ('#viewAllAppUsers');
            }else if(errorCode == 4613){
                $.mobile.showPageLoadingMsg("a","You Are Already Friend With This Person !...", "a");
                setTimeout(function (){
                    $.mobile.hidePageLoadingMsg();
                },2000)
                window.location = ('#viewAllAppUsers');
                }else if(errorCode == 4614){
                $.mobile.showPageLoadingMsg("a","Waiting For Approval, Check Your Friend Requests Tab !...", "a");
                setTimeout(function (){
                    $.mobile.hidePageLoadingMsg();
                },4000)
                window.location = ('#viewAllAppUsers');
            }
            else{
            }
        }
    });
}

/* 
 * Get All Buddies(Friends) Of LoggedIn User.
 * By Using App42Buddy Service (getAllFriends).
 * With Whome User Can Create Groups And Share Updates.
 */
function getAllBuddies (){
    var buddy = new App42Buddy();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var username = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.getAllFriends(username, { // Getting All Friends. 
        success:function(object){
            var requestObj = JSON.parse(object)
            var friendNameList = requestObj.app42.response.buddies.buddy
            if( Object.prototype.toString.call( friendNameList ) === '[object Array]' ){    
                for (var i = 0; i < friendNameList.length; i++){
                    var friendName = friendNameList[i].buddyName;
                    $("#Friends_list").append('<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="false" data-iconpos="right" data-theme="a" class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-btn-up-c"><a href="#"><h2><div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text"><a class="ui-link-inherit" href="#friendProfile" onclick="friendProfile('+"'"+friendName+"'"+');" ><img class="profileImageThumbnail" id="friendRequestImage" src="profilePic/boy.png"/><span style="white-space:normal;">'+friendName+'</span></a></div></div></h2></a><a href="#friendListPopUp" id="remove" data-rel="popup" data-position-to="origin" data-transition="flow"  onclick = "getFriendName('+"'"+friendName+"'"+');"  title="Accept & Reject" class="ui-li-link-alt ui-btn ui-btn-up-f" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="span" data-icon="false" data-iconpos="false" data-theme="f"><span class="ui-btn-inner"><span class="ui-btn-text"></span><span data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="menu" data-iconpos="notext" data-theme="a" title="" class="ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-btn-icon-notext"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text"></span><span class="ui-icon ui-icon-menu ui-icon-shadow">&nbsp;</span></span></span></span></a></li>');
            
                }
            }else{
                var friendName1 = friendNameList.buddyName;
                $("#Friends_list").append('<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="false" data-iconpos="right" data-theme="a" class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-btn-up-c"><a href="#"><h2><div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text"><a class="ui-link-inherit" href="#friendProfile" onclick="friendProfile('+"'"+friendName1+"'"+');" ><img class="profileImageThumbnail" id="friendRequestImage" src="profilePic/boy.png"/><span style="white-space:normal;">'+friendName1+'</span></a></div></div></h2></a><a href="#friendListPopUp" id="remove" data-rel="popup" data-position-to="origin" data-transition="flow"  onclick = "getFriendName('+"'"+friendName1+"'"+');"  title="Accept & Reject" class="ui-li-link-alt ui-btn ui-btn-up-f" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="span" data-icon="false" data-iconpos="false" data-theme="f"><span class="ui-btn-inner"><span class="ui-btn-text"></span><span data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="menu" data-iconpos="notext" data-theme="a" title="" class="ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-btn-icon-notext"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text"></span><span class="ui-icon ui-icon-menu ui-icon-shadow">&nbsp;</span></span></span></span></a></li>');
            }
        },
        error:function(object){
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
                
            if(errorCode == 4604){
                       
                $("#friendsNotFound").show();
            }
            else {
                $("#friendsNotFound").hide();
            }
        }
    });
}

/* 
 * Get All Buddies(Friends) Of LoggedIn User.
 * By Using App42Buddy Service (getAllFriends).
 * With Whome User Can Share Game Score.
 */
function getAllBuddiesForSharingScore(){
    var buddy = new App42Buddy();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var username = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.getAllFriends(username, { // Getting All Friends. 
        success:function(object){
            var requestObj = JSON.parse(object)
            var friendNameList = requestObj.app42.response.buddies.buddy
            if( Object.prototype.toString.call( friendNameList ) === '[object Array]' ){    
                for (var i = 0; i < friendNameList.length; i++){
                    var friendName = friendNameList[i].buddyName;
                    $("#selectFriendForSharingScore").append('<option>'+friendName+'</option>');
            
                }
            }else{
                var friendName1 = friendNameList.buddyName;
                $("#selectFriendForSharingScore").append('<option>'+friendName1+'</option>');
            }
        },
        error:function(object){
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
                
            if(errorCode == 4604){
                       
                $("#friendsNotFound").show();
            }
            else {
                $("#friendsNotFound").hide();
            }
        }
    });
}

/* 
 * Create Group Of Buddies(Friends) By LoggedIn User.
 * By Using App42Buddy Service (createGroupByUser).
 * So That User Can Add Friends To Group And Share Updates With Desired Group Members.
 */
function createBuddyGroup(){
    $("#defaultLoader").show();
    var buddy = new App42Buddy();
    var groupName = $("#buddyGroupName").val();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var username = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.createGroupByUser(username, groupName , {  //Creating Group.
        success:function(object){
            var groupObj = JSON.parse(object)
            var buddyGroupName = groupObj.app42.response.buddies.buddy.groupName
            $("#group_list").append('<li><a href="#">'+buddyGroupName+'</a></li>');
            $("#allGroups_list").append('<li><a href="#">'+buddyGroupName+'</a></li>');
            $("#defaultLoader").hide();
            window.location = ("#viewAllFriends");
            ReloadPage();
        },
        error:function(object){
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
            if(errorCode == 4605){
                $.mobile.showPageLoadingMsg("a","Group With Same Name Is Already Created./ Try Diffrent Name !...", "a");
                setTimeout(function (){
                    $.mobile.hidePageLoadingMsg();
                },3000)
        }
        }
    });
}

/* 
 * Create Group Of Buddies(Friends) By LoggedIn User From All Groups Page.
 */
function createBuddyGroup2(){
   var buddy = new App42Buddy();
    var groupName = $("#buddyGroupName2").val();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var username = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.createGroupByUser(username, groupName, {
        success:function(object){
            var groupObj = JSON.parse(object)
            var buddyGroupName = groupObj.app42.response.buddies.buddy.groupName
            $("#group_list").append('<li><a href="#">'+buddyGroupName+'</a></li>');
            $("#allGroups_list").append('<li><a href="#">'+buddyGroupName+'</a></li>');
            window.location = ("#allGroupsPage");
            ReloadPage();
        },
        error:function(object){
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
            if(errorCode == 4605){
                $.mobile.showPageLoadingMsg("a","Group With Same Name Is Already Created./ Try Diffrent Name !...", "a");
                setTimeout(function (){
                    $.mobile.hidePageLoadingMsg();
                },3000)
        }
        }
    });
}

/* 
 * Add Friend To Group, By LoggedIn User.
 * By Using App42Buddy Service (addFriendToGroup).
 * Adding Friends To Group Makes User To Share Updates With Desired Group Members.
 */
function addBuddyToGroup(groupName){
    var buddy = new App42Buddy();
    var friendNameViaGetName  = $.session.get('friendNameForSharing');
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var username = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.addFriendToGroup(username, groupName, friendNameViaGetName, {
        success:function(object){
            var groupObj = JSON.parse(object)
            var buddyNameInGroup = groupObj.app42.response.buddies.buddy
            $("#friendsInGroup_list").append('<li><a href="#">'+buddyNameInGroup+'</a></li>');
            window.location=("#viewAllFriends");
            setTimeout(function (){
                $("#successfullyAdded").popup("open");
            },1000)
            setTimeout(function (){
                $("#successfullyAdded").popup("close")
            },2000)
        },
        error:function(object){
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
                
            if(errorCode == 4610){
                window.location=("#viewAllFriends");
                setTimeout(function (){
                    $("#alreadyAdded").popup("open");
                },1000)
                setTimeout(function (){
                    $("#alreadyAdded").popup("close")
                },3000)       
            }
            else {
                
            } 
        }
    });
}

/* 
 * Get All Groups, For The Purpose Of Adding friends. 
 * Showing Only Those Groups Which Are Created By LoggedIn User,
 * Because Only Owner Of The Group Has Rights To Add Friends In his/her Group. 
 * By Using App42Buddy Service (getAllGroups).
 */
function getAllBuddyGroups(){
    var buddy = new App42Buddy();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var username = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.getAllGroups(username, {  // Getting Only Those Groups Which Are Created By The LoggedIn User.
        success:function(object){
            var groupObj = JSON.parse(object)
            var groupNameList = groupObj.app42.response.buddies.buddy
            if( Object.prototype.toString.call( groupNameList ) === '[object Array]' ){    
                for (var i = 0; i < groupNameList.length; i++){
                    var availGroupName = groupNameList[i].groupName;
                    var availGroupOwnerName = groupNameList[i].userName;
                    if(userNameThroughLogin == availGroupOwnerName  || userNameThroughRegister == availGroupOwnerName){
                        $("#group_list").append('<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="false" data-iconpos="right" data-theme="a" class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-btn-up-c"><a href="#"><h2><div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text"><a class="ui-link-inherit" href="#" onclick="addBuddyToGroup('+"'"+availGroupName+"'"+');" ><span style="white-space:normal;">'+availGroupName+'<br><br>Owner:-'+availGroupOwnerName+'</span></a></div></div></h2></a></li>');
                    }else{
                        
                    }
                }
            }else{
                var availGroupName1 = groupNameList.groupName;
                var availGroupOwnerName1 = groupNameList.userName;
                if(userNameThroughLogin == availGroupOwnerName1  || userNameThroughRegister == availGroupOwnerName1){
                    $("#group_list").append('<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="false" data-iconpos="right" data-theme="a" class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-btn-up-c"><a href="#"><h2><div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text"><a class="ui-link-inherit" href="#" onclick="addBuddyToGroup('+"'"+availGroupName1+"'"+');" ><span style="white-space:normal;">'+availGroupName1+'<br><br>Owner:-'+availGroupOwnerName1+'</span></a></div></div></h2></a></li>');
         
                }else{
                        
                }
                
               
            }
        },
        error:function(object){
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
                
            if(errorCode == 4609){
                       
                $("#groupsNotFound").show();
            }
            else {
                $("#groupsNotFound").hide();
            }
        }
    });
}

/* 
 * Get All Groups, 
 * Showing The Groups Which Are Created By LoggedIn User, 
 * As Well As Groups In Which The LoggedIn User Is Added By Friends. 
 * By Using App42Buddy Service (getAllGroups).
 */
function getAllGroupsWithBuddies(){
    var buddy = new App42Buddy();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var username = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.getAllGroups(username, { // Getting All Groups.
        success:function(object){
            var groupObj = JSON.parse(object)
            var groupNameList = groupObj.app42.response.buddies.buddy
            if( Object.prototype.toString.call( groupNameList ) === '[object Array]' ){
                for (var i = 0; i < groupNameList.length; i++){
                    var availGroupName = groupNameList[i].groupName;
                    var availOwnerName = groupNameList[i].userName;
                    $("#allGroups_list").append('<li  data-icon="arrow-r" data-iconpos="right" data-theme="f" class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-btn-up-f"><h2><div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text"><a class="ui-link-inherit" href="#" data-transition="slide" onclick="getBuddiesInGroup('+"'"+availOwnerName+"'"+','+"'"+availGroupName+"'"+');" ><span style="white-space:normal;">'+availGroupName+'<br><br>Owner:-'+availOwnerName+'</span></a></div></div></h2></li>');
                } 
            }else{
                var availGroupName1 = groupNameList.groupName;
                var availOwnerName1 = groupNameList.userName;
                $("#allGroups_list").append('<li  data-icon="arrow-r" data-iconpos="right" data-theme="f" class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-btn-up-f"><h2><div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text"><a class="ui-link-inherit" href="#" data-transition="slide" onclick="getBuddiesInGroup('+"'"+availOwnerName1+"'"+','+"'"+availGroupName1+"'"+');" ><span style="white-space:normal;">'+availGroupName1+'<br><br>Owner:-'+availOwnerName1+'</span></a></div></div></h2></li>');
            }
           
        },
        error:function(object){
        }
    });
}

/* 
 * Get All Friends In An Desired Group, 
 * By Using App42Buddy Service (getAllFriendsInGroup).
 */
function getBuddiesInGroup(ownerName, groupName){
   var buddy = new App42Buddy();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var username = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.getAllFriendsInGroup(username, ownerName, groupName, {  //Getting All Friends In An Particular Group.
        success:function(object){
            var groupObj = JSON.parse(object)
            var groupNameList = groupObj.app42.response.buddies.buddy
            if( Object.prototype.toString.call( groupNameList ) === '[object Array]' ) {
                for (var i = 0; i < groupNameList.length; i++){
                    var availBuddyName = groupNameList[i].buddyName;
                    $("#friendsInGroup_list").append('<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="false" data-iconpos="right" data-theme="a" class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-btn-up-c"><a href="#"><h2><div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text"><a class="ui-link-inherit" href="#" onclick="" ><span style="white-space:normal;">'+availBuddyName+'</span></a></div></div></h2></a></li>');
                }
            }else{
                var availBuddyNamen = groupNameList.buddyName;
                $("#friendsInGroup_list").append('<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="false" data-iconpos="right" data-theme="a" class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-btn-up-c"><a href="#"><h2><div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text"><a class="ui-link-inherit" href="#" onclick="" ><span style="white-space:normal;">'+availBuddyNamen+'</span></a></div></div></h2></a></li>');
           }
            window.location = ("#friendsInGroupPage");
            $("#friendsInGroup_list").listview("refresh");   
        },
        error:function(object){
            var errorobj = JSON.parse(object);
            var errorCode = errorobj.app42Fault.appErrorCode;
            
            if(errorCode == 4611){
                $("#noFriendsFoundPopup").popup("open");
                setTimeout(function (){
                    $("#noFriendsFoundPopup").popup("close")
                },4000)
            }else{
                
            }
        }
    });
}

/* 
 * Get All Groups, For The Purpose Of Sharing Notification With Group.
 */
function getAllBuddyGroupsForSharingNote(){
   var buddy = new App42Buddy();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var username = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.getAllGroups(username, {   // Getting All groups.
        success:function(object){
            var groupObj = JSON.parse(object)
            var groupNameList = groupObj.app42.response.buddies.buddy
            if( Object.prototype.toString.call( groupNameList ) === '[object Array]' ){    
                for (var i = 0; i < groupNameList.length; i++){
                    var currentGroupName = groupNameList[i].groupName;
                    var currentOwnerName = groupNameList[i].userName;
                
                    $("#selectGroup_list").append('<div id ="'+currentGroupName+'" style="display:none;">'+currentOwnerName+'</div><option>'+currentGroupName+'</option>');
          
                }
            }else{
                var currentGroupName1 = groupNameList.groupName;
                var currentOwnerName1 = groupNameList.userName;
                $("#selectGroup_list").append('<div id ="'+currentGroupName1+'" style="display:none;">'+currentOwnerName1+'</div><option>'+currentGroupName1+'</option>');
            }
            var myselect = $("select#selectGroup_list");
            //myselect[0].selectedIndex = 2;
            myselect.selectmenu("refresh");
        },
        error:function(object){
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
                
            if(errorCode == 4609){
                       
                $("#groupsNotFound").show();
            }
            else {
                $("#groupsNotFound").hide();
            }
        }
    });
}

/* 
 * Get All Groups, 
 * Showing The Groups Which Are Created By LoggedIn User, 
 * As Well As Groups In Which The LoggedIn User Is Added By Friends. 
 * For Sharing Game Score With Desired Group Members. 
 */
function getAllBuddyGroupsForSharingScore(){
   var buddy = new App42Buddy();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var username = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.getAllGroups(username, {   // Getting All groups.
        success:function(object){
            var groupObj = JSON.parse(object)
            var groupNameList = groupObj.app42.response.buddies.buddy
            if( Object.prototype.toString.call( groupNameList ) === '[object Array]' ){    
                for (var i = 0; i < groupNameList.length; i++){
                    var currentGroupName = groupNameList[i].groupName;
                    var currentOwnerName = groupNameList[i].userName;
                
                    $("#selectGroupForSharingScore").append('<div id ="'+currentGroupName+'" style="display:none;">'+currentOwnerName+'</div><option>'+currentGroupName+'</option>');
          
                }
            }else{
                var currentGroupName1 = groupNameList.groupName;
                var currentOwnerName1 = groupNameList.userName;
                $("#selectGroupForSharingScore").append('<div id ="'+currentGroupName1+'" style="display:none;">'+currentOwnerName1+'</div><option>'+currentGroupName1+'</option>');
            }
            var myselect = $("select#selectGroupForSharingScore");
            //myselect[0].selectedIndex = 2;
            myselect.selectmenu("refresh");
        },
        error:function(object){
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
                
            if(errorCode == 4609){
                       
                $("#groupsNotFound").show();
            }
            else {
                $("#groupsNotFound").hide();
            }
        }
    });
}

/* 
 * This Function Is Used For Setting Names In Local Storage, For Various Purposes.
 */
function getFriendName(friendName){
    var user  = new App42User();
    user.getUser(friendName,{
        success: function(object) {
            var userObj = JSON.parse(object)
            var buddy = userObj.app42.response.users.user.userName
            $.session.set('friendNameForSendingRequest',buddy);
            $.session.set('friendNameForAcceptingRequest',buddy);
            $.session.set('friendName',buddy);
            $.session.set('friendNameForSharing',buddy);
        },
        error: function(error) {
        }
    });
}


function backToGroups(){
    window.location = ("#allGroupsPage");
    ReloadPage();
}

function backToProfile(){
    window.location = ("#profile");
    ReloadPage();
}