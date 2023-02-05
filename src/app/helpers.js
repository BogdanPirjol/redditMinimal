export const getDays = (createdAt) => {     //return number of days, hours, minutes or seconds from date 'createdAt' depending on input param 
    const elpasedTime = Math.floor(Date.now() / 1000) - createdAt;
    const days = Math.floor(elpasedTime / 86400);
    if(days === 0)
    {
        const hours = Math.floor(elpasedTime / 3600);
        if( hours === 0){
            const minutes = Math.floor(elpasedTime / 60);
            if(minutes === 0)
            {
                return ({
                    units: elpasedTime,
                    type: Math.floor(elpasedTime) <= 1 ? 'second' : 'seconds'
                });
            }
            return ({
                units: minutes,
                type: Math.floor(minutes) <= 1 ? 'minute' : 'minutes'
            })
        }
        return ({
            units: hours,
            type: Math.floor(hours) <= 1 ? 'hour' : 'hours'
        })
    }
    return ({
        units: days,
        type: Math.floor(days) <= 1 ? 'day' : 'days'
    })
}