var api = require('./api.js');

module.exports.startRaffleGamePrize = function(userPrivateKey, seedValue,prizeValue,callback){
  api.debugGamePrize( userPrivateKey, seedValue, prizeValue, function(err,result){
    if( err ) callback(err,false);
    else {
        tx = result;
        console.log(tx);
        calltxStatusMethod(tx,function(err,result)
        {
           callback(err,result);
        });
    }
 });
}

module.exports.totalParticipants = function(callback){
  api.getNumUsers(function(err,result){
    if( err ) callback(err,false)
    else {
      console.log( "number of users = " + result);
      callback(err,result);
    }
 });
}

calltxStatusMethod = function(tx,callback)
{
     var self = this
      api.txStatus( tx, function(err,result){
       if( err ) console.log(err,false);
       tx_confirmed = result;
       if( tx_confirmed ) {
           console.log("confirmed")
            callback(err,result);
       }
       else {
          console.log("not confirmed" );
          setTimeout(() => {
            calltxStatusMethod(tx,function(err,result){
              if(result === true)
              {
                 callback(err,result);
              }
            })
          }, 100);

       }
    });
}
