import {combineReducers} from 'redux';
import {Comment, IPost} from "../components/PostBlock";

const postList: IPost[] =  [
    {
        id: '0',
        time: "2019/2/28 5:18",
        name: "Bain",
        detail: "Civilians can do a lot of good for you, as long you got em under control! ",
        avatarPath: './images/photoP.png',
        image: './images/sampleImage.jpg',
        numLikes: 75,
        comments: [],
        type: 'post',
        visibility: 'public',
        tags: [],
        liked: false,
        hidden: false,
    },
    {
        id: '1',
        time: "2019/4/9 12:10",
        name: "Kayn",
        detail: "That of the watcher which will be consuned in the voice of SUMER.",
        avatarPath: './images/photoP.png',
        image: '',
        numLikes: 63,
        comments: [
            {   time: "2019/4/9 12:10",
                name: "Kayn",
                detail: "asfsdsadw",
                avatar: './images/photoP.png',
                image: '',
                visibility: 'public',
            },
            {   time: "2019/4/9 12:10",
                name: "Kayn",
                detail: "In the temple of gold and white, I bind myself to my psyche FOREVER.",
                avatar: './images/photoP.png',
                image: '',
                visibility: 'public',
            },
            {   time: "2019/4/9 12:10",
                name: "Kayn",
                detail: "At the gates of silent memory, the lizard god speaks thy NUMBER.",
                avatar: './images/photoP.png',
                image: '',
                visibility: 'public',
            }
        ],
        type: 'post',
        visibility: 'public',
        tags: [],
        liked: false,
        hidden: false,
    },
    {
        id: '2',
        time: "2019/10/11 22:22",
        name: "Arthas",
        detail: "False modesty is as bad as false pride. Know exactly what you are " +
            "capable of at any moment, and act accordingly. Any other path is folly—and could be deadly in battle.",
        avatarPath: './images/photoP.png',
        image: '',
        numLikes: 20,
        comments: [],
        type: 'post',
        visibility: 'public',
        tags: [],
        liked: false,
        hidden: false,
    },
    {
        id: '3',
        time: "2019/12/1 4:10",
        name: "Price",
        detail: "They say truth is the first causality of war.",
        avatarPath: './images/photoP.png',
        image: '',
        numLikes: 18,
        comments: [],
        type: 'post',
        visibility: 'public',
        tags: [],
        liked: false,
        hidden: false,
    },
    {
        id: '4',
        time: "2020/2/29 8:30",
        name: "Bradley",
        detail: "Ours is a world of nuclear giants and ethical infants. We know more " +
            "about war than we know about peace, more about killing than we know about living.",
        avatarPath: './images/photoP.png',
        image: './images/sampleImage.jpg',
        numLikes: 74,
        comments: [],
        type: 'post',
        visibility: 'public',
        tags: [],
        liked: false,
        hidden: false,
    },
    {
        id: '5',
        time: "2020/4/30 19:10",
        name: "Ildan",
        detail: "Every country is a battlefield for the struggle between honest and dishonest," +
            "between honourable and honourless people! At the end, the character of that country will be determined by whichever group wins!",
        avatarPath: './images/photoP.png',
        image: '',
        numLikes: 210,
        comments: [],
        type: 'post',
        visibility: 'public',
        tags: [],
        liked: false,
        hidden: false,
    }];

const inputDraftReducer = (draft = "", action: { type: string; saveInputDraft: string; }) => {
    if (action.type === 'SAVE_DRAFT') {
        return action.saveInputDraft;
    }
    return draft;
};
const postListReducer = (posts = postList, action: { type: string; modification: any; }) => {
    switch(action.type) {
        case 'ADD_POST':
            return posts.slice(0, posts.length).concat(action.modification);
        case 'ADD_LIKE':
            posts[action.modification].numLikes += 1;
            posts[action.modification].liked = true;
            return posts.slice(0, posts.length);
        case 'UNDO_LIKE':
            posts[action.modification].numLikes -= 1;
            posts[action.modification].liked = false;
            return posts.slice(0, posts.length);
        case 'ADD_COMMENT':
            const comment = action.modification;
            posts[comment.index].comments.push(comment.detail);
            return posts.slice(0, posts.length);
        case 'HIDE_POST':
            posts[action.modification].hidden = !posts[action.modification].hidden;
            return posts.slice(0, posts.length);
        default:
            return posts;
    }
};

export default combineReducers({
    postList: postListReducer,
    inputDraft: inputDraftReducer
});
