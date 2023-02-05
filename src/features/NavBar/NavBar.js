import { useSelector } from "react-redux"
import { SearchBar } from "../SearchBar/SearchBar"
import { selectSearchTerm } from "./NavBarSlice"
import { useEffect, useState } from 'react';
import { BsReddit } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { ResponsiveMenu } from "../../Components/ResponsiveMenu";

export const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [responsive, setResponsive] = useState(false);
    const submitSearchTerm = () => {
        console.log(searchTerm);
    }

    const modifySearchTerm = event => {
        if(event.target.value){
            setSearchTerm(event.target.value);   
            setIsActive(true); 
            console.log('da: ', isActive);
           
        }
        else{
            setSearchTerm('');
            console.log('nu: ', isActive)
            setIsActive(false);  
        }
    }

    let searchingFor = <p> Searching for "{searchTerm}" ...</p>;
    
    const searchResults = isActive && searchTerm ? {borderStyle: 'groove',
                                                    borderLeft: '1px solid black',
                                                    borderRight: '1px solid black',
                                                    borderBottom: '1px solid black'} : null;

    const showResponsiveContent = () => {
        setResponsive(true);
    }

    const revertChange = () => {
        setResponsive(false);
    }

    const responsiveMenu = <ResponsiveMenu revertResponsiveMenu={revertChange}/>

    const navBar = (<section className="navbar">
        <div className="logo navbarColor">
            <BsReddit size={30}></BsReddit>
            <label className="navbarColor">Reddit Minimal</label>
        </div>
        <div className="search navbarColor">
            <div className='searchArea' >
                <input 
                type="text" 
                placeholder="Search" 
                className="noBorder searchField" 
                value={searchTerm} 
                onChange={modifySearchTerm} 
                onBlur={() => setIsActive(false)}
                onFocus={() => setIsActive(true)}>
                </input>
                <div className='suggestion' style={searchResults}>
                    { (isActive && searchTerm) && searchingFor}                      
                </div>
            </div>
            <button onClick={submitSearchTerm}>search</button>
        </div>
        <div className="burger">
            <RxHamburgerMenu className='burgerMenu' size={30} onClick={showResponsiveContent}></RxHamburgerMenu>
        </div>
    </section> )

    if(responsive)
        return responsiveMenu;
    else
        return navBar;
}