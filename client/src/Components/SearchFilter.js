import React from 'react';

const SearchFilter = (props) => (
    <div>
        <input className='margin-top' type='text' value={props.term} onChange={props.search} placeholder='Search for wine'/><br />
        <select className='margin-top margin-bottom wine-select' value={props.selectedWine}
        onChange={props.getWine}>
            <option> </option>
        {props.filteredList.map((item) => <option key={item.id} value={item.id}>{item.value}</option>)}
        </select>
    </div>
);

export default SearchFilter;