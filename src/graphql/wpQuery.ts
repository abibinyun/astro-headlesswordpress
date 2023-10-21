interface Iwpquery {
    query: string;
    variables?: object;
}

export const wpquery = async ({query, variables = {} }: Iwpquery) => {
    const res = await fetch('https://api.mangusop.com/graphql', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YWRtaW5fOWlyZWlhY3A6c3Q4dCBjRUNCIG9QWXUgUUdPZiBHUVdsIEQwWXo='
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    if(!res.ok) {
        console.error(res);
        return {};
    }

    const { data } = await res.json();
    return data;
}

export async function fetchTagPost(slugTag: any) {
    const response = await fetch('https://api.mangusop.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW5fOWlyZWlhY3A6c3Q4dCBjRUNCIG9QWXUgUUdPZiBHUVdsIEQwWXo='
      },
      body: JSON.stringify({
        query: `
        query tagPost($tagSlugIn: [String] = "tester-1") {
          posts(first: 100, where: {tagSlugIn: $tagSlugIn}) {
            nodes {
              slug
              title(format: RENDERED)
              excerpt(format: RENDERED)
              date
              featuredImage {
                node {
                  sourceUrl(size: MEDIUM)
                }
              }
              tags {
                nodes {
                  slug
                  name
                }
              }
              categories {
                nodes {
                  slug
                  name
                }
              }
            }
          }
        }
        `,
        variables: {
          first: 100,
          tagSlugIn: slugTag,
        },
      }),
    });
  
    const data = await response.json();
    return data;
  }

export async function fetchCategoriesPost(catName: any) {
    const response = await fetch('https://api.mangusop.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW5fOWlyZWlhY3A6c3Q4dCBjRUNCIG9QWXUgUUdPZiBHUVdsIEQwWXo='
      },
      body: JSON.stringify({
        query: `
        query categoryPost($categoryName: String = "cattester2") {
          posts(first: 100, where: {categoryName: $categoryName}) {
            nodes {
              slug
              title(format: RENDERED)
              excerpt(format: RENDERED)
              date
              featuredImage {
                node {
                  sourceUrl(size: MEDIUM)
                }
              }
              tags {
                nodes {
                  slug
                  name
                }
              }
              categories {
                nodes {
                  slug
                  name
                }
              }
            }
          }
        }
        `,
        variables: {
          first: 100,
          categoryName: catName,
        },
      }),
    });
  
    const data = await response.json();
    return data;
  }

export async function fetchRelatedPost(postId: any, postCat: any) {
  const response = await fetch('https://api.mangusop.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5fOWlyZWlhY3A6c3Q4dCBjRUNCIG9QWXUgUUdPZiBHUVdsIEQwWXo='
    },
    body: JSON.stringify({
      query: `
      query relatedPost($notIn: [ID] = "", $categoryName: String = "") {
        posts(first: 5, where: {categoryName: $categoryName, notIn: $notIn}) {
          edges {
            node {
              id
              title(format: RENDERED)
              date
              slug
              tags {
                nodes {
                  name
                  slug
                }
              }
              featuredImage {
                node {
                  sourceUrl(size: MEDIUM_LARGE)
                }
              }
            }
          }
        }
      }
      `,
      variables: {
        first: 100,
        notIn: postId,
        categoryName: postCat,
      },
    }),
  });

  const data = await response.json();
  return data;
  }
