const Persons = ( {namesToShow, deletePerson} ) => {
    return (
        <ul>
        {namesToShow.map((person) =>
          <li key={person.id}> {person.name} {person.number}
            <button name={person.name} id={person.id} onClick = {deletePerson}>delete</button>
          </li>
        )}
    </ul>
    )
}

export default Persons