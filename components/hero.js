import generateClassnames from 'src/utils/generateClassnames'

export default ({
	strings,
	children,
	icon,
	title,
	subtitle,
	description,
	author,
	color
}) =>
<div
	className={`root hero ${generateClassnames({
		icon,
		title,
		subtitle,
		description,
		author,
		color,
		children
	})}`}
	style={{
		backgroundColor : color
	}}>
	<style jsx>{`
		.root {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			position: relative;
			width: 100%;
			padding: 2rem 3rem;
			margin-bottom: 3rem;
			min-height: 25rem;
		}
		.root.not-color {
			background-color: #eee;
			color: #000;
		}
		.root.color {
			color: #FFF;
		}
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			max-width: 67.5rem
		}
		.wrapper .icon,
		.wrapper .info {
			width: 50%;
		}
		.wrapper .icon {
			padding-left: 3rem;
		}
		.wrapper .info {
			padding-right: 3rem;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
		.wrapper .icon .image {
			width: 100%;
			height: auto;
		}
		.wrapper .info .description {
			font-size: 1.2rem;
		}
		.wrapper .info .title,
		.wrapper .info .subtitle,
		.wrapper .info .author,
		.wrapper .info .description {
			margin-top: 0;
		}
		.wrapper .info .subtitle {
			margin-top: -2rem;
		}
		.wrapper .info .title {
			font-size: 3rem;
			margin-bottom: 1rem;
		}
		@media (max-width: 1000px) {
			.wrapper .icon {
				padding-left: 0;
			}
			.wrapper .info {
				padding-right: 0;
			}
		}
		@media (max-width: 600px) {
			.wrapper {
				flex-direction: column;
			}
			.wrapper .icon,
			.wrapper .info {
				width: 100%;
			}
		}
	`}</style>
	<div className='wrapper'>
		{icon &&
			<div className='icon'>
				<img className='image' src={icon.url} />
			</div>
		}
		<div className='info'>
			{title &&
				<h1 className='title'>
					{title}
				</h1>
			}
			{subtitle &&
				<h2 className='subtitle'>
					{subtitle}
				</h2>
			}
			{author &&
				<div className='author'>
					<b>{strings.author}</b>
					<span>{author}</span>
				</div>
			}
			{description &&
				<p className='description'>
					{description}
				</p>
			}
			{children}
		</div>
	</div>
</div>
