import { useEffect } from 'react'
import { SITE } from '../config/site'

const DEFAULT_DESCRIPTION = SITE.description

function setMeta(selector, attribute, value) {
  let tag = document.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    const [key, name] = attribute.split('=')
    tag.setAttribute(key, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', value)
}

export default function useTitle(title, description) {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} | ${SITE.tagline}`
    const pageDescription = description || DEFAULT_DESCRIPTION

    document.title = pageTitle
    setMeta('meta[name="description"]', 'name=description', pageDescription)
    setMeta('meta[property="og:title"]', 'property=og:title', pageTitle)
    setMeta('meta[property="og:description"]', 'property=og:description', pageDescription)
  }, [title, description])
}
