import App from 'src/components/hoc/app'
import generateUrl from 'src/utils/generateUrl'

import Search from 'src/components/pages/search'

const resolveTemplate = template => {
	switch (template) {
		case 'search':
			return Search
		default:
			return null
	}
}

const Page = props => {
	const Template = resolveTemplate(props.template)
	if (Template) {
		return <Template {...props}/>
	}
	return null
}

Page.getInitialProps = async ({ query }, fetchLocalData, appProps) => {
	const { locale, contentType, id } = query
	const data = await fetchLocalData(locale, `{
		content:${contentType} (id:"${id}"){
			template
			ageGroup { cssColor }
			featuredImage { url }
			featuredIcon { url }
			title
			slug
			description
		}
	}`)
	const Template = resolveTemplate(data.content.template)
	let templateProps = null
	if (Template && Template.getInitialProps) {
		templateProps = await Template.getInitialProps({ query }, fetchLocalData, appProps)
	}
	const meta = {
		ogTitle       : `${data.content.title} - ${appProps.settings.ogTitle}`,
		ogDescription : data.content.description
	}
	if (data.content.featuredImage) {
		meta.ogImage = `https:${data.content.featuredImage.url}`
	}
	return {
		...meta,
		breadcrumbs : {
			list : [
				{
					title : appProps.strings.home,
					url   : generateUrl({ appProps })
				},
				{
					title : data.content.title
				}
			]
		},
		hero : {
			icon        : data.content.featuredIcon,
			title       : data.content.title,
			description : data.content.description,
			color       : data.content.ageGroup && data.content.ageGroup.cssColor
		},
		...data.content,
		...templateProps
	}
}
export default App(Page)
