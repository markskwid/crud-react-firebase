export function formatNumber(number) {
	const formattedNumber = number.replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3");
	return formattedNumber;
}

export function formatCurrency(money) {
	const formattedNumber = money.toLocaleString("en-PH", {
		style: "currency",
		currency: "PHP",
	});

	return formattedNumber;
}

export function formatName(name) {
	const formattedName = name.split(" ").reduce((acc, currentValue) => {
		const formatName =
			currentValue[0].toUpperCase() + currentValue.slice(1).toLowerCase();
		return acc + formatName + " ";
	}, "");

	return formattedName.trim();
}

export const transactions = [
	{
		id: 1,
		date: "09/23/2023",
		merchant: "Bench",
		amount: 2000,
	},

	{
		id: 2,
		date: "09/12/2023",
		merchant: "Penshoppe",
		amount: 5000,
	},

	{
		id: 3,
		date: "09/12/2023",
		merchant: "Mang Tomas Bbq",
		amount: 1000,
	},

	{
		id: 4,
		date: "08/26/2023",
		merchant: "Penshoppe",
		amount: 3000,
	},

	{
		id: 5,
		date: "08/16/2023",
		merchant: "Oxygen",
		amount: 1000,
	},
];

export function totalNumber(data) {
	return data.reduce((acc, currentValue) => acc + currentValue.amount, 0);
}
