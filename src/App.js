import logo from './logo.svg';
import './App.css';
import { fetchData } from './service'
import { useEffect, useState } from 'react';
function App() {
  const [repos, setRepos] = useState(null);
  useEffect(() => {
    fetchData().then(res => {
      setRepos(res.items)
    }).catch(err => {
      console.log(err)
    })

  }, [])
  console.log(repos)
  return <div className="app_container" >
    <div className="app_header">

    </div>
    <div className="app_body">

    </div>
  </div>
}
export default App;
