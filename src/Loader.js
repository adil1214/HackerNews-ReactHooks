import React from 'react';
import { RingLoader } from 'react-spinners';

const Loader = () => {
	return (
		<div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
			<RingLoader size={140} color={'#ce0b92'} />
		</div>
	);
};

export default Loader;
