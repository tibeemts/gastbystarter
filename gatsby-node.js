const path = require('path')

exports.createPages = async ({actions, graphql, reporter}) => {

    const {createPage} = actions

    // first man query aow page id kub uri kone

    const result = await graphql(`
    {
        allWpPage {
          nodes {
            databaseId
            uri
            isFrontPage
          }
        }
      }
    `)
    
    // if mun error 

    if(result.errors) {
        reporter.error("there was an error fetching pages", result.errors)
    }

    // if not then 

    const { allWpPage } = result.data

    //define the template to use
    const PageTemplate = path.resolve('./src/templates/page.js')

    // Make individual pages.
        if (allWpPage.nodes.length > 0) {
            await Promise.all(
                allWpPage.nodes.map(async (page, index) => {
                    // if(page.isFrontPage) {
                    //     pagePath = '/'
                    // }

                    await createPage({
                        path: decodeURIComponent(page.uri),
                        component: PageTemplate,
                        context: {
                            id: page.databaseId,
                        },
                    })
                })
            )
        }

}