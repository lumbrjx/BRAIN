export type Result<T, E> = {
	success: boolean;
	data?: T;
	error?: E | undefined;
};

export function parseToResult<T, E>(data: T, error?: E): Result<T, E> {
	return {
		success: !error,
		data,
		error,
	};
}
