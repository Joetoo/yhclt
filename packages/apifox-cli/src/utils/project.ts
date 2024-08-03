// const { organization, accessToken } = defaultConfig

// export const getOrganizationProjects = async () => {
//   const url = `https://api.github.com/orgs/${organization}/repos`
//   const res = await axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   })
//   return res.data.map(item => item.name)
// }

// export const getProjectVersions = async (repo: string) => {
//   const url = `https://api.github.com/repos/${organization}/${repo}/releases`
//   const res = await axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   })
//   return res.data.map(item => item.tag_name)
// }
