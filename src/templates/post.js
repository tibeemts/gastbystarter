import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'
import Prism from 'prismjs'
import DateMeta from '../components/DateMeta'
import CategoryList from '../components/CategoryList'
import RelatedCards from '../components/RelatedCards'
import SEO from '../components/SEO/SEO'
import TagList from '../components/TagList'
import FeaturedImage from '../components/FeaturedImage'
import Layout from '../components/Layout/layout'

const PostTemplate = (props) => {
    useEffect(() => {
        Prism.highlightAll()
    }, [])

    const {
        data: {
            relatedPosts,
            wpPost: {
                content,
                date,
                cleanTitle,
                cleanExcerpt,
                modified,
                modifiedForUser,
                modifiedForSchema,
                featuredImage,
                tags,
                categories,
                seo,
            },
        },
        uri,
    } = props

    const image = getImage(featuredImage?.node?.thumbnail)

    const facebookImage = getSrc(featuredImage?.node?.facebook)

    const twitterImage = getSrc(featuredImage?.node?.twitter)

    const featuredAlt = featuredImage.node?.altText || ''
    const featuredTitle = featuredImage?.node?.title || ''

    return (
        <Layout>
            {/* <SEO
                postType="page"
                yoastTitle={seo.title}
                title={cleanTitle}
                description={cleanExcerpt}
                facebookPostImage={facebookImage}
                twitterPostImage={twitterImage}
                url={uri}
                dateModified={modified}
            /> */}

            
                <article>
                    <h1>{cleanTitle}</h1>

                    <DateMeta
                        modifiedForUser={modifiedForUser}
                        modifiedForSchema={modifiedForSchema}
                    />

                    <CategoryList cats={categories.nodes} />

                    <FeaturedImage
                        image={image}
                        title={featuredTitle || ''}
                        alt={featuredAlt || ''}
                    />

                    <div dangerouslySetInnerHTML={{ __html: content }} />

                    <TagList tags={tags.nodes} />
                </article>
            
            <RelatedCards relatedPosts={relatedPosts.nodes} />
        </Layout>
    )
}

export const postQuery = graphql`
    query post($id: Int!, $related: [Int!]) {
        wpPost(databaseId: { eq: $id }) {
            ...PostContent
            modifiedForUser: modified(formatString: "D MMMM YYYY")
            modifiedForSchema: modified(formatString: "YYYY-MM-DD, HH:mm:ss")
        }
        relatedPosts: allWpPost(filter: { databaseId: { in: $related } }) {
            nodes {
                ...RelatedContent
            }
        }
    }
`

export default PostTemplate
