import React from 'react'
import Head from 'next/head'
import Header from 'src/components/header'
import Footer from 'src/components/footer'

import fetchLocalData from 'src/utils/fetchLocalData'

export default Child => class App extends React.Component {
	static async getInitialProps(ctx) {
		// Retrieve props that will be used app wise
		const { locale } = ctx.query
		const localData = await fetchLocalData(locale, `{
			settings(q: "order=-sys.createdAt&limit=1"){
				locale
				languageName
				basename
				availableLocales
				storeUrl
				logo { url }
				socialMediaLinks
				mainMenuLinks
				ogImage { url }
				ogTitle
				ogDescription
			}

			contentTypeSlugs(q: "order=-sys.createdAt&limit=1"){
				lessonPlan
				lessonPlanCollection
				lessonPlanGroup
				definition
				material
				page
			}

			textStrings(q: "order=-sys.createdAt&limit=1"){
				ageGroup
				all
				attachments
				author
				classSize
				coMaterial
				companyAddress
				content
				copyrightNotice
				download
				duration
				emptySearch
				foundLessons
				groupSize
				home
				learningObjectives
				lessonPlan
				lessonPlanCollection
				lessonSteps
				materials
				minutes
				modifications
				more
				nationalStandards
				nextLesson
				noLessonsFound
				overview
				preparation
				previousLesson
				print
				printFriendly
				relatedLessons
				saveAsPrintableFile
				searchFieldPlaceholder
				searchFilters
				searchLessonPlans
				shop
				tag
				teachingAssessment
				vocabulary
			}
		}`)
		const settings = localData.settings.shift()
		const strings = localData.textStrings.shift()
		const contentTypeSlugs = localData.contentTypeSlugs.shift()

		settings.currentLocale = {
			locale       : settings.locale,
			languageName : settings.languageName,
			basename     : settings.basename ? settings.basename : ''
		}
		settings.availableLocales = settings.availableLocales.map(line => {
			const array = line.split('_')
			return {
				locale       : array[0],
				languageName : array[1],
				basename     : array[2] ? array[2] : ''
			}
		})
		delete settings.locale
		delete settings.languageName
		delete settings.basename

		settings.socialMediaLinks = settings.socialMediaLinks.map(line => {
			const array = line.split('_')
			return {
				title : array[0],
				url   : array[1]
			}
		})

		settings.mainMenuLinks = settings.mainMenuLinks.map(line => {
			const array = line.split('_')
			return {
				title : array[0],
				url   : array[1]
			}
		})

		const appProps = {
			settings,
			contentTypeSlugs,
			strings
		}

		const meta = {
			ogTitle       : settings.ogTitle,
			ogDescription : settings.ogDescription,
			ogImage       : settings.ogImage && `https:${settings.ogImage.url}`
		}
		// Retrive props of the current page
		const pageProps = await Child.getInitialProps(ctx, fetchLocalData, appProps)
		return {
			appProps,
			...meta,
			...pageProps
		}
	}

	render() {
		const meta = {
			'og:title'       : this.props.ogTitle,
			'og:description' : this.props.ogDescription,
			'og:image'       : this.props.ogImage
		}
		return (
			<div className='root app'>
				<style jsx>{`
					/* This stylesheet generated by Transfonter (https://transfonter.org) on August 4, 2017 2:45 PM */
					@font-face { font-family: 'Brandon Text'; src: url('/static/fonts/BrandonText-Medium.eot'); src: url('/static/fonts/BrandonText-Medium.eot?#iefix') format('embedded-opentype'),url('/static/fonts/BrandonText-Medium.woff2') format('woff2'),url('/static/fonts/BrandonText-Medium.woff') format('woff'),url('/static/fonts/BrandonText-Medium.ttf') format('truetype'); font-weight: 500; font-style: normal; }
					@font-face { font-family: 'Brandon Text'; src: url('/static/fonts/BrandonText-Regular.eot');	src: url('/static/fonts/BrandonText-Regular.eot?#iefix') format('embedded-opentype'),url('/static/fonts/BrandonText-Regular.woff2') format('woff2'),url('/static/fonts/BrandonText-Regular.woff') format('woff'),url('/static/fonts/BrandonText-Regular.ttf') format('truetype'); font-weight: normal; font-style: normal; }
					@font-face { font-family: 'Brandon Text'; src: url('/static/fonts/BrandonText-Bold.eot'); src: url('/static/fonts/BrandonText-Bold.eot?#iefix') format('embedded-opentype'),url('/static/fonts/BrandonText-Bold.woff2') format('woff2'),url('/static/fonts/BrandonText-Bold.woff') format('woff'),url('/static/fonts/BrandonText-Bold.ttf') format('truetype'); font-weight: bold; font-style: normal; }

					:global(body) {
						margin: 0;
						font-family: 'Brandon Text', sans-serif;
						font-size: 16px;
						line-height: 1.5;
					}
					:global(*){
						box-sizing: border-box;
					}
					:global(a) {
						color: inherit;
					}
					@media print {
						:global(body) {
							font-size: 11pt;
							print-color-adjust: exact;
							-webkit-print-color-adjust: exact;
						}
						@page {
							margin: 0;
						}
					}
				`}</style>
				<Head>
					<title>{meta['og:title']}</title>
					{Object.keys(meta).map((m, i) =>
						<meta key={i} property={m} content={meta[m]} />
					)}
					<link rel="stylesheet" href="/static/lib/carousel.min.css"/>
					<meta name="viewport" content="width=device-width, initial-scale=1"/>

					<link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png"/>
					<link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png"/>
					<link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png"/>
					<link rel="manifest" href="/static/favicon/manifest.json"/>
					<link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
					<link rel="shortcut icon" href="/static/favicon/favicon.ico"/>
					<meta name="msapplication-config" content="/static/favicon/browserconfig.xml"/>
					<meta name="theme-color" content="#ffffff"/>


				</Head>
				<Header {...this.props}/>
				<Child {...this.props} />
				<Footer {...this.props}/>
			</div>
		)
	}
}
