import { Comments } from '../../Components/Comments';


export const AditionalInfos = (props) => {
    const {author, date, numberOfComments, id, handleClick} = props;
    return (
        <div className='contentInfos'>
            <p className='contentAuthor'>{author}</p>
            <p className='date'>{date}</p>
            <Comments comments={numberOfComments} id={id} handleClick={handleClick}/>
        </div>
    );
}