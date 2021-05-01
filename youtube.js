const Youtube = require('youtube-node');

const config = require('./ytconfig.json');

const youtube = new Youtube();

youtube.setKey(config.key);

function searchVideoUrl(message, queryText){

    return new Promise((resolve, _)=>{
        youtube.search(`Exercicio em casa para ${queryText}`, 2, function(err, res){
            if(err){
                resolve('Não foi possivel encontrar o video, tente novamente mais tarde :('); 
            }else{
               
               const videoIds = res.items.map((item)=> item.id.videoId).filter(item => item);
               const youtubeLinks = videoIds.map(videoId => `https://www.youtube.com/watch?v=${videoId}`).join(', ');
               resolve(`${message} ${youtubeLinks}`);
            }
        });
    })
}

module.exports.searchVideoUrl = searchVideoUrl;