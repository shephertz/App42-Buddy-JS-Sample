/* 
 *  Managing Multiple Avatar Using App42 Upload And User Service.
 */

/* Upload Avatar For loggedIn User.
 * By Using App42 Upload Service (uploadFileForUser); 
 * Getting Avatar For LoggedIn User.
 * By Using App42 Upload Service (getFileByUser); 
 * So That, The Uploaded Avatar Is Suddenly Shown As Profile pic. 
 */
function uploadProfilePic(){
    $("#chooseFile").hide();
    $("#pageLoader").show();
    var upload = new App42Upload(); // Initialize "upload" As New App42Upload.
    var buddy  = new App42User();
    var imageName = "name"+ new Date().getTime() ;
    var filePath = document.getElementById("filePath");
    var description = "description";
    var fileType = "IMAGE";
    var file = filePath.files[0];
    
    var buddyNameThroughRegister  = $.session.get('loggedInName');
    var buddyNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    upload.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    upload.uploadFileForUser(imageName, buddyNameThroughRegister || buddyNameThroughLogin, file, fileType, description, { // Uploading Avatar.
        success: function(object) {
            upload.getFileByUser(imageName, buddyNameThroughRegister || buddyNameThroughLogin, {                        // Getting Avatar.
                success: function(object) {
                    var fileObj  = JSON.parse(object);
                    var getFileUrl = fileObj.app42.response.upload.files.file.url
                    document.getElementById("myprofilepic").src = getFileUrl;
                    
                    var buddyFileUrl = getFileUrl;
                    $.session.set('profilePicViaUpload',buddyFileUrl);
                    var getFileName = fileObj.app42.response.upload.files.file.name
                    var buddyFileName = getFileName;
                    $.session.set('profilePicNameViaUpload',buddyFileName);
                    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
                    buddy.setHomeLandLine(buddyFileName);     // Setting Avatar Name As "HomeLandLine" In User Profile.
                    buddy.setOfficeLandLine(buddyFileUrl);   // Setting Avatar URL As "OfficeLandLine" In User Profile.
                    myUpdatedProfile(buddy);                // Getting Another(i.e FirstName, LastName, etc.) Profile Values.
                    buddy.createOrUpdateProfile(buddyNameThroughRegister || buddyNameThroughLogin,{   // Update Profile With Old Values And Updated Avatar.
                        success: function(object) {
                            $("#pageLoader").hide();
                            $("#chooseFile").show();
                            $("#successUploadedProfilePic").popup("open");
                            setTimeout(function (){
                                $("#successUploadedProfilePic").popup("close")
                            },3000)
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
    
}

/* Getting Values From User Profile,
 * And Set These Values With Avatar.
 */
function myUpdatedProfile(userObj){
    var frstName = $('#buddyDetails_fName').html();
    var lstName = $('#buddyDetails_lName').html();
    var mobNo = $('#buddyDetails_mobNo').html();
    var city = $('#buddyDetails_city').html();
    var sex = $('#buddyDetails_sex').html();
   
    userObj.setFirstName(frstName);
    userObj.setLastName(lstName);
    userObj.setSex(sex);
    userObj.setCity(city);
    userObj.setMobile(mobNo);
}

/* Get All Photos Of Logged in User, 
 * The Photos, Which Are The User Used As Profile Pics. 
 * By Using App42 Upload Service (getAllFilesByUser); 
 */      
function getAllphotos(){
    var upload = new App42Upload();
    var buddyNameThroughRegister  = $.session.get('loggedInName');
    var buddyNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    upload.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    upload.getAllFilesByUser(buddyNameThroughRegister || buddyNameThroughLogin, {   // Get All Photos.
        success: function(object) { 
            
            var allFilesObj = JSON.parse(object);
            var photos = allFilesObj.app42.response.upload.files.file
            var html = ""
            var ul = $("#iGallery");
            if( Object.prototype.toString.call( photos ) === '[object Array]' ){    
                for (var i in photos){
                    html = "<li><a href='#avatarChangePopUp' data-rel='popup' data-position-to='origin' data-transition='flow' onclick = getAvatar('"+photos[i].url+"')><img src='"+photos[i].url+"' width='100' height='100' /></a></li>"
                    ul.append(html)
                }
            }else{
                var photos1 = allFilesObj.app42.response.upload.files.file
                html = "<li><a href='#avatarChangePopUp' data-rel='popup' data-position-to='origin' data-transition='flow' onclick = getAvatar('"+photos1.url+"')><img src='"+photos1.url+"' width='100' height='100' /></a></li>"
                ul.append(html)
            }
        },
        
        error: function(error) {
          
        }
    });
          
}

/* 
 * Choosing Avatar From All Photos Of LoggedIn User.(Multiple Avatar).
 */
function updatedAvatar(){
    var user  = new App42User();
    var avatarPath = $.session.get('getAvatarUrl');                   // Get New Avatar URL From Local Storage.
    var buddyNameThroughRegister  = $.session.get('loggedInName');
    var buddyNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    user.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    user.setOfficeLandLine(avatarPath);                                          // Update Avatar URL.(By Setting OfficeLandLine).
    myUpdatedProfileForAvatar(user);                                               // Get Remaining Values Of User Profile.
    user.createOrUpdateProfile(buddyNameThroughRegister || buddyNameThroughLogin,{   // Update User Profile With Updated Avatar.
        success: function(object) {
            $.mobile.showPageLoadingMsg("a","Profile Picture Successfully Updated :)", "a");
            setTimeout(function (){
                $.mobile.hidePageLoadingMsg();
            },2000)
            window.location =("#viewAllPhotos");
        },
        error: function(error) {
                             
        }
    });
}


/* 
 * Getting Remaining User Profile Details,
 * And Setting Them To Profile,
 * When The Multiple Avatar Is Updating. 
 */
function myUpdatedProfileForAvatar(userObj){
    var frstName =  $("#buddyFirstName").val();
    var lstName =  $("#buddyLastName").val();
    var mobNo = $('#buddyDetails_mobNo').html();
    var city = $('#buddyDetails_city').html();
    var sex = $('#buddyDetails_sex').html();
   
    userObj.setFirstName(frstName);
    userObj.setLastName(lstName);
    userObj.setSex(sex);
    userObj.setCity(city);
    userObj.setMobile(mobNo);
}

function getAvatar(avatarUrl){
    $.session.set('getAvatarUrl',avatarUrl);
}

	

