const tweet = 'haha #humour #lol'
function getHashtags(tweet){
    const hashtagList = tweet.split('#')
    const hashtags = hashtagList.map((string,i)=>{
        console.log('string:',string,' / ',i)
    if(i>0){
        return '#'+string.trim()
    }
    })
    hashtags.shift()
    return hashtags;

}

console.log(getHashtags(tweet))