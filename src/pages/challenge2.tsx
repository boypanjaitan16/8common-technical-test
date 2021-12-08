import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Challenge2Page(){
    const [csv, setCsv] = useState<string|null>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data      = new FormData(event.currentTarget);
        const start     = data.get('start') as string
        const finish    = data.get('finish') as string
        
        if(!start || !finish){
            alert('Start and finish is required')
            return;
        }

        if(parseInt(start) > parseInt(finish)){
            alert('Start number cannot be greater than finish number')
            return;
        }

        doTheLogic(parseInt(start), parseInt(finish))
    };

    const doTheLogic = (start:number, finish:number) => {
        const arr = Array.from(new Array((finish+1) - start)).map((_, i) => {
            const val   = i+start;
            const divideByFive  = val % 5;
            const divideByThree = val % 3;

            if(divideByFive === 0 && divideByThree === 0){
                return 'FizzBuzz'
            }

            if(divideByFive === 0 && divideByThree !== 0){
                return 'Buzz'
            }

            if(divideByFive !== 0 && divideByThree === 0){
                return 'Fizz'
            }

            return val;
        });
        setCsv(arr.join(', '))
    }

    return (
        <section className='p-5 flex flex-col items-center justify-center'>
            <h1 className='font-bold text-xl text-center mb-5'>Fizz Buzz</h1>
            <div className='w-full md:w-6/12 lg:w-5/12'>
                <Box
                    component="form"
                    // sx={{
                    //     p: 2,
                    //     border: '1px solid #ccc',
                    //     borderRadius: 1
                    // }}
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete="off">
                        <TextField
                            size='small'
                            fullWidth
                            required
                            sx={{backgroundColor: 'white', mb: 2}}
                            name='start'
                            type='number'
                            id="outlined-error"
                            label="Start Number"/>
                        <TextField
                            size='small'
                            fullWidth
                            sx={{backgroundColor: 'white'}}
                            required
                            name='finish'
                            type='number'
                            label="Finish Number"/>
                        <button 
                            type='submit' 
                            className='px-5 w-full py-3 rounded bg-blue-600 hover:bg-blue-500 text-white text-center mt-5'>
                            Proceed
                        </button>
                </Box>
                
            </div>
            {csv && (
                <div className='relative bg-white border ring border-blue-600 rounded p-5 mt-10'>
                    {csv}
                    <button className='absolute top-0 right-0' onClick={() => setCsv(null)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
            
        </section>
    )
}