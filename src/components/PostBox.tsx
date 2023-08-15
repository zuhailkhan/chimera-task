import { useEffect, useState } from 'react'

interface Posts {
  body: string;
  id: number;
  title: string;
  userId: number;
}

const PostBox = () => {

    const [data, setData] = useState<Posts[]>()
    const [isLoading, setLoading] = useState<Boolean>(true)
    const [isError, setError] = useState<Boolean>(false)

    const fetchData = () => {
        const url = `https://jsonplaceholder.typicode.com/posts`;
        setLoading(true)
        setError(false)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((data) => data.json())
        .then((data) => {
            setData(data)
            setLoading(false)
        })
        .catch((error) => {
            setError(true)
            console.error(new Error('Failed to Fetch'))
        })
        .finally(() => setLoading(false))
    }
    useEffect(() => {
        fetchData()
    }, [])
    
    return (
      <>
        {isLoading && !isError ? (
          <div>Loading...</div>
        ) : data && !data.length ? (
          <div>No Data</div>
        ) : (
          <div title="contentRoot">
            {
                isError && <div>Error</div>
            }
            {data?.map((post) => {
              return <div key={post.id}>{post.title}</div>;
            })}
          </div>
        )}
      </>
    );
}

export default PostBox