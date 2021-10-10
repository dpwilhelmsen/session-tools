import { useState } from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import { useLiveQuery } from "dexie-react-hooks";
import db from './database';
import './App.css';

const defaultStyle = {
  control: {
    backgroundColor: '#fff',
    fontSize: 14,
    fontWeight: 'normal',
  },

  '&multiLine': {
    control: {
      fontFamily: 'monospace',
      minHeight: 63,
    },
    highlighter: {
      padding: 9,
      border: '1px solid transparent',
    },
    input: {
      padding: 9,
      border: '1px solid silver',
    },
  },

  '&singleLine': {
    display: 'inline-block',
    width: 180,

    highlighter: {
      padding: 1,
      border: '2px inset transparent',
    },
    input: {
      padding: 1,
      border: '2px inset',
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.15)',
      fontSize: 14,
    },
    item: {
      padding: '5px 15px',
      borderBottom: '1px solid rgba(0,0,0,0.15)',
      '&focused': {
        backgroundColor: '#cee4e5',
      },
    },
  },
};

function App() {
  const [value, setValue] = useState('');
  const characters = useLiveQuery(() => db.characters.toArray());
  const data = characters ? characters.map((obj) => {
    obj.display = obj.name;
    return obj;
  }) : [];

  return (
    <div className="app">
      <MentionsInput value={value} onChange={(event, newValue) => { setValue(newValue)}}

                     style={defaultStyle}
                     placeholder={"Mention people using '@'"}
                     a11ySuggestionsListLabel={"Suggested mentions"}
      >
        <Mention
          trigger="@"
          data={data}
          displayTransform={(id, display) => display.replace(/ .*/,'')}
          style={{ backgroundColor: '#d1c4e9' }}
        />
        <Mention
          markup="![__display__](__id__)"
          trigger="!"
          data={data}
          style={{
            position: 'relative',
            zIndex: 1,
            color: 'blue',
          }}
        />
      </MentionsInput>
    </div>
  );
}

export default App;
