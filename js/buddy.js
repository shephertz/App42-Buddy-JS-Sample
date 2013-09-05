/* 
 * For Managing User Service.
 */

/*  
 *  SignUp for new user.
 *  By Using App42 UserService (createUser).
 */
function register(){
    $("#defaultLoader").show();
    var buddy  = new App42User();        // Initialize "buddy" As New App42User.
    var session = new App42Session();   // Initialize "session" As New App42Session.
    var error = "false"
    var userName = $("#userName").val();
    var pwd = $("#userPwd").val();
    var email = $("#userEmail").val();
    var firstName = $("#fName").val();
    var lastName = $("#lName").val();
    
    if(userName == "" || userName == null ){
        error = "true"
        $.mobile.showPageLoadingMsg("a","Please enter UserName !...", "a");
        $("#defaultLoader").hide();
        setTimeout(function (){
            $.mobile.hidePageLoadingMsg();
        },2000)
    }
    else if(pwd == "" || pwd  == null){
        error = "true"
        $("#defaultLoader").hide();
        $.mobile.showPageLoadingMsg("a","Please enter PassWord !...", "b");
        setTimeout(function (){
            $.mobile.hidePageLoadingMsg();
        },2000)
    }
    else if(email == "" || email  == null){
        error = "true"
        $("#defaultLoader").hide();
        $.mobile.showPageLoadingMsg("a","Please enter Email Address !...", "b");
        setTimeout(function (){
            $.mobile.hidePageLoadingMsg();
        },2000)
    }
    else if(firstName == "" || firstName  == null){
        error = "true"
        $("#defaultLoader").hide();
        $.mobile.showPageLoadingMsg("a","Please enter First Name !...", "b");
        setTimeout(function (){
            $.mobile.hidePageLoadingMsg();
        },2000)
    }
    else if(error == "true"){
        ReloadPage();
    }
    else{
        try{
            buddy.createUser(userName, pwd, email,{        // Creating New User.
                success: function(object) {
                    buddy.authenticate(userName, pwd, {        // Authenticate User Through Registration.
                        success: function(object) {
                            var authObj = JSON.parse(object)
                            var sessionId = authObj.app42.response.users.user.sessionId;
                            buddy.setSessionId(sessionId);
                            var logInName = authObj.app42.response.users.user.userName;
                            $.session.set('loggedInName',logInName)         // Storing LoggedIn UserName In Local Storage Through Register.
                            session.setAttribute(sessionId,"loggedInName", logInName,{
                                success: function(object) {
                                    session.getAttribute(sessionId,"loggedInName",{
                                        success: function(object) {
                                            var detailsObj = JSON.parse(object)
                                            var loggedInName = detailsObj.app42.response.session.attributes.attribute.value;
                                            var loggedInSessionId = detailsObj.app42.response.session.sessionId;
                                            $.session.set('loggedInSessionId', loggedInSessionId);       // Storing LoggedIn User SessionId In Local Storage Through Register.
                                            buddy.setFirstName(firstName);
                                            buddy.setLastName(lastName);
                                            buddy.createOrUpdateProfile(userName,{                   // Update User Profile, By Setting his/her FirstName & LastName.
                                                success: function(object) {
                                                    moreDetails(loggedInName, loggedInSessionId); // Calling New Function "moreDetails()",For Getting More Profile Details From User. 
                                                },
                                                error: function(error) {
                                            
                                                },
                                                error: function(error) {
                           
                                                }
                                            }); 
                                           
                                        },
                                        error: function(error) {
                           
                                        }
                                    });
                             
                                },
                                error: function(error) {
                           
                                }
                            });
                       
                        },
                        error: function(error) {
                           
                        }
                    });         
                },
                error: function(error) {
                    var errorObj = JSON.parse(error)
                    var errorCode = errorObj.app42Fault.appErrorCode
                
                    if(errorCode == 2001){          // Showing Error Message For Existing UserName.
                        $("#defaultLoader").hide();
                        $.mobile.showPageLoadingMsg("a","UserName Already Exist / Please Try Again With Different Name !...", "b");
                        setTimeout(function (){
                            $.mobile.hidePageLoadingMsg();
                        },5000)
                    }
                    else if(errorCode == 2005){    // Showing Error Message For Existing Email Id.
                        $("#defaultLoader").hide();
                        $.mobile.showPageLoadingMsg("a","EmailId Already Exist / Please Try Again With Different Email Id !...", "b");
                        setTimeout(function (){
                            $.mobile.hidePageLoadingMsg();
                        },5000)
                    }
                    else{
                        ReloadPage();
                    }
                }
            }); 
        }catch(App42Exception){
        }
    }
}

/*  
 *  Further Extension Of Registration, 
 *  So that User Can Directly Access his/her Profile, 
 *  And Manage his/her Account.
 */
function moreDetails(userName, sessionId){
    var session = new App42Session();
    var buddy = new App42User();
    buddy.getUser(userName,{
        success: function(object) {
            var buddyObj = JSON.parse(object)
            var loggedInEmail = buddyObj.app42.response.users.user.email
            
            var firstName = buddyObj.app42.response.users.user.profile.firstName;
            $("#buddyFirstName").val(firstName);
            $("#buddyDetails_fName").html(firstName);
            var lastName = buddyObj.app42.response.users.user.profile.lastName;
            $("#buddyLastName").val(lastName);
            $("#buddyDetails_lName").html(lastName);
            
            session.setAttribute(sessionId,"logInEmail", loggedInEmail,{
                success: function(object) {
                    session.getAttribute(sessionId,"logInEmail",{
                        success: function(object) {
                            $("#defaultLoader").hide();
                            window.location = ('#editProfile');
                            ReloadPage();
                        }
                    });
                }
            });
        },
        error: function(error) {
        }
    })
}

/*  
 *  LogIn For User.
 *  By Using App42 UserService (authenticate).
 */
function logIn(){
    $("#defaultLoader").show();
    var buddy  = new App42User();      // Initialize "buddy" As New App42User.
    var userName = $("#loginName").val();
    var pwd = $("#loginPwd").val();
    
    if(userName == "" || userName == null){
        $.mobile.showPageLoadingMsg("a","Please enter UserName !...", "a");
        $("#defaultLoader").hide();
        setTimeout(function (){
            $.mobile.hidePageLoadingMsg();
        },2000)
    }else if(pwd == "" || pwd == null){
        $.mobile.showPageLoadingMsg("a","Please enter Password !...", "a");
        $("#defaultLoader").hide();
        setTimeout(function (){
            $.mobile.hidePageLoadingMsg();
        },2000)
    }else {
        try{
            buddy.authenticate(userName, pwd,{      // Authenticate User, Who was Already Created In function "register()".
                success: function(object) {
                    var userAuthObj = JSON.parse(object)
                    var loggedInbuddyName =  userAuthObj.app42.response.users.user.userName;
                    $.session.set('loggedInNameViaLogin', loggedInbuddyName);     // Storing LoggedIn UserName In Local Storage Through LogIn.
                    var loggedInbuddySessionId =  userAuthObj.app42.response.users.user.sessionId;
                    $.session.set('loggedInSessionIdViaLogin', loggedInbuddySessionId);    // Storing LoggedIn User SessionId In Local Storage Through LogIn.
                    $("#defaultLoader").hide();
                    window.location = ("#profile");              
                    ReloadPage();
                    
                },
                error: function(error) {
                    $("#defaultLoader").hide();
                    $.mobile.showPageLoadingMsg("a","UserName/Password incorrect. Please try again !...", "a");
                    setTimeout(function (){
                        $.mobile.hidePageLoadingMsg();
                    },4000)
                }
            }
            ); 
        }
        catch(App42Exception){
            $(".error").show();
            $('#error').html(App42Exception.message);
        }
    }
}

/*  
 *  Get Profile Details Of LoggedIn User.
 *  By Using App42 UserService (getUser).
 */
function getBuddy() {
     $("#defaultAllPagesLoader").show();
    var buddy  = new App42User();
    var buddyNameThroughRegister  = $.session.get('loggedInName');        // Get LoggedIn UserName From Local Storage, If User Is Firstly Visit his/her Profile (Directly Through Registration).
    var buddyNameThroughLogin  = $.session.get('loggedInNameViaLogin');  // Get LoggedIn UserName From Local Storage, Through Login.
    buddy.getUser(buddyNameThroughRegister || buddyNameThroughLogin,{   // Getting User Profile.
        success: function(object) {
            var detailsObj = JSON.parse(object)
            var firstName = detailsObj.app42.response.users.user.profile.firstName;
            $("#buddyFirstName").val(firstName);
            $("#buddyDetails_fName").html(firstName);
            var lastName = detailsObj.app42.response.users.user.profile.lastName;
            $("#buddyLastName").val(lastName);
            $("#buddyDetails_lName").html(lastName);
            $("#ppName").html(firstName+" "+" "+" "+lastName);
            var city = detailsObj.app42.response.users.user.profile.city;
            $("#city").val(city);
            $("#buddyDetails_city").html(city);
            var mobile = detailsObj.app42.response.users.user.profile.mobile;
            $("#mobNo").val(mobile);
            $("#buddyDetails_mobNo").html(mobile);
            var sex = detailsObj.app42.response.users.user.profile.sex;
            $('input[name=radioSex]:checked').val(sex);
            $("#buddyDetails_sex").html(sex);
            var userName = detailsObj.app42.response.users.user.userName;
            $("#loggedInBuddyNamePanel").html(userName);
            $("#loggedInBuddyNamePanel1").html(userName);
            $("#loggedInBuddyNamePanel2").html(userName);
            $("#loggedInBuddyNamePanel3").html(userName);
            $("#loggedInBuddyNamePanel4").html(userName);
            $("#loggedInBuddyNamePanel5").html(userName);
            $("#loggedInBuddyNamePanel6").html(userName);
            var userEmail = detailsObj.app42.response.users.user.email;
            $("#loggedInBuddyEmailPanel").html(userEmail);
            $("#loggedInBuddyEmailPanel1").html(userEmail);
            $("#loggedInBuddyEmailPanel2").html(userEmail);
            $("#loggedInBuddyEmailPanel3").html(userEmail);
            $("#loggedInBuddyEmailPanel4").html(userEmail);
            $("#loggedInBuddyEmailPanel5").html(userEmail);
            $("#loggedInBuddyEmailPanel6").html(userEmail);
            
            var buddyProfilePic = detailsObj.app42.response.users.user.profile.officeLandLine;
            if (buddyProfilePic == null)
            {
                document.getElementById("myprofilepic").src = "profilePic/boy.png";
            }else
            {
                document.getElementById("myprofilepic").src = buddyProfilePic;
            }
           
             
        },
        error: function(error) {
        }
    });
}

/*  
 *  Update Profile Details Of LoggedIn User.
 *  By Using App42 UserService (createOrUpdateProfile).
 */
function saveProfile(){
    $("#defaultLoader").show();
    var buddy  = new App42User();
    var buddyNameThroughRegister  = $.session.get('loggedInName');
    var buddyNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    myProfile(buddy);                                                                  // Getting Updated Values From function "myProfile()".
    buddy.createOrUpdateProfile(buddyNameThroughRegister || buddyNameThroughLogin,{   // Updating User Profile.
        success: function(object) {
            getBuddy();                                                             // Getting Updated Details.
            $("#defaultLoader").hide();
            window.location = ("#profile");
            ReloadPage();                                                        // Reloading Page So That Changes Will Take effect.
        },
        error: function(error) {
        }
    });
}

/*  
 *  Getting New Values From "Manage Profile Page", For Updating Profile Details Of LoggedIn User.
 */
function myProfile(userObj){
    //Getting Values.
    var frstName = $("#buddyFirstName").val();
    var lstName = $("#buddyLastName").val();
    var mobNo = $("#mobNo").val();
    var city = $("#city").val();
    var sex = $('input[name=radioSex]:checked').val();
    var profilePic = $.session.get('profilePicViaUpload');
    var profilePicName = $.session.get('profilePicNameViaUpload');
    //Setting Values In User Profile.
    userObj.setFirstName(frstName);
    userObj.setLastName(lstName);
    userObj.setSex(sex);
    userObj.setDateOfBirth(new Date());
    userObj.setCity(city);
    userObj.setMobile(mobNo);
    userObj.setOfficeLandLine(profilePic);
    userObj.setHomeLandLine(profilePicName);
}

/*  
 *  LogOut User.
 *  By Using App42 SessionService (invalidate).
 *  And Clearing LocalStorage.
 */
function logOut(){
    $("#defaultLoader").show();
    var session = new App42Session();
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    session.invalidate(sessionIdViaRegister || sessionIdViaLogin,{     // Invalidate Session
        success: function(object) {
            $("#defaultLoader").hide();
            $.session.clear();                                       // Clearing Local Storage.
            window.location = ("#startPage");
            ReloadPage();
        }
    });
}

/*  
 *  Get All "Buddy_App" Existing Users For Making Friends And Sharing.
 *  By Using App42 UserService (getAllUsers).
 *  All Users Are Those persons, Who Are Registered (Through registration) In Buddy_App With Same "API KEY" & "SECRET KEY".
 */
function allAppUsers(){
    var buddy  = new App42User();
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.getAllUsers({     // Getting All Buddy_App Users.
        success: function(object) {
            var userObj = JSON.parse(object)
            var users_list = userObj.app42.response.users.user
            for (var i = 0; i < users_list.length; i++){
                var newUser = users_list[i].userName;
                var newUserProfilePic = users_list[i].profile.officeLandLine;
                if(newUserProfilePic == null){
                    newUserProfilePic = "profilePic/blank.";
                }else{
                    newUserProfilePic = newUserProfilePic;
                }
                if(newUser != userNameThroughLogin && newUser != userNameThroughRegister){    // Showing All Users In Jquery Mobile ListView. 
                    $("#appUsers_list").append('<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="false" data-iconpos="right" data-theme="a" class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-btn-up-c"><a href="#"><h2><div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text"><a class="ui-link-inherit" href="#friendProfile" onclick="friendProfile('+"'"+newUser+"'"+');" ><img class="profileImageThumbnail" id="friendRequestImage" src="'+newUserProfilePic+'"/><span style="white-space:normal;">'+newUser+'</span></a></div></div></h2></a><a href="#allAppUsersPopUp" id="remove" data-rel="popup" data-position-to="origin" data-transition="flow" onclick = "getFriendName('+"'"+newUser+"'"+');"  title="Accept & Reject" class="ui-li-link-alt ui-btn ui-btn-up-f" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="span" data-icon="false" data-iconpos="false" data-theme="f"><span class="ui-btn-inner"><span class="ui-btn-text"></span><span data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="menu" data-iconpos="notext" data-theme="a" title="" class="ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-btn-icon-notext"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text"></span><span class="ui-icon ui-icon-menu ui-icon-shadow">&nbsp;</span></span></span></span></a></li>');
           
                }
            }
        },
        error: function(error) {
           
            $.mobile.showPageLoadingMsg("a","No Users", "e");
        }
    }); 
} 

/*  
 *  Profile Of Other Buddy_App Users, For Getting Information About Him/Her.
 */
function friendProfile(friendName){
    var buddy = new App42User;
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    var name = $.session.get('nameViaRequestPage');
    
    if(friendName || name != null){
        buddy.getUser(friendName || name, {
            success:function(object){
                var detailsObj = JSON.parse(object)
                var friendName = detailsObj.app42.response.users.user.userName
                $.session.set('nameViaRequestPage', friendName);
                var firstName = detailsObj.app42.response.users.user.profile.firstName;
                $("#friendsDetails_fName").html(firstName);
                var lastName = detailsObj.app42.response.users.user.profile.lastName;
                $("#friendsDetails_lName").html(lastName);
                $("#friendsPPName").html(firstName+" "+" "+" "+lastName);
                var city = detailsObj.app42.response.users.user.profile.city;
                $("#friendsDetails_city").html(city);
                var mobile = detailsObj.app42.response.users.user.profile.mobile;
                $("#friendsDetails_mobNo").html(mobile);
                var sex = detailsObj.app42.response.users.user.profile.sex;
                $("#friendsDetails_sex").html(sex);
            
                var buddyProfilePic = detailsObj.app42.response.users.user.profile.officeLandLine;   // Getting Avatar URL From "officeLandLine".
                if (buddyProfilePic == null)
                {
                    document.getElementById("myFriendprofilepic").src = "profilePic/boy.png";
                }else
                {
                    document.getElementById("myFriendprofilepic").src = buddyProfilePic;
                }
            },
            error:function(object){
            }
        });
    }else{
        
    }
}
/*  
 *  Reloading Page.
 *  SomeTimes We Need To Reload Page, So That Dynamic Contents Will Take Effect.
 */
function ReloadPage() {
    location.reload();
}
