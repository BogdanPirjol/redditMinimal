import { useDispatch } from "react-redux";
import { getComments } from "./commentsContentSlice";

export const CommentsContent = (props) => {

    const {
    author,
    elapsedTime,
    text
     } = props;

    return (<div className="commentContainer">
                <div className="commentsInfo">
                    <p className="commentAuthor">
                        {author}
                    </p>
                    <p className='commentDate'>
                        {elapsedTime}
                    </p>
                </div>
                <div className="commentData">
                    <p>{text}</p>
                </div>
            </div>);
}