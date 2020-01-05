const type = (value, type) => { return typeof(value) == type ? true : false };

const minLength = (value, min) => { return value < min ? false : true };
	
const maxLength = (value, max) => { return value > max ? false : true };

const lowercase = value => {return value == value.toLowerCase() ? true : false}

const required = (value, required) => {
	if (required)
		return value ? true : false;
	else
		return true;
}

const validate = (shema, data) => {
	for (const property in shema) {
		for (const value in property) {
			if (!window[value](data.value, shema.property))
				throw new Error({error: shema.error}); 
		};
	};
}

  export default validate;