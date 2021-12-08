import { useState } from "react";
import Challenge1Page from "./pages/challenge1";
import Challenge2Page from "./pages/challenge2";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';


function App() {
	const [page, setPage]	= useState<number>(0)

	return (
		<>
		<section className='mb-20'>
			{page === 0 && <Challenge1Page/>}
			{page === 1 && <Challenge2Page/>}
		</section>
		<div className='fixed inset-x-0 bottom-0'>
			<Paper variant="outlined">
				<BottomNavigation
					showLabels
					value={page}
					onChange={(event, newValue) => {
						setPage(newValue)
					}}
				>
					<BottomNavigationAction label="Challenge 1" icon={<Filter1Icon/>}/>
					<BottomNavigationAction label="Challenge 2" icon={<Filter2Icon/>}/>
				</BottomNavigation>
			</Paper>
		</div>
			
		</>
	)
}

export default App;
