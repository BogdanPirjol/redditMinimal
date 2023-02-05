import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectActiveSubreddit } from "../Subreddits/SubreditsSlice"
import { useDispatch } from "react-redux"
import { loadPosts, selectLoadingStatus, selectPostsData } from "./PostSlice"
import { PlaceholderContent } from "../../Components/LoadingContent"
import { Card } from '../../Components/Card';
import { getDays } from '../../app/helpers';

export const Post = () => {

    const activeSubreddit = useSelector(selectActiveSubreddit);
    const dispatch = useDispatch();
    const postsData = useSelector(selectPostsData);
    const loadingStatus = useSelector(selectLoadingStatus);
    
    useEffect( () => {
        dispatch(loadPosts(activeSubreddit));
    }, [activeSubreddit]);

    let mainContent;
    if(!loadingStatus)
        mainContent = <PlaceholderContent containerDimmension={10}/>;
    else
        mainContent = postsData.map(post => {
            const {
                id,
                author,
                url,
                title,
                created,
                ups,
                num_comments, 
                permalink
            } = post.data;
            const time = getDays(created);
            const dateOfCreation = `${time.units} ${time.type} ago`;
            return <Card
                title =         {title}
                likes =         {ups}
                mediaSrc =      {url}
                created =       {dateOfCreation}
                author =        {author}
                key =           {id}
                id =            {id}
                num_comments =  {num_comments}
                permalink =     {permalink}
            />
        })
    
    return (
        <div className='posts'>
            {/* 
            //componenta pt randarea cardurilor
            //proprietati furnizate:
            //-titlu
            //-aprecieri
            //-media
            //-author
            //-date of creation
            //-id-ul postarii (pt a putea fi folosit de componenta comments pt a cere comentariile)
            */}
            {mainContent}
        </div>
    )
}