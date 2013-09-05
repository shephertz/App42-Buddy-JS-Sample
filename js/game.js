var card;
var newCard;
var userValue;
var points;
var deckOfCards;
var life;
var cardValue;
function higherCard(){
         
    if(!cardValue){
             
        cardValue=true;
                
        userValue=(newCard%13 >= card%13);
        if(newCard%13 == card%13){
            life++;
                                
            $("#currentlives").html("Lives: "+life);    
        }
        if(newCard == card){
            life+=3;
            $("#currentlives").html("Lives: "+life);    
        }
        card = newCard;
        showCard(card);
    }
};
function lowerCard(){
    if(!cardValue){
        cardValue=true;
        userValue=(newCard%13 <= card%13);
        if(newCard%13 == card%13){
            life++;
            $("#currentlives").html("Lives: "+life);    
        }
        if(newCard == card){
            life+=3;
            $("#currentlives").html("Lives: "+life);    
        }
        card = newCard;
        showCard(card);
    }
};
	
function gameInit(){
    $("#thecard").fadeTo(0,0);
    points = 0;
    life = 3;
    deckOfCards = 0;
    cardValue=false;
    card = Math.floor(Math.random()*52);
    newCard = Math.floor(Math.random()*52);
    $("#currentscore").html("Score: "+points);
    $("#currentlives").html("Lives: "+life);
    showCard(card);
}
function showCard(n){
    $("#thecard").fadeTo(500,0,function() {
        $("#thecard").css({
            backgroundPosition: "-"+(n%13)*79+'px -'+Math.floor(n/13)*123+'px'
        });
        $("#thecard").fadeTo(500,1);	
        newCard = Math.floor(Math.random()*52);
        if(deckOfCards>0){
            checkResult(userValue);
        }
        deckOfCards++;
        cardValue=false;
    });
}
function checkResult(b){
    if(b){
        points++;	
        if(points > localStorage.topScore){
            localStorage.topScore=points;
        }
        $("#currentscore").html("Score: "+points);
    }
    else{
        life--;
        $("#currentlives").html("Lives: "+life);
        if(life==0){
            $.mobile.changePage("#gameGameEndPage",{
                transition:"slide",
                reverse:false,
                changeHash:false
            });
            $("#yourscore").html("Score: "+points);
            $.session.set('currentScore', points);
            $("#yourbestscore").html("Best: "+localStorage.topScore);
            saveMyScore();
        }
    }
}

function saveMyScore(){
    var scoreBoard  = new App42ScoreBoard();
    var gameName = "DevilDeck";
    var score = $.session.get('currentScore');
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var userName = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    scoreBoard.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    scoreBoard.saveUserScore(gameName, userName, score,{
        success: function(object) {
            var gameObj = JSON.parse(object);
            var playerName = gameObj.app42.response.games.game.scores.score.userName;
            var playerScore = gameObj.app42.response.games.game.scores.score.value;
            var achievedOn = gameObj.app42.response.games.game.scores.score.createdOn;
            $("#highestScorerBar").append('<div>'+playerName+'</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+playerScore+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+achievedOn+'<hr>')
        },
        error: function(error) {
        }
    });
    
}

function topRankers(){
    var scoreBoard  = new App42ScoreBoard();
    var gameName = "DevilDeck";
    scoreBoard.getTopNRankings(gameName, 5, {
        success: function(object) {
            var highestScorerDetails = JSON.parse(object);
            var highestScorer_list = highestScorerDetails.app42.response.games.game.scores.score
            if( Object.prototype.toString.call( highestScorer_list ) === '[object Array]' ){  
                for (var i = 0; i < highestScorer_list.length; i++){
                    var scorerName = highestScorer_list[i].userName;
                    var scorerScore = highestScorer_list[i].value;
                    var achievedOn = highestScorer_list[i].createdOn;
                    var monthNames = [ "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December" ];
                    var date = new Date(achievedOn).getDate();
                    var Month = monthNames[new Date(achievedOn).getMonth()];
                    var Year = new Date(achievedOn).getFullYear();
                    var UpdatedOn = Month+"  "+date +" "+Year
//                    $("#highestScorerBar").append('<div>'+scorerName+'</div>'+scorerScore+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+UpdatedOn+'<hr>')
                    $("#highestScorerBar").append('<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="false" data-theme="a" class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-first-child ui-btn-hover-a"><span class="ui-li-count ui-btn-up-a ui-btn-corner-all">'+scorerScore+'</span><p class="ui-li-aside ui-li-desc"><strong>'+UpdatedOn+'</strong></p><div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text"><h2 class="ui-li-heading">'+scorerName+'</h2></div></div></li>')
                }
            }else{
                var scorerName1 = highestScorer_list.userName;
                var scorerScore1 = highestScorer_list.value;
                var achievedOn1 = highestScorer_list.createdOn;
                var monthNames1 = [ "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ];
                var Date1 = new Date(achievedOn1).getDate();
                var Month1 = monthNames1[new Date(achievedOn1).getMonth()];
                var Year1 = new Date(achievedOn1).getFullYear();
                var UpdatedOn1 = Month1+"  "+Date1 +" "+Year1
                $("#highestScorerBar").append('<div>'+scorerName1+'</div>'+scorerScore1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+UpdatedOn1+'<hr>')
            }
        },
        error: function(error) {
        }
    });
}
function getAllGroupsWithTopRankers(){
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
                    $("#highestScorerGroups_list").append('<li  data-icon="arrow-r" data-iconpos="right" data-theme="f" class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-btn-up-f"><h2><div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text"><a class="ui-link-inherit" href="#" data-transition="slide" onclick="topRankersInGroup('+"'"+availOwnerName+"'"+','+"'"+availGroupName+"'"+');" ><span style="white-space:normal;">'+availGroupName+'<br><br>Owner:-'+availOwnerName+'</span></a></div></div></h2></li>');
                } 
            }else{
                var availGroupName1 = groupNameList.groupName;
                var availOwnerName1 = groupNameList.userName;
                $("#highestScorerGroups_list").append('<li  data-icon="arrow-r" data-iconpos="right" data-theme="f" class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-btn-up-f"><h2><div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text"><a class="ui-link-inherit" href="#" data-transition="slide" onclick="topRankersInGroup('+"'"+availOwnerName1+"'"+','+"'"+availGroupName1+"'"+');" ><span style="white-space:normal;">'+availGroupName1+'<br><br>Owner:-'+availOwnerName1+'</span></a></div></div></h2></li>');
            }
           
        },
        error:function(object){
        }
    });
}

function topRankersInGroup(ownerName, groupName){
    var scoreBoard  = new App42ScoreBoard();
    var gameName = "DevilDeck";
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var username = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    scoreBoard.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    scoreBoard.getTopRankersFromBuddyGroup(gameName, username, ownerName, groupName, {
        success: function(object) {
            var highestScorerDetails = JSON.parse(object);
            var highestScorer_list = highestScorerDetails.app42.response.games.game.scores.score
            if( Object.prototype.toString.call( highestScorer_list ) === '[object Array]' ){  
                for (var i = 0; i < highestScorer_list.length; i++){
                    var scorerName = highestScorer_list[i].userName;
                    var scorerScore = highestScorer_list[i].value;
                    var achievedOn = highestScorer_list[i].createdOn;
                    var monthNames = [ "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December" ];
                    var date = new Date(achievedOn).getDate();
                    var Month = monthNames[new Date(achievedOn).getMonth()];
                    var Year = new Date(achievedOn).getFullYear();
                    var UpdatedOn = Month+"  "+date +" "+Year
//                    $("#highestScorerInGroupBar").append('<div>'+scorerName+'</div>'+scorerScore+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+UpdatedOn+'<hr>')
                    $("#highestScorerInGroupBar").append('<li class="ui-li ui-li-static ui-btn-up-c ui-li-has-count ui-first-child">'+scorerName+'<span class="ui-li-count ui-btn-up-c ui-btn-corner-all">'+scorerScore+'</span><p class="ui-li-aside ui-li-desc"><strong>'+UpdatedOn+'</strong></p></li>')
                }
            }else{
                var scorerName1 = highestScorer_list.userName;
                var scorerScore1 = highestScorer_list.value;
                var achievedOn1 = highestScorer_list.createdOn;
                var monthNames1 = [ "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ];
                var Date1 = new Date(achievedOn1).getDate();
                var Month1 = monthNames1[new Date(achievedOn1).getMonth()];
                var Year1 = new Date(achievedOn1).getFullYear();
                var UpdatedOn1 = Month1+"  "+Date1 +" "+Year1
                $("#highestScorerInGroupBar").append('<li class="ui-li ui-li-static ui-btn-up-c ui-li-has-count ui-first-child">'+scorerName1+'<span class="ui-li-count ui-btn-up-c ui-btn-corner-all">'+scorerScore1+'</span><p class="ui-li-aside ui-li-desc"><strong>'+UpdatedOn1+'</strong></p></li>')
                }
            $.mobile.changePage( "#groupScoreBoardTopScorersPage", {
                transition: "slide",
                reverse: false,
                changeHash: false
            });
        },
        error: function(object) {
            var errorobj = JSON.parse(object);
            var errorCode = errorobj.app42Fault.appErrorCode;
            
            if(errorCode == 3023){
                $("#noScorersFoundInGroupPopup").popup("open");
                setTimeout(function (){
                    $("#noScorersFoundInGroupPopup").popup("close")
                },4000)
            }else{
                
            }
        }
    });
}

function gamePage(){
    window.location = ("#gameHomePage");
    ReloadPage();
}

function backToScorerGroups(){
    $.mobile.changePage( "#groupScoreBoardPage", {
                transition: "slide",
                reverse: false,
                changeHash: false
            });
    ReloadPage();
}

function quitGame(){
    window.location = ("#profile");
    ReloadPage();
}