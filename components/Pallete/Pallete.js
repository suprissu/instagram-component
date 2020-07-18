import "./Pallete.scss";

const Pallete = () => {
	const arr = [1, 2, 3, 4, 5, 6];

	return (
		<div className="pallete">
			{arr.map((data) => (
				<div className="pallete__square" key={data}>
					{data}
				</div>
			))}
		</div>
	);
};

export default Pallete;
