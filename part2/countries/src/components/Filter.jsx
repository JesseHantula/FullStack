const Filter = ( {handleFilterChange} ) => {
    return (
        <div>
            <label>Find countries: </label>
            <input type="text" onChange={handleFilterChange}/>
        </div>
    )
}

export default Filter