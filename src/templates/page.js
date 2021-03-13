import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/Layout/layout'

const PageTemplate = ({ data }) => {
   
    return (
        <Layout>

                  <h1 dangerouslySetInnerHTML={{__html: data.wpPage.title}}></h1>
                  <div dangerouslySetInnerHTML={{__html: data.wpPage.content}}></div>
                  <p>this is page template</p>
        </Layout>
    )
}
export default PageTemplate;

export const pageQuery = graphql`

    query Page ($id: Int!) {
        wpPage(databaseId: {eq: $id}) {
            id
            title
            content
            status
            featuredImage {
            node {
                id
                localFile {
                childImageSharp {
                    gatsbyImageData(width: 1920, placeholder: TRACED_SVG)
                }
                }
            }
            }
            wpChildren {
            nodes {
                ... on WpPage {
                id
                title
                uri
                }
            }
            }
            wpParent {
            node {
                ... on WpPage {
                id
                uri
                title
                wpChildren {
                    nodes {
                    ... on WpPage {
                        id
                        uri
                        title
                    }
                    }
                }
                }
            }
            }
        }
        }

`