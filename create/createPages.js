const createPage = require('./generate/page.js')
const createPost = require('./generate/post.js')
const createCat = require('./generate/cat.js')
const createTag = require('./generate/tag.js')

module.exports = async function createPages(props) {
    const { graphql } = props

    const { data: wpSettings } = await graphql(`
        {
            wp {
                readingSettings {
                    postsPerPage
                }
            }
        }
    `)

    const perPage = wpSettings.wp.readingSettings.postsPerPage || 10

    await createPage(props)
    await createPost(props, { perPage, blogURI: '/news' })
    await createCat(props, { perPage })
    await createTag(props, { perPage })
}
