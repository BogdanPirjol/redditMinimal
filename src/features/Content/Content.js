import { Post } from "../Post/Post"
import { Subredits } from "../Subreddits/Subredits"

export const Content = () => {

    return (
        <div className="contentContainer"> 
            <Post></Post>
            <Subredits></Subredits>
        </div>
    )
}