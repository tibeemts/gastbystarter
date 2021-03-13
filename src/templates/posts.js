import React from 'react'
import { graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import ArticleCard from '../components/ArticleCard'
import FilterCategories from '../components/FilterCategories'
import Pagination from '../components/Pagination/index'
import PostsWrap from '../components/PostsWrap/index'
import Layout from '../components/Layout/layout'

const Posts = ({ data, pageContext }) => {
    const {
        allWpPost: { nodes, pageInfo },
    } = data

    const { currentPage } = pageInfo

    const { archivePath } = pageContext

    return (
        <Layout>
            
                {currentPage === 1 && <FilterCategories />}
                <PostsWrap>
                    {nodes.map((node, count) => {
                        const image = getImage(
                            node?.featuredImage?.node?.thumbnail
                        )
                        const imageTitle =
                            node?.featuredImage?.node?.title || ''
                        const imageAlt =
                            node?.featuredImage?.node?.altText || ''

                        return (
                            <ArticleCard
                                key={node.slug}
                                count={count}
                                slug={node.slug}
                                image={image}
                                imageTitle={imageTitle}
                                imageAlt={imageAlt}
                                title={node.title}
                                modifiedForUser={node.modifiedForUser}
                                modifiedForSchema={node.modifiedForSchema}
                                excerpt={node.cleanExcerpt}
                            />
                        )
                    })}
                </PostsWrap>

                <Pagination
                    prefix=""
                    currentPage={pageInfo.currentPage}
                    pageCount={pageInfo.pageCount}
                />
            
        </Layout>
    )
}

export const query = graphql`
    query Posts($offset: Int!, $perPage: Int!) {
        allWpPost(
            limit: $perPage
            skip: $offset
            sort: { fields: date, order: DESC }
        ) {
            nodes {
                ...PostPreviewContent
            }
            pageInfo {
                currentPage
                pageCount
            }
        }
    }
`

export default Posts
