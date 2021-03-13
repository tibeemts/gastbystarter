import { useStaticQuery , graphql } from 'gatsby'

export const useMenuQuery = () => {

    const data = useStaticQuery(graphql`
        query MenuQuery {
            wpMenu(slug: { eq: "primary" }) {
                menuItems {
                 nodes {
                id
                label
                url
                databaseId
                parentId
                connectedNode {
                  node {
                    ... on WpContentNode {
                      uri
                    }
                  }
                }
                childItems {
                  nodes {
                    id
                    label
                    url
                    databaseId
                    connectedNode {
                      node {
                        ... on WpContentNode {
                          uri
                        }
                      }
                    }
                    childItems {
                      nodes {
                        id
                        label
                        url
                        databaseId
                        connectedNode {
                          node {
                            ... on WpContentNode {
                              uri
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
      }
}

    `)
    return data;
}