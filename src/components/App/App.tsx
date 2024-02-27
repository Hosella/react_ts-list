import { useMemo, useState } from 'react';
import cn from 'classnames';
import { FruitsList } from '../FruitsList/Fruitslist';
import { fruits } from "../../utils/fruits";
import './App.scss';

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function App() {
  const [fruitsData, setFruitsData] = useState(fruits);
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const [name, setName] = useState('');

  const deleteFruits = (id: number) => {
    setFruitsData((prev) => {
      return prev.filter((f) => f.id !== id);
    })
  }

  const addFruit = () => {
    if (name.length === 0) {
      alert('Write a fruit');
      return
    }

    if (fruitsData.length === 30) {
      alert('List a full');
      return
    }

    const isFind = fruitsData.find((fruitData) => fruitData.name.toLowerCase() === name.toLowerCase())

    if (isFind) {
      alert('this fruit is already in list')
      return
    }

    const newFruit = {
      id: new Date() as unknown as number,
      name,
    }
    console.log(newFruit)

    setFruitsData([...fruitsData, newFruit])
  }

  const newFruits = useMemo(() => {
    const data = [...fruitsData];

    if (sortField) {
      data.sort((fruit1, fruit2) => {
        switch (sortField) {
          case SORT_FIELD_ALPHABET:
            return fruit1.name.localeCompare(fruit2.name);

          case SORT_FIELD_LENGTH:
            return fruit1.name.length - fruit2.name.length;

          default: 
            return 0;
        }
      })
    }

    if (isReverse) {
      data.reverse()
    }

    return data;
  }, [sortField, isReverse, fruitsData])

  return (
    <div className='App'>
      <div className='App__part'>
        <div className='App__add'>
          <input type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
          <button onClick={() => addFruit()}>Add</button>
        </div>

        <div>
          <button
            onClick={() => {setSortField(SORT_FIELD_ALPHABET)}}
            className={cn({active: sortField === SORT_FIELD_ALPHABET})}
          >
            Alphabet
          </button>

          <button
            onClick={() => {setSortField(SORT_FIELD_LENGTH)}} 
            className={cn({active: sortField === SORT_FIELD_LENGTH})}
          >
            Length
          </button>

          <button
            onClick={() => setIsReverse((prev) => !prev)} 
            className={cn({active: isReverse})}
          >
            Reverse
          </button>
        </div>
          <button onClick={() => setSortField('')} className='App__reset'>Reset</button>
      </div>

      <div className='App__part'>
        {fruitsData.length === 0 ? 'list is empty' : <FruitsList fruits={newFruits} deleteFruits={deleteFruits} />}
      </div>
    </div>
  );
}

export default App;
