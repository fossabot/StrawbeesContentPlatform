import Material from 'src/components/material'

export default ({
	material,
	amount
}) =>
	<div
		className='root amountOfMaterial'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.root .amount {
				font-weight: 500;
				font-size: 1.2rem;
			}
			@media print {
				.root .amount {
					font-weight: normal;
					font-size: 1rem;
				}
			}
		`}</style>
		{material &&
			<Material {...material}/>
		}
		{amount &&
			<div className='amount'>
				{amount}
			</div>
		}
	</div>
