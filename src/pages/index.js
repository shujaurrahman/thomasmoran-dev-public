import { graphql, Link } from 'gatsby'
import React from 'react'

import Bio from '../components/Bio'
import BlogList from '../components/BlogList'
import CodeSnippitsList from '../components/CodeSnippitsList'
import ContactForm from '../components/ContactForm'
import Intro from '../components/Intro'
import Spotify from '../components/Spotify'
import Title from '../components/Title'
import Layout from '../components/layout'
import Seo from '../components/seo'

const Home = ({ data, location }) => {
  // reformat data
  const posts = data.blog.nodes.map(node => {
    return {
      id: node.id,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      tags: node.frontmatter.tags,
      slug: node.fields.slug,
    }
  })
  const snippits = data.snippits.nodes.map(node => {
    return {
      id: node.id,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      tags: node.frontmatter.tags,
      slug: node.fields.slug,
    }
  })

  return (
    <Layout location={location}>
      <Seo title="Home" />
      <Intro />
      <Title title="Most Recent Posts">
        <p>
          Check out the full list of posts <Link to="/blog">here</Link>.
        </p>
      </Title>
      <BlogList posts={posts} />
      <Title title="Code Snippits">
        <p>
          I like to post any useful bits of code I come across in my day-to-day{' '}
          <span role="img" aria-label="stars emoji">
            ✨
          </span>
          . <br />
          Check out the full list of snippits <Link to="/snippits">here</Link>.
        </p>
      </Title>
      <CodeSnippitsList snippits={snippits} />
      <ContactForm />
      <Spotify />
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query ListQuery {
    site {
      siteMetadata {
        title
      }
    }
    blog: allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: { fileAbsolutePath: { regex: "/blog/" } }, limit: 4) {
      nodes {
        excerpt(pruneLength: 200)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
    snippits: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/snippits/" } }
      limit: 5
    ) {
      nodes {
        id
        excerpt(pruneLength: 200)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`
