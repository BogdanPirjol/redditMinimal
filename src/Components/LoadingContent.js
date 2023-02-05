import { useState, useEffect } from "react";
import { Card } from './Card';

export const PlaceholderContent = ({containerDimmension}) => {

    const [greyLevel, setGreyLevel] = useState({
        direction: true,
        level: 50
    });

    const fadeStyle = {
        background: `linear-gradient(90deg, rgba(219,219, 219, 1) 0%, rgba(255, 255, 255, 1) ${greyLevel.level}%, rgba(219,219, 219, 1) 100%)`
    }

    const container = [];

    useEffect(() => {
        const intervalId = setInterval( () => {
            setGreyLevel(prevLevel => {
                if(prevLevel.level > 100){
                   return { level: 100,
                            direction: !prevLevel.direction}
                }
                if(prevLevel.level < 0){
                    return {
                        level: 0,
                        direction: !prevLevel.direction
                    }
                }
                if(prevLevel.direction)
                    return {...prevLevel,
                            level: prevLevel.level + 1}
                else
                    return {...prevLevel,
                        level: prevLevel.level - 1}
            })
        }
        , 10);
        return () => clearInterval(intervalId);
    }, []);

    for(let i = 0; i < containerDimmension; i++)
        container.push((
            <Card fadeStyle={fadeStyle} key={i}/>
        ));
    
    return container;
}