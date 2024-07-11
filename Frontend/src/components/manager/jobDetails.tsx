import axios from 'axios'
import { useState , useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
 

export default function JobDetail (){
    const [job, setJob] = useState({});
    const {id} = useParams()

    const fectchJobDetail = async ()=>{
            const token = localStorage.getItem('accessToken')
            try{
                const jobResponse = await axios.get(`http://localhost:3002/job/all-jobs/${id}` , {
                headers:{
                    Authorization: `Bearer ${token}`
                }

            });
            setJob(jobResponse.data);
            console.log(jobResponse.data)

            }catch(err){
                console.log(err)
            }
            
        }
        useEffect( ()=>{
            fectchJobDetail()
        } , [])
        
        if (!job.Id) {
            return <div>Loading...</div>;
          }

    return(
        <>
            <h1 className='text-3xl font-extrabold mb-6'>{job.Title}</h1>
            <div className="prose" dangerouslySetInnerHTML={{ __html: job.Description }} />
           <p>
                {format(new Date(job.DatePosted) , 'MMMM dd, yyy')}
                <br/>
                {formatDistanceToNow(new Date(job.DatePosted) , {addSuffix : true})}
           
           </p>
           <button className='bg-blue-400 text-white px-6 py-2 rounded-xl '>Apply</button>

        </>
    );
}
