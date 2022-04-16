import './repository.css'
export default function Repository({ data }) {
    const goToUrl = () => {
        window.open(data?.html_url)
    }
    return <div className="repository_card" onClick={goToUrl}>
        <div className="repository_name">
            <span className="repository_name_name">{data?.name}</span>
            <span className='repository_name_owner'> {data?.owner.login}</span>
        </div>
        <div className='repository_description'>
            {data?.description}
        </div>
        <div className='repository_information'>
            <span>
                <img src='./language-solid.svg' width={20} height={20} alt='language' />
                &nbsp;<span>{data?.language}</span>
            </span>
            <span>
                <img src='./star-solid.svg' width={20} height={20} alt='language' />
                &nbsp;<span>{data?.stargazers_count}</span>
            </span>
            <span>
                <img src='./code-fork-solid.svg' width={20} height={20} alt='language' />
                &nbsp;<span>{data?.forks_count}</span>
            </span>
        </div>
    </div>
}