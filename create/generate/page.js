const path = require(`path`)

module.exports = async ({ actions, graphql }) => {
    const { data } = await graphql(/* GraphQL */ `
        {
            allWpPage(sort: { fields: modifiedGmt, order: DESC }) {
                nodes {
                    uri
                    databaseId
                }
            }
        }
    `)

    // Make individual pages.
    if (data.allWpPage.nodes.length > 0) {
        await Promise.all(
            data.allWpPage.nodes.map(async (page, index) => {
                await actions.createPage({
                    path: decodeURIComponent(page.uri),
                    component: path.resolve('src/templates/page.js'),
                    context: {
                        id: page.databaseId,
                    },
                })
            })
        )
    }
}
