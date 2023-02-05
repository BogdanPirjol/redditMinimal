import { useState } from 'react';
import { VscComment } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { toggleView } from '../features/CommentsContent/commentsContentSlice';
import { getComments } from '../features/CommentsContent/commentsContentSlice';

export const Comments = (props) => {
    const {comments, id, handleClick} = props;
    const dispatch = useDispatch();

    const toggleComments = () => {
        dispatch(toggleView(id));
        handleClick();
    }

    return (
        <div id='wrap' >
            <p style={{fontSize:'small'}}>{comments}</p>
            <VscComment className='commentsIcon' size={25} color={'rgba(219,219, 219, 1)'} onClick={toggleComments}/>
        </div>
    );
}