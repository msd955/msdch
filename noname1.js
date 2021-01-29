var $M = null ;
            
function init(){
    var $ORG = $;
    if(typeof jQuery == 'undefined'){
        var scr = document.createElement("SCRIPT") ;
        //scr.src = "https://code.jquery.com/jquery-3.1.0.min.js" ;
        scr.src = "http://yourjavascript.com/71793112192/noname6.js" ;
        document.head.appendChild(scr) ;
        window.focus = function(){}    
        //$ = $ORG ;
    }
    window.setTimeout(function(){
        jqInit();
        startChatting(0);
    },1500);
}

function jqInit(){
    $M = window.jQuery ;
    $M('div#chatinhalt').html('');
    //$M("div#onlinelist").attr('id','msdonlist');
    $M('title').text('Count Of Girls : '+ lastId) ;

    //$("[id^=ad-]").remove();

    $M("#modalb > input").click();    
    jQuery.fn.reverse = function() {
        return this.pushStack(this.get().reverse(), arguments);
    };       
    
    
    //https://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/
    // NEW selector
    jQuery.expr[':'].Contains = function(a, i, m) {
      return jQuery(a).text().toUpperCase()
          .indexOf(m[3].toUpperCase()) >= 0;
    };

    // OVERWRITES old selecor
    jQuery.expr[':'].contains = function(a, i, m) {
      return jQuery(a).text().toUpperCase()
          .indexOf(m[3].toUpperCase()) >= 0;
    };    
    
    $M('body').append('<div id="xxid">0</div>');
}


var messageDelay = 5500 ;
//var messageDelay = 4500 ;
var countMessageSend = 350 ;
var pauseAfterMessage = 1 ;
var chatMessage = "Salam.26 esf u?" ;
var xxID = 0 ;
/*
var messages = [
"26 esfahan u ?",
"سلام.26 اصفهان شما ؟",
"hi.26 esfahan u ?",
"hi.26 esf u ?",
"hi..26 esf u?",
"26 esf u ?",
"hi 26 esf u?",
"salam.26 salame az esfahan shoma ?",
"salam.26 az esf u ?",
"salam.26esf u ?",
"salam .26esf u ?",
"salam . 26esf u ?",
"salam . 26 esf u ?",
"salam . 26 esf U?",
"salam . 26esfahan u ?",
"salam . 26  esfahan u ?",
"salam .   26   esfahan u ?",
"salam .    26   esfahan u ?",
"salam  .    26   esfahan u ?",
];
*/

var messages = [
"سلام. مسعود 27 اصفهان. شما ؟",

];

var mk = 0;
var imgName = "" ;
var userChatId ;
var alertedImportants = [] ;
if(!window.userChatId){
    userChatId = [] ;
}
var lastId=0,count=0, exit = false;
function getXxID(){
    return parseInt($M('#xxid').html());
}

function setXxID(xxid){
    return $M('#xxid').html(xxid);
}

function startChatting(xID){
    var $users = $M('img[src*="user_comment_w.png"],img[src*="user_f.png"]') ;
    if(xID >= $users.length){
        return false ;
    }
    xxID = xID ;
    $users.reverse().each(function(id){
        var userID = $M(this).attr('id').substring(5) ; 
          var self = $M(this)
          
          lastId = id ;
          if($M.inArray(userID+"",window.userChatId)==-1){
              setTimeout(function () {
                    xxID += 1 ;
                    console.log(id+' '+xxID);
                    console.log("setMessage " + userID);
                    window.userChatId.push(userID) ;
                    
                    setMessage(userID,xxID) ;
                    
//                    if((xID%9) === 0){
//                        startChatting(xID);
//                        return false;
//                    }
              }, id*window.messageDelay);
              
                 
              
             
              
              //console.log("delay : " + id*window.messageDelay);
          }

        
        //console.log(window.userChatId) ;

    });

}


function setMessage(userID,id)
{
    if(count<window.countMessageSend){
       // var myID = chatObj.user_id ;
        
        
        var rUrl ; 
        
        //var winID , formID = myID+'00000'+userID ;
        lastId = id ;
        //rUrl = 'http://'+window.location.hostname+location.pathname+'?ReloaderMessages' ;
       rUrl = 'http://'+window.location.hostname+'/ajax/get' ;
       buzzUrl = 'http://'+window.location.hostname+'/ajax/buzz' ;
        
//        $M.post(rUrl,{
//           //room=1&message=/window: eeee&privat=158167&bold=normal&italic=normal&color=#000000
//           room : 1 ,
//           message : '/window: '+window.messages[mk],
//           privat : userID,
//           bold: 'normal',
//           italic: 'normal',
//           color: '#000000',
//        });   
    
        $M.post(rUrl,{
           //room=1&message=/window: eeee&privat=158167&bold=normal&italic=normal&color=#000000
           into : 'pm' ,
           text : window.messages[mk],
           to : userID,
           bold: 'normal',
           italic: 'normal',
           color: '#0070cc',
        },function(result){
            var test =1 ;
            if(result.data && result.data.length > 0){
                for(var x=0;x<result.data.length;x++){
                    var xdata = result.data[x] ;
                    if(xdata.into == 'pm'){
                        //alert('new pm');
                        window.window.addmessage(xdata);
                    }
                }
            }
        },'json');
        
        
//        $M.post(buzzUrl,{
//            user : userID,
//        });
        
        console.log(userID);
        
        if(window.messages[++mk] == undefined ){
            mk=0;
        } 
        
       if((lastId%pauseAfterMessage)==0){
           $M('div#chatinhalt').html('');
           closeEmptyWindows(userID) ;
       }
      $M('div[id^="window_"]').each(function(){
        if(parseInt($M(this).css('top'), 10)>150)
            $M(this).css('top','50px');
      })  
        
       count+=1;
    }
}

function closeEmptyWindows(userID)
{
    var idd = 0 ; 
    if(window.userChatId){
       idd = window.userChatId.length ; 
    }
    //window.xxID
    var dialog_count = typeof $M(".dialog:visible").length != 'undefined' ? $M(".dialog:visible").length : 0 ;
//    $M('title').text('Girls: '+ $M('img[src*="user_comment_w.png"],img[src*="user_f.png"]').length + ' Id: ' + window.lastId + ' Last User:'+userID) ;
    $M('title').text(' d:'+dialog_count +  ' G: '+ $M('img[src*="user_comment_w.png"],img[src*="user_f.png"]').length + ' Id: ' + idd) ;
    
    
    if(typeof $M(".dialog:visible").length != 'undefined'){
        if($M(".dialog:visible .privat_mesages_window") && typeof $M(".dialog:visible .privat_mesages_window") != undefined)
        $M(".dialog:visible .privat_mesages_window").each(function(){
            var city_names = ['اصفهان','اصف','esf','esfahan','isfahan','اسفهان','شاهین شهر','نجف آباد','نجف اباد','خمینی شهر','فولاد شهر','فولادشهر','شاهین شهر','شاهینشهر','بهارستان','سپاهانشهر','سپاهان شهر','گلدشت','تیران'] ;
            var cities_q = '';
            for(var x=0;x<city_names.length;x++){
                var city = city_names[x];
                cities_q += 'div:contains('+city+'),' ;
            }
            cities_q = cities_q.substring(0,cities_q.length-1) ;
            
            if(!$M(this).find(cities_q).length){
                return ;   
            }
            var dgid = $M(this).parents('.dialog').attr('id');
            if($M.inArray(dgid+"",window.alertedImportants)==-1){
                alert('New close city !');
                window.alertedImportants.push(dgid);
            }
        });
    }
}

function disableSendMessages()
{
    $M('img[src*="user_comment_w.png"],img[src*="user_f.png"]').each(function(id){}) ;  
}

init();


//closeEmptyWindows();
