import { useState } from 'react'
import './App.css'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import MountCard from "./components/MountCard"
import { mounts } from './data';

// TODO:
// Create character
// Checkboxes for each character
// Reset every Wednesday/Reset all button
// Dropdown of possible options

function App() {
  const [value, setValue] = useState<string>("");
  const [trackedMounts, setTrackedMounts] = useState<string[]>([])
  const [checkedMounts, setCheckedMounts] = useState<string[]>([])

  function handleCheckMount(mount: string) {
    if(checkedMounts.includes(mount)) {
      setCheckedMounts(checkedMounts.filter(item => item !== mount));
      return
    }

    setCheckedMounts(checkedMounts.concat(mount));
  }

  return (

    <>
    
      <Autocomplete
        key={value}
        options={Object.keys(mounts)}
        sx={{ width: 300 }}
        id="controlled-demo"
        value={value}
        blurOnSelect={true}
        onChange={(_event: any, newValue: string | null) => {

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

      <div className="tracked-mounts">
        {trackedMounts.map((mount) => {

          let mountDetails = mounts[mount]

          return <MountCard 
                  mount={mount}
                  image={mountDetails["image"]}
                  source={mountDetails["source"]}
                  sourceType={mountDetails["source_type"]}
                  link={mountDetails["wow_head_link"]}
                  onClick={() => {
                    handleCheckMount(mount)
                  }}
                  checked={checkedMounts.includes(mount)}
                />
        })}
      </div>

</>
    
  )
}

export default App