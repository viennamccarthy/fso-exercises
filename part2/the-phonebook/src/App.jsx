import { useState, useEffect } from 'react';
import personService from './services/persons.js';
import Notification from './components/Notification';

const SearchInput = ({ onChange }) => {
  return (
  <div>
    <span>Filter: </span>
    <input onChange={onChange}/>
  </div>
  )
}

const Person = ({ person: { name, number }, handleDelete }) =>
  <li>
    {name} {number}
    <button onClick={handleDelete}>Delete</button>
  </li>

const Directory = ({ persons, currentFilter, deletePerson }) => {
  return (
  <ul>
    {persons
      .filter(person => person.name.toLowerCase().startsWith(currentFilter.toLowerCase()))
      .map(person =>
          <Person
            key={person.id}
            person={person}
            handleDelete={() => deletePerson(person.id)}
          />
        )}
  </ul>
  )
}

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

  const [persons, setPersons] = useState([]);
  const [currentFilter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState({});

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons);
    })
  }, [])


  const displayNotification = (content, isError) => {
    setMessage({ content, isError });
    setTimeout(() => {
      setMessage({});
    }, 5000);
  }

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
    
    const currentEntry = persons.find(person => person.name === newName);

    if (currentEntry) {
      if (currentEntry.number === newNumber) {
        displayNotification(`${newName} is already in phonebook.`, true);
      } else if (window.confirm(`${newName} is already in phonebook. Update number?`)) {
        const updatedEntry = { 
          name: currentEntry.name,
          number: newNumber,
          id: currentEntry.id,
        };

        personService
          .update(updatedEntry)
          .then(updatedPerson => {
            const newPersons = persons.map(person => person.name === newName? updatedPerson : person);
            setPersons(newPersons);
            displayNotification(`${updatedPerson.name}'s number updated`, false);
          })
          .catch(() => {
            setPersons(persons.filter(person => person.id !== currentEntry.id));
            displayNotification(`${newName} has already been removed from the server.`, true);
          });

      }
    } else {
      const newEntry = { 
          name: newName,
          number: newNumber,
          id: String(persons.length + 1),
        };

      personService
        .add(newEntry)
        .then(newPerson => {
          const newPersons = [...persons, newPerson];
          setPersons(newPersons);
          displayNotification(`${newPerson.name} added to phonebook`, false);
        })
        .catch(() => displayNotification(`Unable to add ${updatedPerson.name} to the phone book.`, true));
    }

    setNewName('');
    setNewNumber('');
  }

  const deletePerson = id => {
    const selectedPerson = persons.find(person => person.id === id);

    if (window.confirm(`Delete entry for ${selectedPerson.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          displayNotification(`${selectedPerson.name} deleted`, false);
        })
        .catch(() => {
          displayNotification(`${selectedPerson.name} already deleted`, true);
        })
    }
  }

  return (
  <div>
    <h2>Phonebook</h2>
    <Notification message={message} />
    <SearchInput onChange={handleNewFilter} />
    <h2>Numbers</h2>
    <Directory
      persons={persons}
      currentFilter={currentFilter}
      deletePerson={deletePerson}
    />
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
