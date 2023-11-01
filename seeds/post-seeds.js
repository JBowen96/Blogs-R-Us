const { Post } = require('../models');

const postData = [
    {
        title: "US Government now Publically Tradable!",
        post_content: "The US Govt has recently announced that they will be openly traded within the next two months. This now gives the ability for the population at large to have financial influence previously withheld for large coorporations.",
        user_id: 3
    },
    {
        title: "Random Youtuber reaches 10 views!",
        post_content: " A previously unknown youtuber has reached a total of 10 views across their account when they previously had no following whatsoever",
        user_id: 1
    },
    {
        title: "People can fly?",
        post_content: "Has anyone else seen all of the people flying around randomly? I thought I was going crazy but I cant find anything about it online or in the news.",
        user_id: 2

    },
    
    
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;