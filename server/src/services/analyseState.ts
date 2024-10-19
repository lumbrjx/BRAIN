import axios from 'axios';

const url = 'https://92de-41-98-245-61.ngrok-free.app/predict';
export function extractNumericValues(obj: any) {
	const values = Object.values(obj);

	const numericValues = values.filter(value => typeof value === 'number');

	while (numericValues.length < 9) {
		numericValues.push(0);
	}

	const firstNineNumericValues = numericValues.slice(0, 9);
	return firstNineNumericValues.join(',');
}

export async function predict(params: any) {
	try {
		const response = await axios.get(url, { params });
		console.log('Response data:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error occurred:', error);
	}

}

