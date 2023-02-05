import { useState } from 'react';
import { TiArrowUpOutline, TiArrowUpThick, TiArrowDownOutline, TiArrowDownThick } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from '../Components/Title';
import { AditionalInfos } from '../features/AdditionalInfos/AditionalInfos';
import { getComments, selectToggelView, toggleView } from '../features/CommentsContent/commentsContentSlice';
import { CommentsContent } from '../features/CommentsContent/CommentsContent';
import { selectLoadingState } from '../features/CommentsContent/commentsContentSlice';
import { CommentsPlaceholder } from '../features/CommentsContent/CommentsPlaceholder';
import { getDays } from '../app/helpers';

export const Card = (props) => {

    const { fadeStyle } = props;
    const [reactionsStyle, setReactionsStyle] = useState({
        likeButton:     <TiArrowUpOutline id='outline' size={30} ></TiArrowUpOutline>,
        dislikeButton:  <TiArrowDownOutline id='outline' size={30} ></TiArrowDownOutline>,
        textStyle:      {
            backgroundColor:    'white',
            color:              'black'
        }
    });
    const {title, likes, mediaSrc, created, author, id, num_comments, permalink} = props;
    const toggleView = useSelector(selectToggelView);
    const commentDetails = useSelector(state => state.commentsContent.commentDetails[id]);
    const isLoaded = useSelector(state => state.commentsContent.loadingState[id]);
    const view = toggleView[id];
    const dispatch = useDispatch();

    const handleCommentRequest = () => {
        if(!commentDetails)
            dispatch(getComments({permalink, id}));
    }

    const checkLoadingStatus = (loadingObj) => {
        if(!loadingObj)
            return false;
        if(!loadingObj.isLoading && !loadingObj.hasError)
            return true;
        return false;
    }

    let commentsContent = <CommentsPlaceholder/>;
    if(checkLoadingStatus(isLoaded) && commentDetails){
        commentsContent = commentDetails.map(comment => {
            const timeDetails = getDays(comment.data.created);
            return <CommentsContent author={comment.data.author} elapsedTime={`${timeDetails.units} ${timeDetails.type} ago`} text={comment.data.body} key={comment.data.id}/>
        })
    }

    const handleClickUp = () => {
        reactionsStyle.likeButton.props.id === 'outline' ? setReactionsStyle(prevState => {
            return ({
                likeButton: <TiArrowUpThick id='thick' size={30} color='rgb(47, 255, 47)'></TiArrowUpThick>,
                textStyle: {
                    ...prevState.textStyle,
                    color: 'rgb(47, 255, 47)'
                },
                dislikeButton: <TiArrowDownOutline id='outline' size={30} ></TiArrowDownOutline>
            })
        }) : setReactionsStyle(prevState => {
            return ({
                likeButton: <TiArrowUpOutline id='outline' size={30}></TiArrowUpOutline>,
                textStyle: {
                    ...prevState.textStyle,
                    color: 'black'
                },
                dislikeButton: <TiArrowDownOutline id='outline' size={30} ></TiArrowDownOutline>
            })
        })
    }

    const handleClickDown = () => {
        reactionsStyle.dislikeButton.props.id === 'outline' ? setReactionsStyle(prevState => {
            return ({
                dislikeButton: <TiArrowDownThick id='thick' size={30} color='red'></TiArrowDownThick>,
                textStyle: {
                    ...prevState.textStyle,
                    color: 'red' 
                },
                likeButton: <TiArrowUpOutline id='outline' size={30} ></TiArrowUpOutline>
            })
            }) : setReactionsStyle(prevState => {
                return({
                    dislikeButton: <TiArrowDownOutline id='outline' size={30} ></TiArrowDownOutline>,
                    textStyle: {
                        ...prevState.textStyle,
                        color: 'black'
                    },
                    likeButton: <TiArrowUpOutline id='outline' size={30} ></TiArrowUpOutline>
                })
            })
    }

    //const image = !fadeStyle && <img src={mediaSrc || null} ></img>;

    let image;
    if(!fadeStyle){
        if(mediaSrc.includes('i.redd.it'))
            image = <img src={mediaSrc}></img>
        else
            image = null;
    }

    return (
        <div className={fadeStyle ? 'placeHolderContainer' : 'postContainer'}>
            <div className='card'>
                {fadeStyle ? <h3 className='title' style={fadeStyle}></h3> : <Title textTitle={title}/>}
                <div className='mainContent'>
                    <div className="mediaContent">
                        <div className="reactions">
                            <button className='up' onClick={handleClickUp}>
                                {reactionsStyle.likeButton}
                            </button>
                            {fadeStyle ? <p style={fadeStyle}> </p> : <p style={reactionsStyle.textStyle}>{likes}</p>}
                            <button className='down' onClick={handleClickDown}>
                                {reactionsStyle.dislikeButton}
                            </button>
                        </div>
                        {fadeStyle ? <div className='images' style={fadeStyle}/> :  <div className='images'>{image}</div>}       
                    </div>
                    {fadeStyle ? <div className="moreInfo" style={fadeStyle}/> : <AditionalInfos author={author} date={created} numberOfComments={num_comments} id={id} handleClick={handleCommentRequest}/>}
                    <div id='contentComments'>
                        {view && commentsContent}
                    </div>
                </div>
            </div>
        </div>
    );
}