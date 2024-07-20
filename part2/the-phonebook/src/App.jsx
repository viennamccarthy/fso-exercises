import { useState } from 'react';

const SearchInput = ({ onChange }) => {
  return (
  <div>
    <span>Filter: </span>
    <input onChange={onChange}/>
  </div>
  )
}

const Directory = ({ persons, currentFilter }) => {
  return (
  <ul>
    {persons.filter(person =>
      person.name.toLowerCase().startsWith(currentFilter.toLowerCase())
    ).map(person =>
      <Person key={person.id} person={person}/>
    )}
  </ul>
  )
}

const Person = ({ person: { name, number } }) => <li>{name} {number}</li>;

const NewPersonForm = ({ onSubmit, newName, handleNewName, newNumber, handleNewNumber }) => {
  return (
  <form onSubmit={onSubmit}>
    <div>
      Name: <input value={newName} onChange={handleNewName}/>
    </div>
    <div>
      Number: <input value={newNumber} onChange={handleNewNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const App = () => {

  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [currentFilter, setFilter] = useState('');

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNewFilter = event => {
    setFilter(event.target.value);
  }

  const handleNewName = event => {
    setNewName(event.target.value);
  }

  const handleNewNumber = event => {
    setNewNumber(event.target.value);
  }

  const addPerson = event => {
    event.preventDefault();

    if (persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length > 0) {
      alert(`${newName} is already in phonebook`);
      setNewName('');
      setNewNumber('');
      return;
    }

    const nameObject = { name: newName, number: newNumber, id: persons.length + 1 };
    const newPersons = [...persons, nameObject];

    setPersons(newPersons);

    setNewName('');
    setNewNumber('');
  }

  return (
  <div>
    <h2>Phonebook</h2>
    <SearchInput onChange={handleNewFilter}/>
    <h2>Numbers</h2>
    <Directory persons={persons} currentFilter={currentFilter}/>
    <h2>Add Entry</h2>
    <NewPersonForm
      onSubmit={addPerson}
      newName={newName}
      handleNewName={handleNewName}
      newNumber={newNumber}
      handleNewNumber={handleNewNumber} />
  </div>
  )
}

export default App;
