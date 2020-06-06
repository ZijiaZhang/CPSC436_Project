import Textarea from "./Textarea";
import PostsLayout from './PostsLayout';
import React from "react";

const App = () => {   //this is how you make a functional component
    const posts =  [
        {
            time: "2019/1/12 12:00",
            name: "Bain",
            detail: "OK, people, there is the bank. I don not know what is in there, but I know it is gonna be good.",
            avatar: './images/photoP.png',
            image: './images/sampleImage.jpg'
        },
        {
            time: "2019/2/28 5:18",
            name: "Bain",
            detail: "Civilians can do a lot of good for you, as long you got em under control! ",
            avatar: './images/photoP.png',
            image: './images/sampleImage.jpg'
        },
        {
            time: "2019/4/9 12:10",
            name: "Kayn",
            detail: "My life is dedicated to destroying the Burning Legion.",
            avatar: './images/photoP.png',
            image: ''
        },

        {
            time: "2019/10/11 22:22",
            name: "Arthas",
            detail: "False modesty is as bad as false pride. Know exactly what you are " +
                "capable of at any moment, and act accordingly. Any other path is folly—and could be deadly in battle.",
            avatar: './images/photoP.png',
            image: ''
        },
        {
            time: "2019/12/1 4:10",
            name: "Price",
            detail: "They say truth is the first causality of war.",
            avatar: './images/photoP.png',
            image: ''
        },
        {
            time: "2020/2/29 8:30",
            name: "Bradley",
            detail: "Ours is a world of nuclear giants and ethical infants. We know more " +
                "about war than we know about peace, more about killing than we know about living.",
            avatar: './images/photoP.png',
            image: ''
        },
        {
            time: "2020/4/30 19:10",
            name: "Ildan",
            detail: "Every country is a battlefield for the struggle between honest and dishonest," +
                "between honourable and honourless people! At the end, the character of that country will be determined by whichever group wins!",
            avatar: './images/photoP.png',
            image: ''
        }];
    return (
    <div id="post-blog-page">
      <PostsLayout posts={posts} />
      <Textarea />
    </div>
  );
};

export default App;
