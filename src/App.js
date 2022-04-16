import './App.css';
import { fetchData, debounce } from './service'
import { useEffect, useRef, useState } from 'react';
import Repository from './repository';

function App() {
  const [repos, setRepos] = useState(null);
  const [language, setLanguage] = useState("")
  const [perPage, setPerPage] = useState(10)
  const [ascdsc, setAscdesc] = useState("desc")
  const [sort, setSort] = useState("stars")
  const [page, setPage] = useState(1);
  let debunceRef = useRef()
  useEffect(() => {
    const options = { perPage, ascdsc, sort, page, language }
    fetchData(options).then(res => {
      setRepos(res.items)
    }).catch(err => {
      console.log(err)
    })

  }, [perPage, ascdsc, sort, page])

  useEffect(() => {
    debunceRef.current = debounce(fetchData, 600);
  }, [])
  useEffect(() => {
    if (language) {
      const options = { perPage, ascdsc, sort, page, language }
      if (debunceRef.current)
        debunceRef.current(setRepos, options)
    }
  }, [language])
  const jsx = repos?.map((elm, index) => {
    return <Repository data={elm} key={index} />
  })
  const onClickSort = (value) => {
    if (value != "sort") setSort(value)
  }
  const onClickAscDesc = (value) => {
    if (value != "asc/desc") setAscdesc(value)
  }
  const changePage = (val) => {
    let newPage = val + page;
    if (newPage > 0) {
      setPage(newPage)
    }
  }
  return <div className="app_container" >
    <div className="app_header">
      Git Hub Repositories
    </div>
    <div className='app_control_container'>
      <div className='app_control'>
        <div>
          <input
            className='app_search_input'
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder='Type a language name to search...' />
        </div>
        <div className='app_buttons'>
          <span className='app_buttons_back' onClick={() => changePage(-1)}>
            <img src='./arrow-left-long-solid.svg' width={20} height={20} alt='back' />
          </span>
          <span className='app_page_count'>{page}</span>
          <span className='app_buttons_next' onClick={() => changePage(1)} >
            <img src='./arrow-right-long-solid.svg' width={20} height={20} alt='back' />
          </span>
        </div>
        <div>
          <input
            className='app_number_input'
            value={perPage}
            type="number"
            onChange={(e) => setPerPage(e.target.value)}
          />
        </div>
        <div>
          <select onChange={(e) => onClickAscDesc(e.target.value)}
            className='app_asc_desc' id="asc/desc">
            <option value="asc/desc">asc / desc</option>
            <option value="asc">ascending</option>
            <option value="desc">descending</option>
          </select>
        </div>
        <div>
          <select onChange={(e) => onClickSort(e.target.value)}
            className='app_asc_desc' id="star/name">
            <option value="sort" selected>sort</option>
            <option value="stars">star</option>
            <option value="name">name</option>
          </select>
        </div>


      </div>
    </div>

    <div className="app_body">
      {jsx}
    </div>

  </div>

}
export default App;
