import { useState } from 'react'
import './App.css'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {mounts} from './data';

function App() {

  // const [characterNames, setCharacterNames] = useState<string[]>([])

  const [value, setValue] = useState<string>("");
  const [trackedMounts, setTrackedMounts] = useState<string[]>([])




  return (

    <>
    
      <Autocomplete
        key={value}
        options={Object.keys(mounts)}
        sx={{ width: 300 }}
        id="controlled-demo"
        value={value}
        blurOnSelect={true}
        onChange={(event: any, newValue: string | null) => {

          let newTrackedMounts = [...trackedMounts]

          if(newTrackedMounts.includes(newValue)) {
            console.log("This mount is already being tracked")
          } else {
            newTrackedMounts.push(newValue)
            setTrackedMounts(newTrackedMounts)
          }


          setValue("");
        }}
        renderInput={(params) => (
          <TextField {...params} label="Select a new mount to track..." />
        )}
      />

      {trackedMounts.map((mount) => {
        return <p key={`${mount}}-name`}>{mount}</p>
      })}

</>
    
  )
}

export default App

// Create character
// Checkboxes for each character
// Reset every Wednesday/Reset all button
// Dropdown of possible options