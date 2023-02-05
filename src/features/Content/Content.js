import { Post } from "../Post/Post"
import { Subredits } from "../Subreddits/Subredits"

export const Content = () => {

    /*let screenHeight = window.screen.availHeight;
    console.log(document.body.clientHeight);
    return <div className="responsive" style={{height: screenHeight - 200, overflow: "hidden"}}></div>;
    */

    

    return (
        <div className="contentContainer"> 
            <Post></Post>
            <Subredits></Subredits>
        </div>
    )
}