import React from "react";
import {IUser} from "../../../shared/ModelInterfaces";
import {requestAPIJson} from "../../shared/Networks";

interface IEmojiBlockProps{
    addEmoji: any
}
interface IEmojiBlockState{

}

class EmojiBlock extends React.Component<IEmojiBlockProps, IEmojiBlockState> {
    constructor(props: IEmojiBlockProps) {
        super(props);
        this.state = {
        };
    };

    emojiOnClick = (event: any) => {
        this.props.addEmoji(event.target.value);
    };

    render() {
        const emojiList = [
            "😀",   "😁",   "😂",   "😃",   "😄",    "😅",   "😆",
            "😇",	"😈",   "😉",	"😊",   "😋",   "😌",    "😍",
            "😎",   "😏",	"😐",	"😑",	"😒",	"😓",	"😔",
            "😕",	"😖",	"😗",	"😘",	"😙",	"😚",	"😛",
            "😜",	"😝",	"😞",	"😟",	"😠",	"😡",	"😢",
            "😣",	"😤",	"😥",	"😦",	"😧",	"😨",	"😩",
            "😪",	"😫",	"😬",	"😭",	"😮",	"😯",	"😰",
            "😱",	"😲",	"😳",	"😴",	"😵",	"😶",	"😷",
            "🙁",	"🙂",	"🙃",	"🙄",	"🤐",	"🤑",	"🤒",
            "🤔",	"🤕",	"🤣",	"🤧",	"🤨",	"🤪",
        ];
        const emojiButtons = emojiList.map(emoji =>
            <button className="input-emojis" key={emoji} value={emoji} onClick={this.emojiOnClick}>{emoji}</button>
        );
        return (
            <div className="emoji-selection-block">
                {emojiButtons}
            </div>);
    }
}

export default EmojiBlock;
