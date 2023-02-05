import { useEffect, useState } from 'react';
import { TfiClose } from 'react-icons/tfi';
import { useSelector } from 'react-redux';
import { Subredits } from '../features/Subreddits/Subredits';
import { selectActiveSubreddit } from '../features/Subreddits/SubreditsSlice';

export const ResponsiveMenu = (props) => {

    const screenHeight = window.screen.availHeight - 150;
    const [display, setDisplay] = useState('block');
    const [width, setWidth] = useState('0%');
    const { revertResponsiveMenu } = props;
    const activeSubreddit = useSelector(selectActiveSubreddit);
    const [firstRender, setFirstRender] = useState(true);
    useEffect(() => {
        if(!firstRender){
            hideResponsiveMenu();
        }
        setFirstRender(false);
    }, [activeSubreddit]);

    const hideResponsiveMenu = () => {
        setDisplay('none');
        revertResponsiveMenu();
    }

    return (
    <div className="responsive" style={{height: screenHeight, display: display}}>
        <TfiClose size='20' className='tfiClose' style={{background: 'inherit'}} onClick={hideResponsiveMenu}/>
        <Subredits style={{display: 'flex', width: '100%'}}/>
    </div>); 
}