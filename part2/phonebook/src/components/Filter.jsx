const Filter = ( {handleFilterChange} ) => {
    return (
        <div>
            <label>Filter by name: </label>
            <input type="text" onChange={handleFilterChange}/>
        </div>
    )
}

export default Filter