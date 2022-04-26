const TOPIC_REGEX = /\/([\w\-]*)\/([\d]+)\/([\w\-]*)\/([\w]*)\/([\w]*)/;

/**
 * Return an array of topics to pass to waku
 * @param contentTopic The protocol specific topic this relates to 
 */
export function generateTopics(dappName: string, version: string, what: string, locations: string[]): string[] {
  const topics = []
  for (let i = 0; i <= locations.length; i++) {
    const newTopic = `/${dappName}/${version}/${what}/${locations[i]}/proto`
    console.log(`monitoring topic: ${newTopic}`)
    topics.push(newTopic)
  }
  return topics
}

export function getLocationShard(contentTopic: string): string | undefined {
  const matches = contentTopic.match(TOPIC_REGEX)
  return (matches ? matches[4] : undefined)
}