function getHashTags(tweet){
    const hashtagList = tweet.split('#')
    const hashtags = hashtagList.map((string,i)=>{
        console.log('string:',string,' / ',i)
    if(i>0 && string.trim()){
        return '#'+string.trim()
    }
    }).filter(string=>string!==null&&string!==undefined)
    return hashtags;
}

module.exports= {getHashTags};