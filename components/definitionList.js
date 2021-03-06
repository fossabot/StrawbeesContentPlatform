import Definition from 'src/components/definition'

export default ({
	items
}) =>
	<div
		className='root definitionList'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: flex-start;
				justify-content: center;
				flex-wrap: wrap;
			}
		`}</style>
		{items.map((props, i) =>
			<Definition
				key={i}
				{...props}
			/>
		)}
	</div>
