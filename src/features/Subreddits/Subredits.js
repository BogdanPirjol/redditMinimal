import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubreddits, loadData, selectActiveId } from './SubreditsSlice';
import { setActiveSubreddit, setActiveSubredditId } from './SubreditsSlice';
import { useState } from 'react';

export const Subredits = (props) => {

    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);
    const activeId = useSelector(selectActiveId);
    const {style} = props;
    useEffect(() => {
        dispatch(loadData());
    }, []);

    const selectActiveSubreddit = (subredditName, subredditId) => {
        dispatch(setActiveSubreddit({subredditName, subredditId}));
    }

    if(subreddits.subreddits.length > 0)
    {
        return (
            <div className='subreddits' style={style}>
                <h2>Subreddits</h2>
                {subreddits.subreddits.map(subreddit => {
                    let className = 'banner';
                    if(activeId === subreddit.data.id)
                        className += ' active';
                    if(!activeId && subreddit.data.display_name === 'pics')
                        className += ' active';
                    return (<div key={subreddit.data.id} className={className}  id={subreddit.data.id} onClick={() => selectActiveSubreddit(subreddit.data.display_name, subreddit.data.id)}  >
                        {subreddit.data.icon_img ? <img src={subreddit.data.icon_img} alt='nada' style={{border: "3px solid " + (subreddit.data.banner_background_color || "grey")}}/> : <div className="blank" style={{border: "3px solid " + (subreddit.data.banner_background_color || "grey")}}/>}
                        <h3>{subreddit.data.display_name}</h3>
                    </div>)
                    })
                }
            </div>
        )
    }
    else{
        return (
            <div className='subreddits' style={style}>
                <h1>LOADING SUBREDDITS...</h1>
            </div>
        )
    }
    
}