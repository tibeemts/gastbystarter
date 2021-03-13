import React from 'react'

import slugify from '../../utils/slugify'
import SimpleCard from '../SimpleCard'

import { relatedWrap, relatedCards } from './style.module.scss'

const RelatedCards = ({ relatedPosts }) => {
    const cards = relatedPosts.map((post) => (
        <SimpleCard key={post.slug} node={post} />
    ))

    if (cards) {
        return (
            <div className="container">
                <div className={relatedWrap}>
                    <h2>Related Posts</h2>
                    <div className={relatedCards}>{cards}</div>
                </div>
            </div>
        )
    }

    return null
}

export default RelatedCards
